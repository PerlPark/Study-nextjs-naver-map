'use client';

import useDebounce from '@/hooks/useDebounce';
import axios from 'axios';
import { useRef, useState } from 'react';

const SearchKakao = () => {
  const { setDebounce } = useDebounce();

  const inputRef = useRef<HTMLInputElement>(null);
  const [searches, setSearches] = useState<any[]>();

  function getSearch(e: React.FormEvent) {
    e.preventDefault();

    const value = inputRef.current?.value;
    if (value) setDebounce(() => search(value), 100);
  }

  function search(query: string) {
    axios
      .get('/api/location-kakao', { params: { query } })
      .then((res) => setSearches(res.data.documents));
  }

  function getAddress(v: any) {
    return () => {
      alert(v.address_name);
    };
  }

  return (
    <div>
      <form onChange={getSearch} onSubmit={getSearch}>
        <input
          type="text"
          ref={inputRef}
          placeholder="검색어를 입력해주세요."
        />
      </form>
      <ul>
        {searches?.map((v) => (
          <li key={v.id}>
            <button type="button" onClick={getAddress(v)}>
              {String(v.place_name)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchKakao;
