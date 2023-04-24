import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import { IUser } from '../../../../redux/models';
import { Fab, Tooltip } from "@mui/material"
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link } from "react-router-dom";

import s from "./StartPage.module.scss"

interface MediaProps {
    loading?: boolean;
    user: IUser
}

export function SkeletonCard({ loading, user }: MediaProps) {

    return (
        <div className={s.item}>

            <div className={s.row}>
                {loading ? (
                    <Skeleton animation="wave" variant="circular" width={56} height={56} />
                ) : (
                    <Avatar
                        src={user?.img || "/broken-image.jpg"}
                        sx={{ width: 56, height: 56 }}
                    />)}
                <div className={s.data}>
                    <div className={s.title}>
                        {loading ? (
                            <Skeleton animation="wave" height={10} width="40%" />)
                            : (user.firstName + ' ' + user.lastName)}
                    </div>
                    <div className={s.subtitle}>
                        {loading ? (
                            <Skeleton animation="wave" height={10} width="40%" />)
                            : (user?.position)}
                    </div>
                </div>
            </div>

            <div className={s.description}>
                {loading ? (
                    <React.Fragment>
                        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                        <Skeleton animation="wave" height={10} width="80%" />
                    </React.Fragment>
                ) : (user?.about ?
                    <>
                        <hr />
                        {user.about}
                    </> : null)}
            </div>
            {loading ? null : 
                <Link to={`/${user.id}`} style={{ color: "white", textDecoration: "none" }}>
                    <Tooltip title="view CV" >
                    <Fab color="primary" size="small" aria-label="view CV" sx={{ position: "absolute", top: 10, right: 10, zIndex: 1 }}>
                        <AssignmentIcon />
                    </Fab>
                    </Tooltip>
                </Link>
           
            }
        </div>

    )
}