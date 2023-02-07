'use client';

import useDebounce from '@/hooks/useDebounce';
import type { DocumentsItem } from '@/pages/api/location-kakao';
import axios from 'axios';
import { useRef, useState } from 'react';

const SearchKakao = () => {
  const { setDebounce } = useDebounce();

  const inputRef = useRef<HTMLInputElement>(null);
  const [searches, setSearches] = useState<DocumentsItem[]>();

  function getSearch(e: React.FormEvent) {
    e.preventDefault();

    const value = inputRef.current?.value;
    if (value) setDebounce(() => search(value), 100);
  }

  function search(query: string) {
    axios
      .get<DocumentsItem[]>('/api/location-kakao', { params: { query } })
      .then((res) => setSearches(res.data));
  }

  function getAddress(v: DocumentsItem) {
    return () => {
      alert(v.address_name);
    };
  }

  return (
    <div
      style={{
        width: '300px',
      }}
    >
      <form onChange={getSearch} onSubmit={getSearch}>
        <input
          type="text"
          ref={inputRef}
          placeholder="검색어를 입력해주세요."
        />
      </form>
      <ul>
        {searches?.map((v) => (
          <li
            key={v.id}
            style={{
              borderBottom: '1px #aaa solid',
              padding: '10px 0',
            }}
          >
            <button
              type="button"
              onClick={getAddress(v)}
              style={{
                textAlign: 'left',
                border: 0,
                background: 'transparent',
                cursor: 'pointer',
              }}
            >
              {v.place_name}
              <br />
              {v.address_name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchKakao;
