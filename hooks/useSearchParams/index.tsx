const searchParams = new URLSearchParams();

const useSearchParams = () => {
  function toString() {
    return searchParams.toString();
  }

  function set(key: string, value: string) {
    searchParams.set(key, value);
    return;
  }

  return { toString, set };
};

export default useSearchParams;
