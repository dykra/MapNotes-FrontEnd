import * as Button from 'react-bootstrap/lib/Button';
import * as React from 'react';
import { Filter } from '../../../types/filter/Filter';
import { parseFilterInput } from '../../../utils/filter/parseFilterInput';
import '../../../styles/map/leftbar/FilterComponent.css';
import Input from 'reactstrap/lib/Input';

interface FilterState {
    input: string;
}

interface FilterComponentProps {
    filter: (filter: Filter) => void;
    removeFilter: () => void;
}

export default class FilterComponent extends React.Component<FilterComponentProps, FilterState> {

    constructor(props: FilterComponentProps) {
        super(props);

        this.state = {
            input: '',
        };

        this.filter = this.filter.bind(this);
        this.onChangeFilterInput = this.onChangeFilterInput.bind(this);
    }

    onChangeFilterInput(event: any) {
        this.setState(({
            input: event.target.value
        }));
    }

    filter() {
        const input = this.state.input;
        try {
            if ( input === '') {
                this.props.removeFilter();
            } else {
                this.props.filter(parseFilterInput(input));
            }
        } catch (e) {
            alert(e.message);
        }
    }

    clear() {
        this.setState({input: ''});
        this.props.removeFilter();
    }

    render() {
        return (
            <div className="FilterContent">
                Filter
                <Input
                    placeholder="enter filter"
                    onChange={this.onChangeFilterInput}
                    value={this.state.input}
                />
                <div className="Buttons">
                    <Button
                        className="btn"
                        onClick={this.filter}
                    >
                        Filter
                    </Button>
                    <Button
                        className="btn"
                        onClick={() => this.clear()}
                    >
                        Clear
                    </Button>
                </div>

                <div>
                    <h4>Examples:</h4>
                    <ul>
                        <li>Logical conditions
                            <p>{'( | priority is higher than & )'}:</p>
                            <p>{'a & b | b & c'}</p>
                        </li>
                        <li><p>Specific attribute and his value:</p>
                            <p>attributeName:value</p>
                        </li>
                        <li>Specific fragment of
                            <p>attributeName or its value:</p>
                            <p>canBeRawString</p>
                        </li>
                        <li><p>Specific exactly attributeName or value:</p>
                            <p>forExactValueUsePoint.</p>
                            <p>pointsCanBeInAttribute.:andInValue.</p>
                        </li>
                        <li><p>Comparison for numberAttribute value:</p>
                            <p>numberAttribute:!=2</p>
                            <p>numberAttribute:&lt;3</p>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}