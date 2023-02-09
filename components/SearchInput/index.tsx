const SearchInput = ({
  inputRef,
  searchHandler,
}: {
  inputRef: React.RefObject<HTMLInputElement>;
  searchHandler: (
    e: React.FormEvent<HTMLInputElement | HTMLFormElement>
  ) => void;
}) => {
  return (
    <form onChange={searchHandler} onSubmit={searchHandler}>
      <input ref={inputRef} type="text" placeholder="검색어를 입력해주세요." />
    </form>
  );
};

export default SearchInput;
