import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import Avatar from './Avatar';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    fetchMessages();
    subscribeToMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase.from('messages').select('*');
      if (error) {
        console.error('Error fetching messages:', error);
      } else {
        setMessages(data);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const subscribeToMessages = () => {
    supabase
      .from('messages')
      .on('INSERT', (payload) => {
        setMessages((prevMessages) => [...prevMessages, payload.new]);
      })
      .subscribe();
  };

  const addMessage = async () => {
    if (!username || !content) {
      return;
    }

    const newMessage = {
      username,
      content,
    };

    try {
      await supabase.from('messages').insert(newMessage);
      setContent('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <ul id="messages">
        {messages.map((message) => (
          <li key={message.id}>
            <div>
              <div>
                <div>
                  <Avatar
                    url={message.avatar_url}
                    showUpload={false}
                  />
                  <p>{message.username}</p>
                </div>
                <div>
                  <p>{message.content}</p>
                </div>
              </div>
              <div>
                <p>{message.created_at}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <form onSubmit={addMessage}>
        <fieldset>
          <div>
            <label htmlFor="username">
              Username
            </label>
            <input
              name="username"
              type="text"
              id="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="content">
              Message
            </label>
            <textarea
              name="content"
              id="content"
              rows="2"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <button type="submit">
            Send
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default Chat;
