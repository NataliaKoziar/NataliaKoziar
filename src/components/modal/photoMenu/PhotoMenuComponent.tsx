import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { Fab } from "@mui/material"
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useTypedSelector } from '../../../common/hooks/useTypedSelector';
import { doc, setDoc } from 'firebase/firestore';
import db, { storage } from "../../../firebase"
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '../../../redux/action/userActions';
import { Modal } from '../Modal';
import { ProgressComponent } from '../ProgressComponent';

export const PhotoMenuComponent = () => {
    const user = useTypedSelector(state => state.user.user)
    const loading = useTypedSelector(state=>state.user.loading)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [progress, setProgress] = useState<number>(0)
    const dispatch = useDispatch()

    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const editUser = async (value: string | null, name: string | null) => {
        const docRef = doc(db, "users", user.id)
        try {
            await setDoc(docRef, {
                ...user,
                img: value,
                imgName: name
            })
        } catch (e) {
            console.log(e);
        }
    }

    const handleUploadImg = (e: any) => {
        dispatch(userActions.setLoading(true));
        if (user?.img !== null) {
            deleteImg()
        }
        const storageRef = ref(storage, `/images/${user.id}/${e.target.files[0].name}`)
        const data =  uploadBytesResumable(storageRef, e.target.files[0])
        data.on("state_changed", (snapshot) => {
            const progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            setProgress(progress);

        }, (e) => console.log(e), () => {
            getDownloadURL(data.snapshot.ref)
                .then(url => editUser(url, e.target.files[0].name)
                ).then(()=>dispatch(userActions.setLoading(false)))
        }
        )
        handleClose();
        
    }
    const deleteImg = () => {
        const imageRef = ref(storage, `/images/${user.id}/${user.imgName}`)
        deleteObject(imageRef).then(() => {
            editUser(null, null)
        }).catch(e => console.log(e))
        handleClose();
    }
    const handleDeleteImg = () => {
        deleteImg();
        handleClose();
    }



    return (
        <div>
            {(loading === true) && <Modal children={<ProgressComponent value={progress}/>}></Modal>}
            <Fab
                size="medium"
                aria-label="add"
                sx={{ position: "absolute", bottom: 5, right: 10, zIndex: 1 }}
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <CameraAltIcon />
            </Fab>
            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem onChange={handleUploadImg}>
                    <label>
                        {user?.img === null ? 'Upload image' : 'Change image'}
                        <input type="file"
                            hidden

                        />
                    </label>
                </MenuItem>
                {user?.img !== null && <MenuItem onClick={handleDeleteImg}>Delete image</MenuItem>}
            </Menu>
        </div>
    )
}