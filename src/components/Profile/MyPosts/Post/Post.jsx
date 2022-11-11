import React from "react";
import s from './Post.module.css';

const Post = (props) => {
    return (
        <div key={props.index} className={s.item}>
            <img src="http://www.imgworlds.com/wp-content/uploads/2015/12/18-CONTACTUS-HEADER.jpg" alt="avatar"/>
            {props.message}
            <div>
                <span>like {props.like}</span>
            </div>
        </div>
    )
}

export default Post;