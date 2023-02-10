import React, { useEffect } from "react";
import { useState } from "react";
import { Card, CardColumns } from 'react-bootstrap';
import ServerRequests from '../ServerRequests';

const server = new ServerRequests();

export default function Messages() {
    const [messages, setMessages] = useState(null);

    useEffect(() => {
        getMessages(setMessages);
    }, []);

    return (
        <div className="parent">
            <CardColumns>
                {renderMessages(messages)}
            </CardColumns>
        </div>
    );
};

const getMessages = async (setMessages) => {
    const messages = await server.getAllMessages();
    setMessages(messages);
};

const renderMessages = (messages) => {
    if (!messages) return [];
    return messages.map(message => {
        <Card key={message.id}>
            <Card.Header>
                Message #{message.id}
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    {message.text}
                </Card.Text>
            </Card.Body>
        </Card>
    });
};
