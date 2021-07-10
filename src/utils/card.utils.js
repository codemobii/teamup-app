import { useState } from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import Cookies from 'js-cookie';

const CardUtils = () => {
  //

  const toast = useToast();
  // let history = useHistory();

  // State managers
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [inviting, setInviting] = useState(false);
  const [cards, setCards] = useState([1, 2]);
  const [cards_, setCards_] = useState([1, 2]);
  const [card, setCard] = useState({});

  const token = Cookies.get('token');
  const id = Cookies.get('id');

  // Get Cards
  const getCards = async () => {
    setLoading(true);
    await Axios({
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${token}`,
      },
      proxy: {
        host: '104.236.174.88',
        port: 3128,
      },
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}cards`,
      params: {
        user: id,
        isUser: true,
      },
    })
      .then(res => {
        setCards(res.data.cards);
      })
      .catch(er => {
        console.log(er);
        toast({
          title: 'Error',
          description: er.response.data.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      })
      .finally(() => setLoading(false));
  };

  // Get card
  const getCard = async id => {
    setLoading(true);
    await Axios({
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${token}`,
      },
      proxy: {
        host: '104.236.174.88',
        port: 3128,
      },
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}cards/${id}`,
    })
      .then(res => {
        setCard(res.data.card);
      })
      .catch(er => {
        console.log(er);
        toast({
          title: 'Error',
          description: er.response.data.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      })
      .finally(() => setLoading(false));
  };

  const getCardsJoined = async () => {
    setLoading(true);
    await Axios({
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${token}`,
      },
      proxy: {
        host: '104.236.174.88',
        port: 3128,
      },
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}cards`,
      params: {
        user: id,
      },
    })
      .then(res => {
        setCards_(res.data.cards);
      })
      .catch(er => {
        console.log(er);
        toast({
          title: 'Error',
          description: er.response.data.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      })
      .finally(() => setLoading(false));
  };

  // Invite
  const inviteMembers = async data => {
    setInviting(true);
    await Axios({
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${token}`,
      },
      proxy: {
        host: '104.236.174.88',
        port: 3128,
      },
      method: 'POST',
      url: `${process.env.REACT_APP_API_URL}invite`,
      data,
    })
      .then(res => {
        toast({
          title: 'Success',
          description: res.data.message,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      })
      .catch(er => {
        console.log(er);
        toast({
          title: 'Error',
          description: er.response.data.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      })
      .finally(() => setInviting(false));
  };

  // Add
  const addCard = async data => {
    setAdding(true);
    await Axios({
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${token}`,
      },
      proxy: {
        host: '104.236.174.88',
        port: 3128,
      },
      method: 'POST',
      url: `${process.env.REACT_APP_API_URL}cards`,
      data,
    })
      .then(res => {
        toast({
          title: 'Success',
          description: res.data.message,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        const inviteData = {
          card: res.data.data._id,
          sender: id,
          recievers: data.emails.toString(),
        };
        // console.log(data.emails);
        if (data.emails.length !== 0) {
          inviteMembers(inviteData);
        }
        getCards();
      })
      .catch(er => {
        console.log(er);
        toast({
          title: 'Error',
          description: er.response.data.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      })
      .finally(() => setAdding(false));
  };

  // Add
  const acceptInvite = async data => {
    setLoading(true);
    await Axios({
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${token}`,
      },
      proxy: {
        host: '104.236.174.88',
        port: 3128,
      },
      method: 'POST',
      url: `${process.env.REACT_APP_API_URL}accept`,
      data,
    })
      .then(res => {
        toast({
          title: 'Success',
          description: res.data.message,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      })
      .catch(er => {
        console.log(er);
        toast({
          title: 'Error',
          description: er.response.data.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      })
      .finally(() => setLoading(false));
  };

  return {
    getCards,
    getCardsJoined,
    addCard,
    acceptInvite,
    inviteMembers,
    getCard,
    card,
    cards_,
    cards,
    inviting,
    loading,
    adding,
  };
};

export default CardUtils;
