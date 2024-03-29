import { Tab, Tabs, styled } from '@mui/material';
import React from 'react';

export const StyledTabs = styled(props => (
	<Tabs
		{...props}
		TabIndicatorProps={{
			children: <span className="MuiTabs-indicatorSpan" />,
		}}
	/>
))({
	'& .MuiTabs-indicator': {
		display: 'flex',
		justifyContent: 'center',
		backgroundColor: 'transparent',
	},
	'& .MuiTabs-indicatorSpan': {
		maxWidth: 40,
		width: '100%',
		backgroundColor: '#635ee7',
	},
});

export const StyledTab = styled(props => <Tab disableRipple {...props} />)(
	({ theme }) => ({
		textTransform: 'none',
		fontWeight: theme.typography.fontWeightRegular,
		fontSize: theme.typography.pxToRem(15),
		marginRight: theme.spacing(1),
		color: 'var(--fontColor)',
		'&.Mui-selected': {
			color: 'var(--fontColor)',
		},
		'&.Mui-focusVisible': {
			backgroundColor: 'rgba(100, 95, 228, 0.32)',
		},
		'&.MuiSvgIcon-root': {
			color: 'red',
		},
	}),
);
