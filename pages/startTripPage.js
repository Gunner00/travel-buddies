import React from 'react'
import StartTripPage from '../components/StartTripPage'
import ChatComponent from '../components/ChatComponent';

export default function startTripPage() {
  return (
    <StartTripPage />
  )
}
const [showChat, setShowChat] = useState(false);
<button onClick={() => setShowChat(true)}>Open Chat</button>
{showChat && <ChatComponent currentTrip={currentTrip} />}
