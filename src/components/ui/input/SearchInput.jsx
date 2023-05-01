import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchFilter } from '../../../store/reducers/FilterSlice';

import styles from './styles/SearchInput.module.scss';
import {leftSidebarSelector} from "../../../store";

const SearchInput = ({ placeholder = '', ...props}) => {
    const dispatch = useDispatch();
    const isLSidebarOpened = useSelector(leftSidebarSelector);

    const [searchText, setSearchText] = useState('');

    const onSearchChange = event => {
        setSearchText(event.target.value);
        dispatch(setSearchFilter({searchFilter: event.target.value}));
    }

    const searchStyles = !isLSidebarOpened ? {
        cursor: 'pointer'
    } : {};

  return (
      <input
            className={styles.search}
            style={searchStyles}
            type='search'
            placeholder={placeholder}
            onChange={onSearchChange}
            value={searchText}
            {...props}
        />
  )
}

export default SearchInput;
