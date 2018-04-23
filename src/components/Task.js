import React from "react";
import {ListGroupItem} from "react-bootstrap";

export default class Task extends React.Component {
    render(){
        return(
            <div className="Task">
                <ListGroupItem>
                    <span>{this.props.todo.name}</span>
                    <span>{this.props.todo.type}</span>
                    <button onClick={() =>
                        this.props.handleClick(this.props.index)}> Click me! </button>
                </ListGroupItem>
            </div>
        )
    }

}