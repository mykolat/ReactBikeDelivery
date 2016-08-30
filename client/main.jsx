// Meteor Dependencies and collections
import { FlowRouter } from 'meteor/kadira:flow-router';

// React Dependencies
import React from 'react';
import { mount } from 'react-mounter';

// App Components
import Layout from '/imports/ui/Layout.jsx';
import Landing from '/imports/ui/Landing.jsx';
import Conversations from '/imports/ui/Conversations.jsx';
import Conversation from '/imports/ui/Conversation.jsx';


FlowRouter.route('/', {
  name: 'root',
  action() {
    mount(Landing);
  },
});

// Routes
const chatRoutes = FlowRouter.group({
  prefix: '/chats',
  name: 'chat',
  triggersEnter: [function(context, redirect) {
    console.log('running group triggers');
  }]
});

chatRoutes.route('/:chatId', {
  name: 'chat',
  action() {
    mount(Layout, {
      content: (<Conversation />),
    });
  },
});

chatRoutes.route('/', {
  name: 'chatIndex',
  action() {
    mount(Layout, {
      content: (<Conversations />),
    });
  },
});
