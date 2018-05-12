import * as Button from 'react-bootstrap/lib/Button';
import * as React from 'react';
import * as FormControl from 'react-bootstrap/lib/FormControl';
import * as ControlLabel from 'react-bootstrap/lib/ControlLabel';
import { FormGroup } from 'react-bootstrap';
import * as Col from 'react-bootstrap/lib/Col';
import { getTransportData } from '../api/TransportApi';

interface TransportState {
    transportInput: string;
    transportRes: any;
}

export default class TransportComponent extends React.Component<any, TransportState> {

    constructor(props: {}) {
        super(props);
        this.searchForTransport = this.searchForTransport.bind(this);
        this.onChangeDestinationInput = this.onChangeDestinationInput.bind(this);
        this.getTransportResult = this.getTransportResult.bind(this);
        this.state = {
            transportInput: '',
            transportRes: '',
        };
    }

    onChangeDestinationInput(event: any) {
        this.setState(({
            transportInput: event.target.value
        }));
    }

    searchForTransport(event: any) {
        console.log('search transport');
        console.log(event);
        console.log(this.state.transportInput);
        getTransportData(
            {'origin': 'Gosford', 'destination': this.state.transportInput},
            this.getTransportResult);
    }

    getTransportResult(event: any) {
        console.log('getting transport result');
        this.setState(({
            transportRes: event.target.value
        }));
    }

    render() {
        return (
            <div className={'TransportBar'}>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={8}>Select Destiantion</Col>
                    <Col sm={8}>
                        <FormControl
                            placeholder="enter destination"
                            onChange={this.onChangeDestinationInput}
                        />
                    </Col>
                    <Button
                        className={'SearchTransportButton'}
                        bsSize="small"
                        active={true}
                        onClick={this.searchForTransport}
                    >SEARCH
                    </Button>
                </FormGroup>
                <div>
                    {this.state.transportRes}
                </div>
            </div>
        );
    }
}