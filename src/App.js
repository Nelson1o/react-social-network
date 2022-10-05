import React, { Component, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News'
import Music from './components/Music/Music'
import Settings from './components/Settings/Settings'
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { connect } from "react-redux";
import { initializeApp } from "./redux/appReducer";
import Preloader from './components/common/Preloader/Preloader';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

class App extends Component {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader />
        }
        return (
            <div className='app-wrapper'>
                <HeaderContainer />
                <Navbar />
                <div className='app-wrapper-content'>
                    <Suspense fallback={<Preloader />}>
                        <Routes>
                            <Route path='/profile/:userId' element={<ProfileContainer />} />
                            <Route path='/dialogs/*' element={<DialogsContainer />} />
                            <Route path='/news' element={<News />} />
                            <Route path='/music' element={<Music />} />
                            <Route path='/settings' element={<Settings />} />
                            <Route path='/users' element={<UsersContainer />} />
                            <Route path='/login' element={<Login />} />
                        </Routes>
                    </Suspense>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        initialized: state.app.initialized
    }
}

export default connect(mapStateToProps, { initializeApp })(App);