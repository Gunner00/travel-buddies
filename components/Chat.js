import { React, useRef, useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import UniversalFadeAnimation from "./UniversalFadeComponent";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [content, setContent] = useState('');
  const smoothScroll = useRef(null);

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

  useEffect(() => {
    smoothScroll.current?.scrollIntoView();
  }, [messages]);

  const subscribeToMessages = async () => {
    supabase
  .channel('any')
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, message => {
    fetchMessages(message.new);
    console.log('Change received!', message)
  })
  .subscribe()
  }

  const addMessage = async () => {
    if (!username || !content) {
      return;
    }

    const newMessage = {
      username,
      content,
    };

    try {
      event.preventDefault();
      await supabase.from('messages').insert(newMessage);
      setContent('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <>
    
    <div className="container main-area">
      <ul className="list-unstyled" id="messages">
        {messages.map((message) => (
          <li key={message.id} className="card m-2">
            <div className="card-body">
              <div className="row">
                <div className="col-sm-2 avatar-container">
                  <p className="avatar-username">{message.username}</p>
                </div>
                <div className="interBody block text-sm font-small text-gray-700">
                  <p>{message.content}</p>
                </div>
              </div>
              <div className="row">
                <p className="col-sm-12 timestamp">{message.created_at}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <form className="form" onSubmit={addMessage}>
        <fieldset>
          <div className="form-group">
            <label htmlFor="username" className="interBody block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              name="username"
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="content" className="interBody block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              name="content"
              className="form-control"
              id="content"
              rows="2"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Send
          </button>
        </fieldset>
      </form>
      <div ref={smoothScroll} />
    </div>
    </>
  );
};

export default Chat;
