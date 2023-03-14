import { AiOutlineSearch } from 'react-icons/ai';
import styles from 'src/styles/ui/Searchbar.module.css';

export const Searchbar: React.FC = () => {
  return (
    <div className={styles.search} data-testid='search'>
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
