import React from "react";

export default class Form extends React.Component {



   render(){
       return(
           <div className="Form">
               <form onSubmit={(evt) => this.props.handleSubmit(evt)}>
                   <input
                       onChange={(evt) => this.props.handleChange(evt)}
                       value={this.props.inputValue}
                   />
               </form>
           </div>
       )
   }


}