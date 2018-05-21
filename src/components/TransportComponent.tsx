import * as Button from 'react-bootstrap/lib/Button';
import * as React from 'react';
import * as FormControl from 'react-bootstrap/lib/FormControl';
import * as ControlLabel from 'react-bootstrap/lib/ControlLabel';
import { FormGroup } from 'react-bootstrap';
import * as Col from 'react-bootstrap/lib/Col';

interface TransportState {
    transportInput: string;
    transportRes: any;
}

export default class TransportComponent extends React.Component<any, TransportState> {

    references: {startDestination: any; endDestination: any; } =
        {startDestination: null, endDestination: null};

    constructor(props: {}) {
        super(props);
        this.searchForTransport = this.searchForTransport.bind(this);
        this.onChangeDestinationInput = this.onChangeDestinationInput.bind(this);
        // this.getTransportResult = this.getTransportResult.bind(this);
        this.onChangeDestinationInput = this.onChangeDestinationInput.bind(this);

        this.state = {
            transportInput: '',
            transportRes: '',
        };
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    componentWillUnmount() {
        this.props.onRef(null);
    }

    onChangeDestinationInput(index: any) {
        this.setState(({
            transportInput: index,
        }));
        this.references.startDestination.value = index;

    }

    searchForTransport(event: any) {
        console.log('search transport');
        console.log(event);
        console.log(this.state.transportInput);
    }

    // getTransportResult(event: any) {
    //     console.log('getting transport result');
    //     this.setState(({
    //         transportRes: event.target.value
    //     }));
    // }

    render() {
        return (
            <div className={'TransportBar'}>
                <FormGroup controlId="destinations">
                    <Col componentClass={ControlLabel} sm={8}>Select Destiantion</Col>
                    <Col sm={8}>
                        <FormControl
                            inputRef={(ref) => {this.references.startDestination = ref; }}
                            readOnly={true}
                            value={'Right click on marker to start ...'}
                            onChange={this.onChangeDestinationInput}
                        />
                        <FormControl
                            inputRef={(ref) => {this.references.endDestination = ref; }}
                            placeholder="Enter index of final destination"
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
            </div>
        );
    }
}