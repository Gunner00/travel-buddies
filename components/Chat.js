import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

function Chat({ currentUser, recipientUser }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    fetchMessages();
    subscribeToMessages();
  }, []);

  async function fetchMessages() {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', getConversationId())
      .order('created_at');

    if (error) {
      console.error('Error fetching messages:', error);
    } else {
      setMessages(data);
    }
  }

  function subscribeToMessages() {
    const subscription = supabase
      .from('messages')
      .on('*', () => {
        fetchMessages();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }

  async function sendMessage() {
    if (newMessage.trim() === '') return;

    const messageData = {
      sender_id: currentUser.id,
      recipient_id: recipientUser.id,
      conversation_id: getConversationId(),
      content: newMessage,
      created_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('messages').insert(messageData);

    if (error) {
      console.error('Error sending message:', error);
    } else {
      setNewMessage('');
    }
  }

  function getConversationId() {
    // Generate a unique conversation ID based on user IDs
    const ids = [currentUser.id, recipientUser.id];
    ids.sort();
    return ids.join('_');
  }

  return (
    <div>
      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <p>{message.content}</p>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;