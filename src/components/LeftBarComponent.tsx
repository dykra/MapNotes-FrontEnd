import React from 'react';
import { Button } from 'react-bootstrap';
import TransportComponent from './TransportComponent';
import { ButtonToolbar } from 'react-bootstrap';

interface LeftBarState {
    visibleLeftBar: boolean;
    visibleColors: boolean;
}

export default class LeftBarComponent extends React.Component<any, LeftBarState> {

    constructor(props: {}) {
        super(props);
        this.showLeftBar = this.showLeftBar.bind(this);
        this.hideLeftBar = this.hideLeftBar.bind(this);
        this.showColors = this.showColors.bind(this);
        this.state = {
            visibleLeftBar: false,
            visibleColors: false,
        };
    }

    showColors(event: any) {
        this.setState(
            {
                visibleColors: true,
            });
    }

    hideColors(event: any) {
        this.setState(
            {
                visibleColors: false,
            });
    }

    showLeftBar(event: any) {
        this.setState(
            {
                visibleLeftBar: true,
            });
    }

    hideLeftBar(event: any) {
        this.setState({
            visibleLeftBar: false
        });
    }

    render() {
       let leftBar;
       let colors;
       if (this.state.visibleColors) {
           colors = (
                <div className={'OpenedColors'}>
                    <ButtonToolbar>
                        <Button>Pink</Button>
                        <Button>Yellow</Button>
                        <Button>Blue</Button>
                        <Button>Green</Button>
                    </ButtonToolbar>
                </div>
           );
       }
       if (this.state.visibleLeftBar) {
           leftBar = (
               <div className={'OpenedLeftBar'}>
                   <div>
                       <Button
                           onClick={this.showColors}
                       >New group
                       </Button>
                       <Button
                           className={'CloseLeftBarButton'}
                           onClick={this.hideLeftBar}
                       >hide BAR
                       </Button>
                   </div>
                   <TransportComponent/>
               </div>
            );
       } else {
           leftBar = (
               <div className={'ClosedLeftBar'}>
                   <button
                       className={'OpenLeftBarButton'}
                       onClick={this.showLeftBar}
                   > open BAR
                   </button>
               </div>
           );
       }
       return (
           <div>
               {leftBar}
               {colors}
           </div>);
    }
}