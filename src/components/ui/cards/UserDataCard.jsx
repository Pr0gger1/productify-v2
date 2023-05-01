import React, { useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { userDataSelector } from "../../../store";
import { Avatar } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

import styles from "./styles/UserDataCard.module.scss";

const UserDataCard = ({ userAvatar }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const userData = useSelector(userDataSelector);

    useEffect(() => {
      if (userData && userData.displayName) {
          setUsername(userData.displayName);
          setEmail(userData.email);
      }
    }, [userData]);

  return (
    <section className={styles.user__card}>
        {
            userData ?
            <Avatar
                sx={{width: 40, height: 40}}
                alt="avatar"
                src={userAvatar}
            />
            :
            <Skeleton
                variant='circular'
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
            <Skeleton animation='wave' width={200}/>
            <Skeleton animation='wave' width={150}/>
          </div>
        }
    </section>
  );
};

export default UserDataCard;
