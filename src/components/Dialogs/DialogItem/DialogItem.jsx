import React from "react";
import { NavLink } from "react-router-dom";
import s from "./../Dialogs.module.css";

const DialogItem = (props) => {
    let path = "/dialogs/" + props.id;

    return (
        <div className={s.item__dialog}>
            <NavLink
                to={path}
                className={({ isActive }) =>
                    isActive ? s.active : undefined
                }
            >{props.name}</NavLink>
        </div>
    )
}

export default DialogItem;