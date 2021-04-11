import React, {useState} from 'react'
import {data} from "../data/data";
import {Game} from "./Play";
import {NavLink, Route, Redirect} from "react-router-dom";
import {MainC} from "./MainC";
import {Score} from "./Score";
import {Menu} from "./Menu";
import {Footer} from "./Footer";
import {PlayContainer} from "./PlayContainer";
import lose from '../assets/faild-sound.mp3'
import win from '../assets/tr.mp3'


export class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userStep: '',
            computerStep: '',
            message: '',
            count: localStorage.score,
            nick: '',
            lightColor: 'light',
            value: 0
        }

        this.audioWin = new Audio(win)
        this.audioLose = new Audio(lose)
    }

    getCopmuterStep = (data) => {
        let rand = Math.floor(Math.random() * 3)
        setTimeout(() => {
            this.setState({computerStep: data[rand]})
        }, 2000)
    }

    game = () => {
        const {userStep, computerStep} = this.state
        let combine = userStep + computerStep
        switch (combine) {
            case 'rr':
            case 'ss':
            case 'pp':
                return 'draw'
                break;
            case 'rs':
            case 'sp':
            case 'pr':

                this.setState((prevState) => {
                    return {
                        value: Number(prevState.value) + 1
                    }
                })
                this.audioWin.play()
                return 'You win!'
                break;
            case 'sr':
            case 'ps':
            case 'rp':
                this.setState((prevState) => {
                    return {
                        value: prevState.value - 1
                    }
                })
                this.audioLose.play()
                return 'You lose!'
                break;
        }
    }

    userStepOnClick = (e) => {
        this.setState({userStep: e.target.name})
        this.getCopmuterStep(data)
        setTimeout(() => {
            this.setState({message: this.game()})
        }, 2000)

    }

    resetOnClick = () => {
        this.setState({userStep: '', computerStep: '', message: '',})
    }

    resetScore = (e) => {
        const {count} = this.state
        e.preventDefault()
        this.setState({value: 0, nick: ''})
    }

    setNickname = (nickname) => {
        this.setState({nick: nickname})
    }

    setValue = (value) => {
        this.setState({value: value})
    }


    render() {
        const {count, userStep, computerStep, message, value} = this.state
        localStorage.score = this.state.count;
        return (
            <div>
                <Route path='/main'
                       render={() => <Score color={this.props.color} bgClass={this.props.bgClass} count={value}/>}/>
                <Route path='/game' render={() => <Score count={value}/>}/>

                <Route path='/main' render={() => <MainC play={this.props.play} resetScore={this.resetScore}
                                                         userStepOnClick={this.userStepOnClick}/>}/>

                <Route path='/game' render={() => (
                    <PlayContainer userStepOnClick={this.userStepOnClick}
                                   resetOnClick={this.resetOnClick}
                                   count={count}
                                   userStep={userStep}
                                   computerStep={computerStep}
                                   message={message}
                                   nick={this.state.nick}
                    />)}/>
                <Route exact path='/' render={() => <Menu setValue={this.setValue} nickname={this.state.nick}
                                                          setNickname={this.setNickname}/>}/>
                <Footer/>
            </div>


        )
    }
}

