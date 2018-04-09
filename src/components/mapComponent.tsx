
import * as React from 'react';

// const logo = require('../images/1013.jpg');

export default class HelloWorld extends React.Component {

    render() {
        return (
            <div className="App">
                {/*<button*/}
                    {/*name = "Update"*/}
                    {/*onClick = { e => this.handleOnClick(e) }*/}
                {/*>Update</button>*/}
                {/*<header className="App-header">*/}
                    {/*/!*<img src={logo} className="App-logo" alt="logo" />*!/*/}
                    {/*/!*<h1 className="App-title">MapNotes</h1>*!/*/}
                {/*</header>*/}
                <p className="App-intro">
                         App to handle real estates <code>src/App.tsx</code> and save to reload.
                </p>
            </div>
    );
    }
}