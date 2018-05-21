import React from 'react';
import { Button } from 'react-bootstrap';
import TransportComponent from './TransportComponent';

interface LeftBarState {
    visibleLeftBar: boolean;
}

export default class LeftBarComponent extends React.Component<any, LeftBarState> {

    constructor(props: {}) {
        super(props);
        this.showLeftBar = this.showLeftBar.bind(this);
        this.hideLeftBar = this.hideLeftBar.bind(this);
        this.state = {
            visibleLeftBar: false,
        };
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    componentWillUnmount() {
        this.props.onRef(null);
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
       if (this.state.visibleLeftBar) {
           leftBar = (
               <div className={'OpenedLeftBar'}>
                   <div>
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
           </div>);
    }
}