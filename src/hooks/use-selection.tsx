import { useState, useCallback, useMemo } from "react";

export function useSelection<T>() {
  const [selected, setSelected] = useState<Set<T>>(new Set());

  // Toggle single id
  const toggle = useCallback((id: T) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  // Check if selected
  const isSelected = useCallback((id: T) => selected.has(id), [selected]);

  // Clear all
  const clear = useCallback(() => setSelected(new Set()), []);

  // Toggle select all
  const toggleAll = useCallback((ids: T[]) => {
    setSelected((prev) => (prev.size === ids.length ? new Set() : new Set(ids)));
  }, []);

  // Selected IDs list
  const selectedIds = useMemo(() => Array.from(selected), [selected]);

  return {
    selectedIds,
    isSelected,
    toggle,
    clear,
    toggleAll,
  };
}
