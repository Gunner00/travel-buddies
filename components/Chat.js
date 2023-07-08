import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import Avatar from './Avatar';

export default function Chat() {
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
    <div className="container main-area">
      <ul id="messages">
        {messages.map((message) => (
          <li key={message.id} className="card m-2">
            <div className="row">
              <div className="col-sm-2 avatar-container">
                <Avatar
                  url={message.avatar_url}
                  className="w-20 h-20 rounded-full"
                  showUpload={false}
                />
                <p className="avatar-username">{message.username}</p>
              </div>
              <div className="col-sm-10">
                <p>{message.content}</p>
              </div>
            </div>
            <div className="row">
              <p className="col-sm-12 timestamp">{message.created_at}</p>
            </div>
          </li>
        ))}
      </ul>
      <form className="flex flex-col gap-4 w-full sm:w-60" onSubmit={addMessage}>
        <div>
          <label htmlFor="username" className="mt-4">
            Username
          </label>
          <input
            name="username"
            type="text"
            className="interBody block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
            id="username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="content" className="form-label mt-4">
            Message
          </label>
          <textarea
            name="content"
            className="interBody block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
            id="content"
            rows="2"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <button
          type="submit"
          className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Send
        </button>
      </form>
    </div>
  );
        }  