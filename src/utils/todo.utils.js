import { useState } from 'react';
import Axios from 'axios';
import { useToast } from '@chakra-ui/react';
import Cookies from 'js-cookie';

const TodoUtils = () => {
  //

  const toast = useToast();

  // State managers
  const [loading, setLoading] = useState(true);
  const [_loading, set_loading] = useState(false);
  const [todos, setTodos] = useState([1, 2, 3, 4]);

  const token = Cookies.get('token');
  const id = Cookies.get('id');

  // Get Todos
  const getTodos = async e => {
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
      url: `${process.env.REACT_APP_API_URL}todos`,
      params: {
        user: e.user,
        card: e.card,
      },
    })
      .then(res => {
        setTodos(res.data.todos);
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

  const addTodo = async data => {
    set_loading(true);
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
      url: `${process.env.REACT_APP_API_URL}todos`,
      data,
    })
      .then(res => {
        getTodos({
          card: data.card,
          user: null,
        });
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
      .finally(() => set_loading(false));
  };

  const editTodo = async data => {
    set_loading(true);
    await Axios({
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${token}`,
      },
      proxy: {
        host: '104.236.174.88',
        port: 3128,
      },
      method: 'PUT',
      url: `${process.env.REACT_APP_API_URL}todos/${data.todoId}`,
      data,
    })
      .then(res => {
        getTodos({
          card: data.card,
          user: null,
        });
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
      .finally(() => set_loading(false));
  };

  const deleteTodo = async data => {
    set_loading(true);
    await Axios({
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${token}`,
      },
      proxy: {
        host: '104.236.174.88',
        port: 3128,
      },
      method: 'DELETE',
      url: `${process.env.REACT_APP_API_URL}todos/${data.todoId}`,
      data,
    })
      .then(res => {
        getTodos({
          card: data.card,
          user: null,
        });
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
      .finally(() => set_loading(false));
  };

  const markTodo = async data => {
    set_loading(true);
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
      url: `${process.env.REACT_APP_API_URL}mark/${data.todoId}`,
      data,
    })
      .then(res => {
        getTodos({
          card: data.card,
          user: null,
        });
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
      .finally(() => set_loading(false));
  };

  return {
    getTodos,
    addTodo,
    editTodo,
    deleteTodo,
    markTodo,
    todos,
    _loading,
    loading,
  };
};

export default TodoUtils;
