import * as Button from 'react-bootstrap/lib/Button';
import * as React from 'react';
import { PinData } from '../../../types/api/PinData';
import Input from 'reactstrap/lib/Input';

export interface TransportComponentProps {
    visiblePins: PinData[];
    showRoadBetweenMarkers: (result: any) => void;
    onRef: any;
}

export interface TransportComponentState {
    travelMode: google.maps.TravelMode;
    directionsService: any;
    startDestination?: any;
    endDestination?: any;
    currentDistance: any;
}

export class TransportComponent extends React.Component<TransportComponentProps, TransportComponentState> {

    static getKilometersFromMeters(valueInMeters: number) {
        return  valueInMeters / 1000;
    }

    constructor(props: TransportComponentProps) {
        super(props);

        this.state = {
            directionsService: new google.maps.DirectionsService(),
            travelMode: google.maps.TravelMode.DRIVING,
            currentDistance: 0,
        };

        this.searchForTransport = this.searchForTransport.bind(this);
        this.removeTransport = this.removeTransport.bind(this);
        this.changeStartPoint = this.changeStartPoint.bind(this);
        this.changeEndPoint = this.changeEndPoint.bind(this);
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    componentWillUnmount() {
        this.props.onRef(null);
    }

    searchForTransport() {
        const startPoint: any = this.state.startDestination;
        const endPoint: any = this.state.endDestination;
        console.log(startPoint);

        if (startPoint !== '' && endPoint !== '' && this.props.visiblePins.length > Math.max(endPoint, startPoint)) {
            this.state.directionsService.route({
                    origin: this.props.visiblePins[startPoint].data.position,
                    destination: this.props.visiblePins[endPoint].data.position,
                    travelMode: google.maps.TravelMode.DRIVING,
                },
                (result: any,
                 status: any) => {
                    if (status === google.maps.DirectionsStatus.OK) {
                        this.props.showRoadBetweenMarkers(result);
                    } else {
                        console.log(`error fetching directions ${result}`);
                    }
                });

            const startDestination = new google.maps.LatLng(this.props.visiblePins[startPoint].data.position.lat,
                this.props.visiblePins[startPoint].data.position.lng);
            const endDestination =  new google.maps.LatLng(this.props.visiblePins[endPoint].data.position.lat,
                this.props.visiblePins[endPoint].data.position.lng);
            this.setState({
                currentDistance:  TransportComponent.getKilometersFromMeters(
                    google.maps.geometry.spherical.computeDistanceBetween(startDestination, endDestination)),
            });
        }
    }

    changeStartPoint(event: any) {
        this.setState({
            startDestination: event.target.value
        });
    }

    changeEndPoint(event: any) {
        this.setState({
            endDestination: event.target.value
        });
    }

    removeTransport() {
        this.props.showRoadBetweenMarkers(null);
        this.setState({
           currentDistance: 0,
        });
    }

    render() {
        return (
            <div className={'TransportBar'}>
                Select Destiantion
                <Input
                    placeholder="Start destination index"
                    onChange={this.changeStartPoint}
                />
                <Input
                    placeholder="End destination index"
                    onChange={this.changeEndPoint}
                />
                <div className="Buttons">
                    <Button
                        className="btn"
                        onClick={this.searchForTransport}
                    >
                        SEARCH
                    </Button>

                    <Button
                        className="btn"
                        onClick={this.removeTransport}
                    >
                        REMOVE PATH
                    </Button>
                </div>
                <label>
                    Car distance: {this.state.currentDistance} km
                </label>
            </div>
        );
    }
}
