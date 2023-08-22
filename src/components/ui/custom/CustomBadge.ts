import { Badge } from '@mui/material';
import styled from 'styled-components';

export const StyledBadge = styled(Badge)(() => ({
	'& .MuiBadge-badge': {
		minWidth: 5,
		right: 12,
		top: 12,
		color: '#fff',
		height: '0.75rem',
		width: '0.75rem',
		backgroundColor: 'var(--notificationBgColor)',
		fontSize: '0.625rem',
		padding: '0',
	},
}));
