import React, {useEffect, useState} from 'react'
import {NavLink, Redirect} from "react-router-dom";
import play from '../assets/play.png'


export const Menu = (props) => {
    const [nickname, setNick] = useState('')



    const setName = (e) => {
        let name = e.target.value
        setNick(name)
        props.setNickname(name)
    }

    const setNameOnClick = (e) => {
        e.preventDefault()
    }




    return (
        <div className='menu-container'>
            <div>
                <form onSubmit={setNameOnClick} className='nickname-input'>
                    <div className="input-group mb-3">
                        <input maxLength='8' type="text" className="form-control" placeholder="Enter nickname"
                               aria-label="Enter nickname" aria-describedby="button-addon2" value={nickname}
                               onChange={setName}
                        />
                    </div>
                </form>
                <div className='main-menu'>

                    <div onClick={() => {
                        localStorage.score = 0
                    }} className='menu-item'>

                        <div className='play_img in'><NavLink to='/main'><img className='' src={play} alt=""/></NavLink>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}