let timeout: NodeJS.Timeout;

function debounce(fn: () => void, time: number) {
  clearTimeout(timeout);
  timeout = setTimeout(fn, time);
}

export default debounce;
