import { AiOutlineSearch } from 'react-icons/ai';
import styles from 'src/styles/ui/Searchbar.module.css';

interface SearchbarProps {
  style?: string;
  testid?: string;
}

export const Searchbar: React.FC<SearchbarProps> = ({ style, testid }) => {
  return (
    <div className={`${styles.search} ${style}`} data-testid={testid}>
      <div className={styles.search__icon}>
        <AiOutlineSearch size={15} color='darkgrey' />
      </div>
      <input
        className={styles.search__input}
        type='text'
        placeholder='Search'
      />
    </div>
  );
};
