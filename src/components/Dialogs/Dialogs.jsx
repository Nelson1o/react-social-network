import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Dialogs.module.css";

const Dialogs = (props) => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogs__item}>
                <div className={s.item__dialog + ' ' + s.active}>
                    <NavLink to="/dialogs/1">Dimych</NavLink>
                </div>
                <div className={s.item__dialog}>
                    <NavLink to="/dialogs/2">Andrey</NavLink>
                </div>
                <div className={s.item__dialog}>
                    <NavLink to="/dialogs/3">Sveta</NavLink>
                </div>
                <div className={s.item__dialog}>
                    <NavLink to="/dialogs/4">Sasha</NavLink>
                </div>
                <div className={s.item__dialog}>
                    <NavLink to="/dialogs/5">Victor</NavLink>
                </div>
                <div className={s.item__dialog}>
                    <NavLink to="/dialogs/6">Anton</NavLink>
                </div>
            </div>
            <div className={s.messages}>
                <div className={s.message}>Hi!</div>
                <div className={s.message}>How is your Name?</div>
                <div className={s.message}>Where are you?</div>
            </div>
        </div>
    )
}

export default Dialogs;