import React, { Component } from 'react';
import './Player.css';

class Player extends Component {

    constructor() {
        super();
        this.state = {
            src: "http://audio.itunes.apple.com/apple-assets-us-std-000001/AudioPreview20/v4/49/d6/82/49d682c1-79cb-d628-b4da-8d67306cade4/mzaf_2616282261178931209.plus.aac.p.m4a",
            is_playing: false,
            currentTime: 0,
            progress: 0,
            interval: ()=> {}
        };
        
    }
    
    updateProgress() {
        var self = this;
        this.setState({
            interval: setInterval(() => {
                self.setState({
                    progress: self._player.currentTime/self._player.duration * 100
                });
            }, 150)
        });
    }

    togglePlay() {
        console.log(this._player.currentTime);
        if(this.state.is_playing) {
            this.setState({ currentTime: this._player.currentTime });
            clearInterval(this.state.interval);
            this._player.pause();
        } else {
            this._player.currentTime = this.state.currentTime;
            this.updateProgress();
            this._player.play();
        }
        this.setState({ is_playing: !this.state.is_playing });     
    }

    componentDidMount() {
        var self = this;
        this._player.addEventListener("loadedmetadata", function() {
            console.log("loaded: ",self._player.currentTime);
        });
    }

    render() {
        var allClass = {
            "fa": true,
            "white-text": true,
            "fa-play": !this.state.is_playing,
            "fa-pause": this.state.is_playing
        };
        return (
            <div className="player">
                <span className="controls">
                    <span className="control_btn"><i className="fa fa-backward white-text"></i></span>
                    <span className="control_btn"><i className={ this.getClasses(allClass) } onClick={this.togglePlay.bind(this)}></i></span>
                    <span className="control_btn"><i className="fa fa-forward white-text"></i></span>
                </span>
                <span className="progress">
                    <div className="progress_bar_wrapper">
                        <div className="progress_bar" onClick={this.updatePosition(this)} >
                            <div className="progress_status" style={{width: this.state.progress + '%'}} >
                                <div className="progress_status_head">
                                </div>
                            </div>
                        </div>
                        <audio type="audio/m4a" ref={(element) => {this._player = element}} autoPlay={this.state.is_playing}>
                             <source src={this.state.src}></source> 
                        </audio>
                    </div>
                </span>
            </div>
        );
    }

    getClasses = (c) => {
        let classes = [];
        Object.keys(c).forEach((i) => {
            if(c[i]) {
                classes.push(i)
            }
        });
        return classes.join(' ');
    }

    updatePosition = (ele) => {
        console.log(ele);
    }
}

export default Player;