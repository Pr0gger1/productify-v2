import React from 'react';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

const DeleteButton = ({ onClick, sx = {} }) => {
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