import type { ChatMessage } from "../../types";

export const API_ENDPOINT =
	"https://lucky-night-09d6.nathanielseth-dev.workers.dev";
export const RESUME_PATH = "/portfolio/assets/NathanielSeth_DeLeon_Resume.pdf";

export const PDFJS_CDN_BASE =
	"https://cdn.jsdelivr.net/npm/pdfjs-dist@6.0.227/build";
export const HEALTH_CHECK_INTERVAL = 60_000;

const INITIAL_MESSAGE: ChatMessage = {
	id: "init",
	role: "assistant",
	content: "Hey there! Here to answer questions about Seth's work.",
};

export const QUICK_ACTIONS = [
	"Tell me about Seth's experience",
	"What technologies does he use?",
	"Is he currently accepting work?",
] as const;

export const STATUS_CONFIG = {
	checking: { color: "bg-zinc-400", label: "Connecting..." },
	online: { color: "bg-emerald-500", label: "Online now" },
	offline: { color: "bg-zinc-400", label: "Currently offline" },
	rateLimited: { color: "bg-amber-500", label: "Rate limited" },
} as const;

// types

export type ServiceStatus = keyof typeof STATUS_CONFIG;

export interface State {
	isOpen: boolean;
	messages: ChatMessage[];
	input: string;
	isLoading: boolean;
	status: ServiceStatus;
}

export type Action =
	| { type: "TOGGLE" }
	| { type: "CLOSE" }
	| { type: "SET_INPUT"; payload: string }
	| { type: "SEND_START"; message: ChatMessage }
	| { type: "SEND_SUCCESS"; message: ChatMessage }
	| { type: "SEND_ERROR" }
	| { type: "SEND_RATE_LIMITED" }
	| { type: "SET_STATUS"; payload: ServiceStatus };

// reducer

export const initialState: State = {
	isOpen: false,
	messages: [INITIAL_MESSAGE],
	input: "",
	isLoading: false,
	status: "checking",
};

export function reducer(state: State, action: Action): State {
	switch (action.type) {
		case "TOGGLE":
			return { ...state, isOpen: !state.isOpen };
		case "CLOSE":
			return { ...state, isOpen: false };
		case "SET_INPUT":
			return { ...state, input: action.payload };
		case "SEND_START":
			return {
				...state,
				messages: [...state.messages, action.message],
				input: "",
				isLoading: true,
			};
		case "SEND_SUCCESS":
			return {
				...state,
				messages: [...state.messages, action.message],
				isLoading: false,
				status: "online",
			};
		case "SEND_ERROR":
			return {
				...state,
				isLoading: false,
				status: "offline",
				messages: [
					...state.messages,
					{
						id: `err-${Date.now()}`,
						role: "assistant",
						content: "Connection issue. Try again?",
					},
				],
			};
		case "SEND_RATE_LIMITED":
			return {
				...state,
				isLoading: false,
				status: "rateLimited",
				messages: [
					...state.messages,
					{
						id: `rl-${Date.now()}`,
						role: "assistant",
						content: "You are being rate limited.",
					},
				],
			};
		case "SET_STATUS":
			return { ...state, status: action.payload };
		default:
			return state;
	}
}