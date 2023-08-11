import React, {FC} from 'react';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

interface DeleteButtonProps {
    onClick: () => void,
    sx?: any
}

const DeleteButton: FC<DeleteButtonProps> = ({ onClick, sx = {} }) => {
	return (
		<DeleteRoundedIcon
			onClick={onClick}
			sx={Object.assign({
				fontSize: 24,
				color: '#ff554b',
				backgroundColor: 'var(--bgColorFirst)',
				borderRadius: '0.5rem',
				padding: 1,
				cursor: 'pointer'
			}, sx)}
		/>
	);
};

export default DeleteButton;