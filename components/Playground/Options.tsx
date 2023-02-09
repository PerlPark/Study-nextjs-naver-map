import type { SetOptionsType } from '@/pages/playground';
import SearchPlace from './SearchPlace';
import styles from './Options.module.css';

interface IProps {
  setOptions: SetOptionsType;
}

const Options = ({ setOptions }: IProps) => {
  function onChangeSelectHandler(e: { target: { value: string } }) {
    setOptions((origin) => ({ ...origin, geoJson: e.target.value }));
  }

  return (
    <div className={styles.options}>
      <h2 className={styles.title}>Search</h2>
      <div>
        <SearchPlace />
      </div>
      <h2 className={styles.title}>Options</h2>
      <div>
        <div>
          <h3 className={styles.sectionTitle}>⚡️ Click Event</h3>
          <select>
            <option>좌표 클릭 시 주소 보기</option>
          </select>
        </div>
        <div>
          <h3 className={styles.sectionTitle}>⚡️ GeoJSON</h3>
          <select onChange={onChangeSelectHandler}>
            <option value="">해제</option>
            <option value="/bundang.json">경기도 성남시 분당구</option>
            <option value="/geumileup.json">전라남도 완도군 금일읍</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Options;
