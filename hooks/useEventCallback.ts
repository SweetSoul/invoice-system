import { useCallback, useEffect, useRef } from "react";

export default function useEventCallback<TCallback extends (...args: any[]) => any>(fn?: TCallback | null): TCallback {
	function commitedRef<TValue>(value: TValue): React.MutableRefObject<TValue> {
		const ref = useRef(value);
		useEffect(() => {
			ref.current = value;
		}, [value]);
		return ref;
	}

	const ref = commitedRef(fn);
	return useCallback(
		function (...args: any[]) {
			return ref.current && ref.current(...args);
		},
		[ref]
	) as any;
}
