import { useEffect, useState } from "react";
import { collection, addDoc, doc, getDocs, onSnapshot } from "firebase/firestore"
import db, { auth } from "../../../../firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { FormCreatePost } from "../../../modal/forms/FormCreatePost";
import { Modal } from "../../../modal/Modal";
import { IPost } from "../../../../redux/models"
import { PostComponent } from "./PostComponent";
import s from "./Blog.module.scss"
import { AboutUsComponent } from "./AboutUsComponent";



export const BlogComponent = () => {
    const [account] = useAuthState(auth);
    const [posts, setPosts] = useState<IPost[] | []>([])
    const [isModalOpen, setModalOpen] = useState<boolean>(false)
    const postsRef = collection(db, "posts");

    const getData = async () => {
        let arr: IPost[] | [] = [];
        const querySnapshot = await getDocs(postsRef);
        try {
            querySnapshot.forEach((doc) => {
                // @ts-ignore
                arr.push(doc.data());

            })
            setPosts(arr)
        } catch (e) {
            console.log(e);
        }
    }


    useEffect(() => {

        onSnapshot(postsRef, (snapshot) => {
            // @ts-ignore          
            setPosts(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        })

    }, [])

    const handleCloseModal = () => setModalOpen(false)
    const handleOpenModal = () => setModalOpen(true)
    return (
        <div className={s.blog_page}>
            <AboutUsComponent account={account} onOpen={handleOpenModal} />
            <h2>Posts from users</h2>
            <div className={s.post_list} >
            {posts?.length && posts.map((post, index) => <PostComponent key={index} post={post} account={account} />)}
            </div>
            {isModalOpen && (<Modal onClose={handleCloseModal} children={<FormCreatePost onClose={handleCloseModal} />} />)}
        </div>
    )
}