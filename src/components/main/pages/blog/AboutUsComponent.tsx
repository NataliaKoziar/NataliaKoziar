import { User } from 'firebase/auth'
import laptop from '../../../../images/laptop.png'
import s from "./Blog.module.scss"

interface AboutProps {
    account: User | null | undefined
    onOpen: () => void
}

export const AboutUsComponent = ({ account, onOpen }: AboutProps) => {

    return (
        <div className={s.about} >
            <img src={laptop} alt="img" />
            <div className={s.description}>
                <h3>Hello everyone!!!</h3>
                <p>I developed this application to boost my skills in work with React.
                    I want will be a succesfull FrontEnd Developer in the neabuy future, that I hard work every day to ritch my goal.If you liked this app, it means my wokr wasn`t in vain.
                </p>
                {account?.uid &&
                    <>
                        <p>I`ll  appreciate  if you leave a review.</p>
                        <button className={s.btn} onClick={onOpen}>Add new post</button>
                    </>}


            </div>
        </div>
    )
}