import { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import ServerRequests from '../ServerRequests';
import MessageCard from './MessageCard';
import Message from '../types/Message';

const server = new ServerRequests();

export default function MessageList() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    getMessages(setMessages);
  }, []);

  return (
    <div>
      <Grid container spacing={2}>
        {renderMessages(messages)}
      </Grid>
    </div>
  );
};

const getMessages = async (setMessages: Function): Promise<void> => {
  const messages = await server.getAllMessages();
  setMessages(messages);
};

const renderMessages = (messages: Message[]) => {
  if (!messages) return [];
  return messages.map(({ id, text, timestamp }: Message) => (
    <MessageCard key={`${id}`} id={id} text={text} timestamp={timestamp} />
  ));
};
