import { useCallback, useEffect, useRef } from "react";

// stable callback that always sees latest state, no deps needed
export function useStableCallback<T extends (...args: never[]) => unknown>(
	fn: T,
): T {
	const ref = useRef<T>(fn);

	useEffect(() => {
		ref.current = fn;
	});

	return useCallback((...args: Parameters<T>) => ref.current(...args), []) as T;
}