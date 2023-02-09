import Form from '../SearchInput';
import Result from '../SearchResult';
import { debounce, clearDebounce } from '@/utils/debounce';
import { useRef, useState } from 'react';
import useSearchPlace, { SearchPlaceReturnData } from '@/hooks/useSearchPlace';
import useSearchParams from '@/hooks/useSearchParams';
import { useRouter } from 'next/router';
import styles from './SearchPlace.module.css';

const SearchPlace = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState<string>('');

  const { data } = useSearchPlace({ query });

  function searchHandler(
    e: React.FormEvent<HTMLInputElement | HTMLFormElement>
  ) {
    e.preventDefault();

    const inputValue = inputRef.current?.value;
    if (inputValue) {
      debounce(() => setQuery(inputValue), 200);
    } else {
      clearDebounce();
      setQuery('');
    }
  }

  const searchParams = useSearchParams();
  const router = useRouter();

  function onClickItem(data: SearchPlaceReturnData) {
    return () => {
      searchParams.set('x', data.x);
      searchParams.set('y', data.y);
      searchParams.set('name', data.name);

      router.replace(
        router.route + '?' + searchParams.toString(),
        router.route,
        {
          shallow: true,
        }
      );
    };
  }

  return (
    <div className={styles.container}>
      <Form searchHandler={searchHandler} inputRef={inputRef} />
      <Result<SearchPlaceReturnData>
        data={data || []}
        onClickItem={onClickItem}
      />
    </div>
  );
};

export default SearchPlace;
