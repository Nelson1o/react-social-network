import React from "react";
import { NavLink } from "react-router-dom";
import s from './Header.module.css';

const Header = (props) => {
    return (
        <header className={s.header}>
            <img src='https://i.pinimg.com/736x/0d/cf/b5/0dcfb548989afdf22afff75e2a46a508.jpg' alt='logo'></img>
            <div className={s.login_block}>
                {props.isAuth ? props.login : <NavLink to={'/login'}>Login</NavLink>}
                
            </div>
        </header>
    )
}

export default Header;