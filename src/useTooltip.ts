import { useEffect, useState } from "react";

type UseTooltipOptions = {
  defaultValue?: boolean;
  storage?: Storage;
};

export default function useTooltip(key: string, options?: UseTooltipOptions) {
  const state = useState(options?.defaultValue ?? false);
  const [pending, setPending] = useState(true);
  const [value, setter] = state;
  const storage = options?.storage || sessionStorage;

  useEffect(() => {
    const item = storage.getItem(key);
    setter(
      item !== null ? item === String(true) : (options?.defaultValue ?? false),
    );
    setPending(false);
  }, []);

  useEffect(() => {
    if (!pending) {
      storage.setItem(key, String(value));
    }
  }, [value, pending]);

  return state;
}
