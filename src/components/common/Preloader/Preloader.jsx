import React from 'react';
import preloader from '../../../assets/images/Spinner.svg';

let Preloader = (props) => {
    return (
        <div>
            <img src={preloader} alt="spinner"/>
        </div>
    )
}

export default Preloader;