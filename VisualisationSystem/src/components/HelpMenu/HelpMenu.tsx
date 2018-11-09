;
"use strict";

import * as React from 'react';

import SlideButton from "../SlideButton/SlideButton";
import HelpTextContainer from "../HelpTextContainer/HelpTextContainer";

import "./HelpMenu.css";

class HelpMenu extends React.Component<{}> {

    private slides: string[] = ["home", "map", "graph"];

    private currentIndex: number;

    constructor(props) {
        super(props);

        this.currentIndex = 0;

        this.state = {
            slide: this.slides[this.currentIndex],
        }
    }

    private slideForward = () => {
        if (this.currentIndex < this.slides.length) {
            this.currentIndex++;
        }
        
        this.forceUpdate();
    }

    private slideBackward = () => {
        if (this.currentIndex > 0) {
            this.currentIndex--;
        }

        this.forceUpdate();

    }

    render() {
        return (
                <div className="helpContainer">
                    <div className="helpTitle"> <b> Need Help?</b> </div>
                        <div className="helpFlexContainer"> 
                            <SlideButton direction="left" onClick={this.slideBackward}/>
                            <div className="helpTextContainer">
                                <HelpTextContainer slide={this.slides[this.currentIndex]}/>
                            </div>                             
                            <SlideButton direction="right" onClick={this.slideForward}/>
                    </div> 
                </div>
        );
    }
}

export default HelpMenu;