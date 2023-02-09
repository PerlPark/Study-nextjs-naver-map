'use client';
import useMap from '@/hooks/useMap';
import type { NextPage } from 'next';
import { useRef, useState } from 'react';

const Geocoding: NextPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [address, setAddress] = useState<string>('');

  const { Map } = useMap({
    functions: {
      searchCoordinateToAddress: true,
      searchAddressToCoordinate: address || '',
    },
  });

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
      <Map style={{ width: 800, height: 800 }} />
    </div>
  );
};

export default Geocoding;
