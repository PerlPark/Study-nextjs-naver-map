import styles from './SearchResult.module.css';

export interface ListItem<ButtonReturn> {
  key: string;
  title: string;
  subText?: string;
  buttonReturn: ButtonReturn;
}

const SearchResult = <ButtonReturn extends unknown>({
  data,
  onClickItem,
}: {
  data: ListItem<ButtonReturn>[];
  onClickItem: (data: ButtonReturn) => () => void;
}) => {
  if (!data.length) return null;

  return (
    <div className={styles.result}>
      <ul>
        {data.map((item) => (
          <li key={item.key}>
            <button
              type="button"
              className={styles.item}
              onClick={onClickItem(item.buttonReturn)}
            >
              {item.title}
              {item.subText && (
                <>
                  <br />
                  <span className={styles.subText}>{item.subText}</span>
                </>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResult;
