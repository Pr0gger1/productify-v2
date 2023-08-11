import React, {FC, useEffect, useState} from 'react';
import { userDataSelector } from 'store/selectors';
import { Avatar } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

import styles from './styles.module.scss';
import {User} from 'firebase/auth';
import {useAppSelector} from 'store';

interface UserDataCardProps {
    userAvatar?: string
}

const UserDataCard: FC<UserDataCardProps> = ({ userAvatar }): JSX.Element => {
	const [username, setUsername] = useState<string>('');
	const [email, setEmail] = useState<string>('');

	const userData: User | null = useAppSelector(userDataSelector);

	useEffect((): void => {
		if (userData) {
			setUsername(userData.displayName ?? '');
			setEmail(userData.email ?? '');
		}
	}, [userData]);

	return (
		<section className={styles.user__card}>
			{
				userData ?
					<Avatar
						sx={{width: 40, height: 40}}
						alt="avatar"
						src={userAvatar || (userData?.photoURL ?? '')}
					/>
					:
					<Skeleton
						variant="circular"
						width={40}
						height={40}
					/>
			}
			{
				username.length !== 0 && email.length !== 0 ?
					<div className={styles.user__card__info}>
						<span className={styles.user__card__name}>{username}</span>
						<span className={styles.user__card__email}>{email}</span>
					</div>
					:
					<div className={styles.loading}>
						<Skeleton animation="wave" width={200}/>
						<Skeleton animation="wave" width={150}/>
					</div>
			}
		</section>
	);
};

export default UserDataCard;
