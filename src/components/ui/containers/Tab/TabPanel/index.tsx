import React from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

function TabPanel(props: any) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`tabpanel-${index}`}
			aria-labelledby={`tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box
					sx={{
						p: 3,
					}}
				>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: '0.75rem',
							justifyContent: 'flex-start',
						}}
					>
						{children}
					</div>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

export default TabPanel;
