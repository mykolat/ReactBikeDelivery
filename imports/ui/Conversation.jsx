import {Meteor} from 'meteor/meteor';

import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';

// import { Card, CardHeader, CardText } from 'material-ui/Card';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

// API
import {Chats} from '/imports/api/chats.js';
import {Messages} from '/imports/api/messages.js';

// Helpers
import {getTime} from '/imports/ui/getTime.js';

// Components
import Message from '/imports/ui/Message.jsx';

export default class Conversation extends Component {
    fastSendMessage(event) {
        if (event.charCode == 13) {
            event.preventDefault();
            event.stopPropagation();
            this.sendMessage();
        }
    }
    sendMessage() {
        if (this.refs.textInput.getInputNode().value == '') {
            return;
        }
        Meteor.call('newMessage', {
            text: this.refs.textInput.getValue().trim(),
            type: 'text',
            chatId: FlowRouter.current().params.chatId
        });

        // Clear form
        this.refs.textInput.getInputNode().value = ''
        this.refs.textInput.setState({isFocused: false, hasValue: false})
    }
    renderMessages() {
        return this.props.messages.map((message) => (<Message key={message._id} message={message}/>));
    }
    render() {
        const textFieldStyles = {
            display: 'block',
            marginBottom: 10
        };

        const cardActionsStyles = {
            borderTop: '1px solid #dddddd'
        };

        if (_.isEmpty(this.props.chat))
            return null; // this is important for page reloads

        const time = getTime(this.props.chat.lastMessage.timestamp);

        return (
            <div className="container">
                <Card>
                    <CardHeader title={this.props.chat.name} subtitle={< b > {
                        time
                    } < /b>} avatar={this.props.chat.picture}/>
                    <CardText>
                        <div className='message-wrapper'>
                            {this.renderMessages()}
                        </div>
                    </CardText>
                    <CardActions style={cardActionsStyles}>
                        <div className='message-input'>
                            <TextField style={textFieldStyles} floatingLabelText="Message" hintText="Type your message here" multiLine={true} rows={1} rowsMax={4} ref="textInput" onKeyPress={this.fastSendMessage.bind(this)}/>
                            <RaisedButton label="Send" primary={true} onClick={this.sendMessage.bind(this)}/>
                        </div>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

Conversation.propTypes = {
    chat: PropTypes.object.isRequired,
    messages: PropTypes.array.isRequired
};

export default createContainer(() => {
    const chatId = FlowRouter.current().params.chatId;

    return {
        chat: Chats.findOne(chatId) || {},
        messages: Messages.find({chatId}).fetch()
    };
}, Conversation);
