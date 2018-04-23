import React from "react";
import Task from './Task';
import {ListGroup, ListGroupItem} from "react-bootstrap";

export default class List extends React.Component {


    render(){
        return(
            <div className="List">
                <ListGroup>

                        {this.props.todos.map((todo, index) => {
                            return (

                                    <Task
                                        key = {index}
                                        index = {index}
                                        handleClick ={this.props.handleClick}
                                        todo={todo}
                                    />

                            )
                        })}

                </ListGroup>
            </div>
        )
    }


}