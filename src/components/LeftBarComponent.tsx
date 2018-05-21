import React from 'react';
import { Button } from 'react-bootstrap';
import TransportComponent from './TransportComponent';
import FilterComponent from './FilterComponent';
import { Filter } from '../types/filter/Filter';

interface LeftBarState {
    visibleLeftBar: boolean;
}

interface LeftBarComponentProps {
    filter: (filter: Filter) => void;
    removeFilter: () => void;
}

export default class LeftBarComponent extends React.Component<LeftBarComponentProps, LeftBarState> {

    constructor(props: LeftBarComponentProps) {
        super(props);
        this.showLeftBar = this.showLeftBar.bind(this);
        this.hideLeftBar = this.hideLeftBar.bind(this);
        this.state = {
            visibleLeftBar: false,
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
                   <FilterComponent filter={this.props.filter} removeFilter={this.props.removeFilter}/>
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