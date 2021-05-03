import { useState } from 'react';
import Axios from 'axios';
import { useToast } from '@chakra-ui/react';
import Cookies from 'js-cookie';

const UserUtils = () => {
  const toast = useToast();

  // State managers
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [_loading, set_loading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const token = Cookies.get('token');
  const id = Cookies.get('id');

  // Get Todos
  const getUser = async () => {
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
      url: `${process.env.REACT_APP_API_URL}users/${id}`,
    })
      .then(res => {
        console.log(res);
        setUser(res.data.data);
      })
      .catch(er => {
        console.log(er.response.data);
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

  const updateUser = async data => {
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
      url: `${process.env.REACT_APP_API_URL}users/${id}`,
      data,
    })
      .then(res => {
        getUser();
        toast({
          title: 'Success',
          description: res.data.message,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      })
      .catch(er => {
        console.log(er.response);
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

  const handleProfilePicUpdate = async () => {
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
          url: `${process.env.REACT_APP_API_URL}users/${id}`,
          data: {
            profilePic: res.secure_url,
          },
        })
          .then(res => {
            getUser();
            toast({
              title: 'Success',
              description: res.data.message,
              status: 'success',
              duration: 5000,
              isClosable: true,
            });
          })
          .catch(er => {
            console.log(er.response);
            toast({
              title: 'Error',
              description: er.response.data.message,
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
          })
          .finally(() => setLoading(false));
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
      .finally(() => setUploading(false));
  };

  return {
    getUser,
    handleProfilePicUpdate,
    updateUser,
    uploading,
    user,
    _loading,
    loading,
  };
};

export default UserUtils;
