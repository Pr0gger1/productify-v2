import StarIcon from '@mui/icons-material/StarRounded';
import React, { FC, MouseEvent } from 'react';
import StarBorderIcon from '@mui/icons-material/StarBorderRounded';
import styled from 'styled-components';

const StyledStarIcon = styled(StarIcon)`
	transition: transform 1s ease-in-out;

	&:active {
		transform: scale(1.3);
	}
`;

const StyledStarBorderIcon = styled(StarBorderIcon)`
	transition: transform 1s ease-in-out;

	&:active {
		transform: scale(1.3);
	}
`;

interface StarButtonProps {
	isFavorite: boolean;
	onClick?: (event: any) => any;
	sx?: any;
}

const StarButton: FC<StarButtonProps> = ({ isFavorite, onClick, sx = {} }) => {
	// const [isAnimating, setIsAnimating] = useState(false);

	const handleStarClick = (event: MouseEvent): void => {
		// setIsAnimating(true);
		if (onClick) onClick(event);

		setTimeout((): void => {
			// setIsAnimating(false);
		}, 200);
	};

	return (
		<>
			{isFavorite ? (
				<StyledStarIcon
					sx={Object.assign(
						{
							color: '#ffc107',
							fontSize: 32,
							cursor: 'pointer',
						},
						sx,
					)}
					onClick={handleStarClick}
					// isAnimating = {isAnimating}
				/>
			) : (
				<StyledStarBorderIcon
					sx={Object.assign(
						{
							fontSize: 32,
							color: 'var(--starColor)',
							cursor: 'pointer',
						},
						sx,
					)}
					onClick={handleStarClick}
					// isAnimating = {isAnimating}
				/>
			)}
		</>
	);
};

export default StarButton;
