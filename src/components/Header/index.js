import React from 'react';

import imgLogo from '../../assets/logo.png';

import './styles.css';

export function Header() {
    return (
        <div className='headerContainer'>
            <img 
                className='logo'
                alt='Covid Simulator Logo' 
                src={imgLogo} 
            />
        </div>
    );
}