import * as React from "react";

import "./HelpTextContainer.css";

class HelpTextContainer extends React.Component<{ slide: string }> {
    constructor(props) {
        super(props);
    }

    private getSlideData = (slide: string) => {

        let element: JSX.Element;

        if (slide === "home") {
            element =
                <div>
                    <div className="helpSlideHeader">
                        <b>Home</b>
                    </div>
                    <div className="helpContent">
                    <p>
                        Welcome to <i> Economies at a Glance</i>.
                    </p> 

                    <p>
                        <i> Economies at a Glance </i> is a website
                        that allows you, the user, to compare the economies of all the countries around the 
                        world.
                    </p>

                    <p>
                        <i> Economies at a Glance </i> has a navigation bar at the top. You should be able to see the navigation bar just above this help box.
                        This allows you to select the screen they are shown, and the indicator which is displayed on the currently displayed screen.
                    </p>
                    <p>
                        There are two main screens that you can choose between - the Map and the Graph.
                    </p>

                    <p> 
                        You can then select which data indicator you want to be shown by either screen.
                    </p>

                    </div>
                </div>
        }

        else if (slide === "map") {
            element =
                <div>
                    <div className="helpSlideHeader">
                        <b>Map</b>
                    </div>
                    <div className="helpContent">
                        <p>
                            This screen shows you a map of the world with the countries coloured by the currently selected indicator value.
                            You can see what the colour represents by looking at the scale in the bottom left corner.
                        </p>

                        <p> 
                            You can use the zoom and moving options to move around the map to better see the colour of countries or to select them.
                        </p>

                        <p>
                            You can click on a country to be shown detailed information about that country's economy. This information will pop up in a panel
                            to the right of your screen.
                        </p>

                        <p> 
                            As always, you can change the screen, or the indicator by using the navigation bar at the top of your screen.
                        </p>
                    </div>
                </div>
        }

        else {
            element =
                <div>
                    <div className="helpSlideHeader">
                        <b>Graph</b>
                    </div>
                    <div className="helpContent">
                        <p>
                            This screen shows you graphs based on indicators for selected countries.
                        </p>

                        <p> 
                            The most important thing to note in this screen is the country select to the right. Here you can select the countries that you want
                            to be displayed in the graph. You can select countries by region or individually.
                        </p>
                    </div>
                </div>
        }

        return element;
    }

    render() {
        const text: JSX.Element = this.getSlideData(this.props.slide);

        return (
            text
        );
    };
}

export default HelpTextContainer;