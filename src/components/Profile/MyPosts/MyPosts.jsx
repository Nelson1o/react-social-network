import React from "react";
import s from './MyPosts.module.css';
import Post from "./Post/Post";

const MyPosts = (props) => {

    let postElement = props.posts.map((p) => {
        return <Post message={p.post} like={p.likesCount} />
    })

    let newPostElement = React.createRef();

    let addPost = () => {
        let text = newPostElement.current.value;
        props.addPost(text);
        newPostElement.current.value = "";
    }

    return (
        <div className={s.postsBlock}>
            <h2>My post</h2>
            <div>
                <div><textarea ref={newPostElement}></textarea></div>
                <div><button onClick={addPost}>Add post</button></div>
            </div>
            <div className={s.posts}>
                {postElement}
            </div>
        </div>
    )
}

export default MyPosts;