import React, {Component, PropTypes} from 'react';

// import {createContainer} from 'meteor/react-meteor-data';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// import Moment from 'moment';

// import Chat from './Chat.jsx';

// import { _ } from 'underscore';

export default class Landing extends Component {

    render() {
        return (
            <MuiThemeProvider>
            <header id="top" className="header">
                <div className="text-vertical-center">
                    <h1>Bike Lviv</h1>
                    <h3>Велодоставка у Львові</h3>
                    <RaisedButton label="Send" primary={true}  onClick={() => FlowRouter.go('/chats/')}/>
                </div>
            </header>
            </MuiThemeProvider>
        );
    }
}

// Conversations.propTypes = {
//   chats: PropTypes.array.isRequired,
// };

// export default createContainer(() => {
//   return {
//     chats: Chats.find({}).fetch(),
//   };
// }, Conversations);
