let timeout: NodeJS.Timeout;

export function debounce(fn: () => void, time: number) {
  clearTimeout(timeout);
  timeout = setTimeout(fn, time);
}

export function clearDebounce() {
  clearTimeout(timeout);
}
