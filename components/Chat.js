import { React, useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [content, setContent] = useState('');
  const dummy = useRef()

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

  const subscribeToMessages = async () => {
    supabase
  .channel('any')
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, message => {
    fetchMessages(message.new);
    console.log('Change received!', message)
  })
  .subscribe()
  setTimeout(() => {
    dummy.current.scrollIntoView({ behavior: 'smooth'});
  }, 300);
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
    <div className="container main-area">
      <ul className="list-unstyled" id="messages">
        {messages.map((message) => (
          <li key={message.id} className="card m-2">
            <div className="card-body">
              <div className="row">
                <div className="col-sm-2 avatar-container">
                  <p className="avatar-username">{message.username}</p>
                </div>
                <div className="col-sm-10">
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
            <label htmlFor="username" className="form-label mt-4">
              Username
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
            <label htmlFor="content" className="form-label mt-4">
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
          <button type="submit" className="btn btn-primary">
            Send
          </button>
        </fieldset>
      </form>
      <div ref={dummy}></div>
    </div>
  );
};

export default Chat;
