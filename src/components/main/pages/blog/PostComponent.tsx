import Avatar from "@mui/material/Avatar"
import { IPost } from "../../../../redux/models"
import { User } from 'firebase/auth'
import s from "./Blog.module.scss"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from "@mui/icons-material/Edit"
import { Tooltip } from "@mui/material"
import { useState } from "react";
import { Modal } from "../../../modal/Modal";
import { FormCreatePost } from "../../../modal/forms/FormCreatePost";
import { deleteDoc, doc } from "firebase/firestore"
import db from "../../../../firebase"
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'

interface PostProps {
    post: IPost
    account: User | null | undefined
}

export const PostComponent = ({ post, account }: PostProps) => {
    const [isModalOpen, setModalOpen] = useState<boolean>(false)



    const handleCloseModal = () => {
        setModalOpen(false)
    }

    const deletePost = async () => {
        const postDoc = doc(db, 'posts', post.id)
        await deleteDoc(postDoc)
    }
    const formatData = (inputData: number | string) => {
        dayjs.extend(relativeTime)
        return dayjs(new Date(inputData)).fromNow()
    }

    return (
        <>
            <div className={s.post}>
                <div className={s.post_header}>
                    <Avatar
                        src={post?.autor?.photoUrl || "/broken-image.jpg"}
                        sx={{ width: 56, height: 56 }}
                    />
                    <span>{post?.autor?.name}</span>
                    {account?.uid === post.autor.id &&
                        <div className={s.post_edit}>
                            <Tooltip title="edit" >
                                <EditIcon onClick={() => setModalOpen(true)} />
                            </Tooltip>
                            <Tooltip title="delete" >
                                <DeleteOutlineIcon onClick={deletePost} />
                            </Tooltip>
                        </div>}

                </div>

                <div className={s.post_description}> {post?.post}</div>

                <div className={s.post_date}> {formatData(post?.date)}</div>
            </div>
            {isModalOpen && (<Modal onClose={handleCloseModal} children={<FormCreatePost onClose={handleCloseModal} data={post} />} />)}
        </>
    )
}