'use client';

import useDebounce from '@/hooks/useDebounce';
import useMap from '@/hooks/useMap';
import type { DocumentsItem } from '@/pages/api/location-kakao';
import axios from 'axios';
import { useRef, useState } from 'react';
import styles from './page.module.css';

const SearchKakao = () => {
  const { setDebounce } = useDebounce();
  const { setSelectPlace, Map } = useMap({});

  const inputRef = useRef<HTMLInputElement>(null);
  const [searches, setSearches] = useState<DocumentsItem[]>();

  function search(query: string) {
    axios
      .get<DocumentsItem[]>('/api/location-kakao', {
        params: { query },
      })
      .then((res) => setSearches(res.data));
  }

  function getPlaces(e: React.FormEvent) {
    e.preventDefault();

    const value = inputRef.current?.value;
    if (value) setDebounce(() => search(value), 200);
  }

  function selectPlace(selected: DocumentsItem) {
    return () => {
      setSelectPlace(
        [selected.x, selected.y],
        selected.place_name || selected.address_name
      );
    };
  }

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <form onChange={getPlaces} onSubmit={getPlaces}>
          <input
            type="text"
            ref={inputRef}
            placeholder="검색어를 입력해주세요."
          />
        </form>
        <ul>
          {inputRef.current?.value &&
            searches?.map((v) => (
              <li
                key={v.id || `${v.x}${v.y}`}
                style={{
                  borderBottom: '1px #aaa solid',
                  padding: '10px 0',
                }}
              >
                <button
                  type="button"
                  onClick={selectPlace(v)}
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
      <Map style={{ width: '550px', height: '600px' }} />
    </div>
  );
};

export default SearchKakao;
