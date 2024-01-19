

import React, { useState } from 'react';
import searchIcon from '../../assets/searchIcon.svg'
import styles from './SearchBox.module.css'

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (term: string) => {
    setSearchQuery(term);
    onSearch(term);
  }

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Search by title"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <img src={searchIcon} alt="searchIcon" />
    </div>
  );
};

export default SearchBox;
