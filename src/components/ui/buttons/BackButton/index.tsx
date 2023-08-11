import React, {FC} from 'react';
import {NavigateFunction, useNavigate} from 'react-router-dom';
import IconButton from '../IconButton';

import WestRoundedIcon from '@mui/icons-material/WestRounded';

interface BackButtonProps {to?: string}

const BackButton: FC<BackButtonProps> = ({ to = '/' }): JSX.Element => {
	const navigate: NavigateFunction = useNavigate();

	return (
		<IconButton onClick={() => navigate(to)}>
			<WestRoundedIcon/>
		</IconButton>
	);
};

export default BackButton;