import React, { useEffect, useState } from 'react';
import { ChatEngine } from 'react-chat-engine';
import axios from 'axios';

const ChatComponent = ({ currentTrip }) => {
  const [chatCredentials, setChatCredentials] = useState(null);

  useEffect(() => {
    if (currentTrip) {
      const userName = `user_${currentTrip.userId}`; // Customize the username based on the current trip
      const userSecret = generateUserSecret(); // Generate a user secret for the current user

      const authData = {
        'Project-ID': '70506be5-6eca-4717-866d-d76d15105557', // Replace with your actual project ID
        'User-Name': userName,
        'User-Secret': userSecret,
      };

      setChatCredentials(authData);
      createChatUser(userName, userSecret);
    }
  }, [currentTrip]);

  const generateUserSecret = () => {
    // Generate a unique user secret
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  const createChatUser = async (userName, userSecret) => {
    // Create a new user in ChatEngine
    try {
      await axios.post('https://api.chatengine.io/users/', {
        username: userName,
        secret: userSecret,
      });
    } catch (error) {
      console.error('Error creating chat user:', error);
    }
  };

  return (
    <div>
      <ChatEngine
        height="100vh"
        projectID="70506be5-6eca-4717-866d-d76d15105557" // Replace with your actual project ID
        userName={chatCredentials?.['User-Name']}
        userSecret={chatCredentials?.['User-Secret']}
      />
    </div>
  );
};

export default ChatComponent;
