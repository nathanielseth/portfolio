import { useReducer, useRef, useEffect } from "react";
import { useStableCallback } from "./useStableCallback";
import {
	reducer,
	initialState,
	API_ENDPOINT,
	HEALTH_CHECK_INTERVAL,
} from "../components/Chat/chat.constants";
import { loadResumeText } from "../components/Chat/resumeLoader";

export function useChatEngine() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { isOpen, input, isLoading } = state;

	const resumeTextRef = useRef<string>("");
	const isLoadingResumeRef = useRef(false);
	const endRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const messagesRef = useRef(state.messages);
	useEffect(() => {
		messagesRef.current = state.messages;
	}, [state.messages]);

	useEffect(() => {
		if (state.messages.length > 1) {
			endRef.current?.scrollIntoView({ behavior: "smooth" });
		}
	}, [state.messages.length]);

	useEffect(() => {
		if (!isOpen || resumeTextRef.current || isLoadingResumeRef.current) return;
		isLoadingResumeRef.current = true;
		loadResumeText().then((text) => {
			resumeTextRef.current = text;
			isLoadingResumeRef.current = false;
		});
	}, [isOpen]);

	useEffect(() => {
		if (isOpen && !isLoading) {
			const id = window.setTimeout(() => inputRef.current?.focus(), 50);
			return () => window.clearTimeout(id);
		}
	}, [isOpen, isLoading]);

	useEffect(() => {
		if (!isOpen) return;
		const handler = (e: KeyboardEvent) => {
			if (e.key === "Escape") dispatch({ type: "CLOSE" });
		};
		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, [isOpen]);

	// prevent lenis from hijacking wheel events inside chat
	useEffect(() => {
		if (!isOpen) return;
		const container = containerRef.current;
		if (!container) return;

		const handler = (e: WheelEvent) => {
			const scrollable = container.scrollHeight > container.clientHeight;
			if (!scrollable) return;

			const atTop = container.scrollTop === 0;
			const atBottom =
				container.scrollTop + container.clientHeight >=
				container.scrollHeight - 1;

			if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
				e.preventDefault();
			}
			e.stopPropagation();
		};

		container.addEventListener("wheel", handler, { passive: false });
		return () => container.removeEventListener("wheel", handler);
	}, [isOpen]);

	useEffect(() => {
		if (!isOpen) return;

		let cancelled = false;

		const checkHealth = async () => {
			try {
				const res = await fetch(`${API_ENDPOINT}/health`);
				if (cancelled) return;
				const data = (await res.json()) as { status?: string };
				dispatch({
					type: "SET_STATUS",
					payload: res.ok && data.status === "online" ? "online" : "offline",
				});
			} catch {
				if (!cancelled) dispatch({ type: "SET_STATUS", payload: "offline" });
			}
		};

		checkHealth();
		const interval = setInterval(checkHealth, HEALTH_CHECK_INTERVAL);

		return () => {
			cancelled = true;
			clearInterval(interval);
		};
	}, [isOpen]);

	const sendMessage = useStableCallback(async (content = input) => {
		const text = content.trim();
		if (!text || isLoading) return;

		const userMsg = {
			id: `u-${Date.now()}`,
			role: "user" as const,
			content: text,
		};
		dispatch({ type: "SEND_START", message: userMsg });

		try {
			const res = await fetch(API_ENDPOINT, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					messages: [...messagesRef.current, userMsg],
					resumeText: resumeTextRef.current || "RESUME_LOAD_FAILED",
				}),
			});

			if (res.status === 429) {
				dispatch({ type: "SEND_RATE_LIMITED" });
				return;
			}

			if (!res.ok) throw new Error("API request failed");

			const data = (await res.json()) as {
				choices?: Array<{ message?: { content?: string } }>;
			};
			const reply =
				data.choices?.[0]?.message?.content ?? "Sorry, couldn't process that.";
			dispatch({
				type: "SEND_SUCCESS",
				message: { id: `a-${Date.now()}`, role: "assistant", content: reply },
			});
		} catch {
			dispatch({ type: "SEND_ERROR" });
		}
	});

	return {
		state,
		dispatch,
		inputRef,
		containerRef,
		endRef,
		sendMessage,
	};
}