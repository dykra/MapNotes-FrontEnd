const React = require('react');
const e = React.createElement;
const ReactDom = require('react-dom');
const App = require('../components/App');

describe('app component', function () {
   it('should work', function () {
     ReactDOM.render(e(App), document.getElementById('container'));

   });
});
