'use client';
import Map from '@/components/Map';
import type { NextPage } from 'next';
import { useRef, useState } from 'react';

const Geocoding: NextPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [address, setAddress] = useState<string>('');

  function onSubmitSearch(e: React.FormEvent) {
    e.preventDefault();

    if (!inputRef.current) return;

    setAddress(inputRef.current.value);
  }

  return (
    <div>
      <form onSubmit={onSubmitSearch}>
        <input type="text" ref={inputRef} />
        <button type="submit">검색</button>
      </form>
      <Map
        functions={{
          searchCoordinateToAddress: true,
          searchAddressToCoordinate: address || '',
        }}
        style={{ width: 800, height: 800 }}
      />
    </div>
  );
};

export default Geocoding;
