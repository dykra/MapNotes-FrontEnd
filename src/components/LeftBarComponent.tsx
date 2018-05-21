import React from 'react';
import { Button } from 'react-bootstrap';
import TransportComponent from './TransportComponent';
import GroupsComponent from './GroupsComponent';

interface LeftBarState {
    visibleLeftBar: boolean;
    mapId: any;
}

export default class LeftBarComponent extends React.Component<{mapId: any}, LeftBarState> {

    constructor(props: {mapId: any}) {
        super(props);
        this.showLeftBar = this.showLeftBar.bind(this);
        this.hideLeftBar = this.hideLeftBar.bind(this);
        this.state = {
            visibleLeftBar: false,
            mapId: this.props.mapId,
        };
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
       console.log('state in left bar', this.state.mapId);
       let leftBar;
       if (this.state.visibleLeftBar) {
           leftBar = (
               <div className={'OpenedLeftBar'}>
                   <div>
                       <GroupsComponent mapId={this.state.mapId}/>
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