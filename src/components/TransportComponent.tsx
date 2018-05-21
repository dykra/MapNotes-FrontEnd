import * as Button from 'react-bootstrap/lib/Button';
import * as React from 'react';
import * as FormControl from 'react-bootstrap/lib/FormControl';
import * as ControlLabel from 'react-bootstrap/lib/ControlLabel';
import { FormGroup } from 'react-bootstrap';
import * as Col from 'react-bootstrap/lib/Col';

interface TransportState {
}

export default class TransportComponent extends React.Component<any, TransportState> {

    references: {startDestination: any; endDestination: any; } =
        {startDestination: null, endDestination: null};

    constructor(props: {}) {
        super(props);
        this.searchForTransport = this.searchForTransport.bind(this);
        this.onChangeDestinationInput = this.onChangeDestinationInput.bind(this);
        this.onChangeDestinationInput = this.onChangeDestinationInput.bind(this);

    }

    componentDidMount() {
        this.props.onRef(this);
    }

    componentWillUnmount() {
        this.props.onRef(null);
    }

    onChangeDestinationInput(index: any) {
        this.references.startDestination.value = index;
    }

    searchForTransport(event: any) {
        console.log('search transport');
        console.log(event);

        if (this.references.endDestination.value !== '' && this.references.startDestination.value !== '' ) {
            this.props.showRoadBetweenMarkers(this.references.startDestination.value,
                this.references.endDestination.value);
        }
    }

    render() {
        return (
            <div className={'TransportBar'}>
                <FormGroup controlId="destinations">
                    <Col componentClass={ControlLabel} sm={8}>Select Destiantion</Col>
                    <Col sm={8}>
                        <FormControl
                            inputRef={(ref) => {this.references.startDestination = ref; }}
                            readOnly={true}
                            placeholder={'Right click on marker to start ...'}
                            onChange={this.onChangeDestinationInput}
                        />
                        <FormControl
                            inputRef={(ref) => {this.references.endDestination = ref; }}
                            placeholder="Enter index of final destination"
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