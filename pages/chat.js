import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import "../styles/styles.css"

const ChatPage = dynamic(() => import('../components/Chat'), { ssr: false });

const Chat = () => (
  <>
    <Head>
      <title>Chat</title>
      <link href="https://bootswatch.com/5/litera/bootstrap.css" rel="stylesheet" />
      <link rel="stylesheet" href="../styles/styles.css" />
    </Head>
    <ChatPage />
  </>
);

export default Chat;
