import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Chats } from '/imports/api/chats.js';

import Moment from 'moment';

import Chat from './Chat.jsx';

import { _ } from 'underscore';

export default class Conversations extends Component {
  renderChats() {
    return this.props.chats.map((chat) => (
      <Chat
        key={chat._id}
        chat={chat}
        deleteChat={this.deleteChat.bind(this)} />
    ));
  }

  deleteChat(chat) {
    Chats.remove(chat._id);
  }

  render() {
    return (
     <div className="container">
       {this.renderChats()}
     </div>
   );
  }
}

Conversations.propTypes = {
  chats: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    chats: Chats.find({}).fetch(),
  };
}, Conversations);
