import { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';
import { useParams } from 'react-router';
import Cookies from 'js-cookie';
import { useToast } from '@chakra-ui/toast';

const scrollToBottom = () => {
  const chat = document.getElementById('chat');
  chat.scrollTop = chat.scrollHeight;
};

const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const socketRef = useRef();

  const { id } = useParams();
  const user = Cookies.get('id');
  const toast = useToast();

  useEffect(() => {
    socketRef.current = socketIOClient(process.env.REACT_APP_API_URL, {
      query: { id },
    });

    socketRef.current.on('connect', () => {
      // console.log(socketRef.current.id);
    });

    socketRef.current.on('init', msg => {
      let msgReversed = msg.reverse();
      setMessages(msgReversed);
      setLoading(false);
    });

    socketRef.current.on('push', message => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
      };
      setMessages(messages => [...messages, incomingMessage]);
      scrollToBottom();
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [id]);

  const sendMessage = (message, reply, sendId) => {
    if (!socketRef.current) return;
    socketRef.current.emit('message', {
      message: message,
      senderId: socketRef.current.id,
      user: user,
      replyTo: reply,
      sendId: sendId,
    });
  };

  const sendImage = async (sendId, reply) => {
    if (!socketRef.current) return;
    setUploading(true);
    const { files } = document.querySelector('#imageFile');
    const formData = new FormData();
    formData.append('file', files[0]);
    console.log(formData);
    // replace this with your upload preset name
    formData.append('upload_preset', 'zrhqsswu');

    const options = {
      method: 'POST',
      body: formData,
    };

    await fetch(
      'https://api.Cloudinary.com/v1_1/digital-specie/image/upload',
      options
    )
      .then(res => res.json())
      .then(async res => {
        socketRef.current.emit('message', {
          file: res.secure_url,
          senderId: socketRef.current.id,
          user: user,
          replyTo: reply,
          sendId: sendId,
        });
      })
      .catch(er => {
        console.log(er);
        toast({
          description: 'Something went wrong while upload your file',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      })
      .finally(() => setUploading(false));
  };

  return {
    loading,
    messages,
    uploading,
    sendMessage,
    sendImage,
    scrollToBottom,
  };
};

export default useChat;
