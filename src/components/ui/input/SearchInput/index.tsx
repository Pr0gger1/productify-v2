import React, { ChangeEvent, useState } from 'react';
import { setSearchFilter } from 'store/reducers/FilterSlice';

import styles from './styles.module.scss';
import { leftSidebarSelector } from 'store/selectors';
import { useAppDispatch, useAppSelector } from 'store';

const SearchInput = ({ ...props }) => {
	const dispatch = useAppDispatch();
	const isLSidebarOpened = useAppSelector(leftSidebarSelector);

	const [searchText, setSearchText] = useState<string>('');

	const onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
		setSearchText(event.target.value);
		dispatch(setSearchFilter({ searchFilter: event.target.value }));
	};

	const searchStyles = !isLSidebarOpened
		? {
				cursor: 'pointer',
		  }
		: {};

	return (
		<input
			className={styles.search}
			style={searchStyles}
			type="search"
			onChange={onSearchChange}
			value={searchText}
			{...props}
		/>
	);
};

export default SearchInput;
