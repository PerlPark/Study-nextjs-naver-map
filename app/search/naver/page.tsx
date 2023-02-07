'use client';

import useDebounce from '@/hooks/useDebounce';
import axios from 'axios';
import { useRef, useState } from 'react';

const SearchNaver = () => {
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
      .get('/api/location-naver', { params: { query } })
      .then((res) => setSearches(res.data.items));
  }

  function getAddress(v: any) {
    return () => {
      alert(v.address);
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
          <li key={`${v.mapx}${v.mapy}`}>
            <button type="button" onClick={getAddress(v)}>
              {v.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchNaver;
