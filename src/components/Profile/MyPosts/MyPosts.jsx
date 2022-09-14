import React from "react";
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import { addPostActionCreator, updateNewPostTextActionCreator } from "../../../redux/profileReducer";

const MyPosts = (props) => {

    let postElement = props.posts.map((p) => {
        return <Post message={p.post} like={p.likesCount} />
    })

    let newPostElement = React.createRef();

    let addPost = () => {
        props.dispatch(addPostActionCreator());
    }

    let onPostChange = () => {
        let text = newPostElement.current.value;
        let action = updateNewPostTextActionCreator(text);
        props.dispatch(action);
    }

    return (
        <div className={s.postsBlock}>
            <h2>My post</h2>
            <div>
                <div><textarea ref={newPostElement} onChange={onPostChange} value={props.newPostText} /></div>
                <div><button onClick={addPost}>Add post</button></div>
            </div>
            <div className={s.posts}>
                {postElement}
            </div>
        </div>
    )
}

export default MyPosts;