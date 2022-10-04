import React from "react";
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import { Field, reduxForm } from "redux-form";
import { maxLengthCreator, requiredField } from "../../../utils/validators/validators";
import { Textarea } from "../../common/FormsControls/FormsControls";

const maxLength10 = maxLengthCreator(10);

const AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    component={Textarea}
                    name={'newPostText'}
                    placeholder='Enter your post...'
                    validate={[requiredField, maxLength10]} 
                />
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const AddPostFormRedux = reduxForm({ form: 'profileAddPostForm' })(AddNewPostForm);

const MyPosts = React.memo(props => {

    let postElement = props.posts.map((p) => {
        return <Post message={p.post} like={p.likesCount} />
    })

    let onAddPost = (value) => {
        props.addPost(value.newPostText);
    }

    return (
        <div className={s.postsBlock}>
            <h2>My post</h2>
            <AddPostFormRedux onSubmit={onAddPost} />
            <div className={s.posts}>
                {postElement}
            </div>
        </div>
    )
})

export default MyPosts;