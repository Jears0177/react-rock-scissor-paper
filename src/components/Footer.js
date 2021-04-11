import React from 'react'
import gitLogoW from '../assets/gitHubW.png'
import gitLogoB from '../assets/gitHub.png'

export const Footer = () => {
    const git = () => {
        if (!localStorage.color) {
            return gitLogoB
        } else if (localStorage.color === 'light') {
            return gitLogoB
        } else if (localStorage.color === 'dark') {
            return gitLogoW
        }
    }

    const copyright = () => {
        switch (localStorage.color){
            case 'light':
                return 'd'
            case 'dark':
                return 'l'
            default:
                return 'd'
        }
    }


    return (
        <div className='footer'>
            <div className='footer-images-container'>
                <div className={`copyright f ${copyright()}`}>&copy;2021</div>
                <a href="https://github.com/Jears017/react-game"><img className='footer-gitHub-logo f' src={git()} alt=""/></a>
            </div>
        </div>
    )
}