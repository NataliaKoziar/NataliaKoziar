import { useState } from "react";
import { collection, addDoc, doc, setDoc } from "firebase/firestore"
import db, { auth } from "../../../firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import s from "../../main/pages/signUp/SignUp.module.scss"
import { IPost } from "../../../redux/models";



interface FormProps {
    onClose: () => void
    data?: IPost
}

export const FormCreatePost = ({ onClose, data }: FormProps) => {
    const [account] = useAuthState(auth)
    const [post, setPost] = useState<string>(data?.post || '')

    const createPost = async () => {
        const postsRef = collection(db, 'posts')
        await addDoc(postsRef, {
            post,
            autor: { name: account?.displayName, id: account?.uid, photoUrl: account?.photoURL },
            date: Date.now()
        })
        onClose();
    }
    const editPost = async () => {
        if (data?.id !== undefined) {

            const postRef = doc(db, 'posts', data.id)
            try {
                await setDoc(postRef, {
                    ...data,
                    post
                })
            } catch (e) {
                console.log(e);
            }
        }
        onClose();
    }

    return (
        <form style={{ height: "400px", width: "550px" }}>
            <h3>Add new post</h3>
            {/* @ts-ignore */}
            <textarea placeholder="Post..." value={post} onChange={(e) => setPost(e.target.value)} />

            <input className={s.btn} type={"button"} value={"Send"} onClick={(e) => {
                e.preventDefault();
                if (data?.id !== undefined) {
                    editPost()
                } else {
                    createPost();
                }
            }} />
        </form>
    )
}