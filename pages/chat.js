import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

const ChatPage = dynamic(() => import('../components/Chat'), { ssr: false });

const Chat = () => (
  <>
    <ChatPage />
  </>
);

export default Chat;
