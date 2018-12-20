import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-t.firebaseio.com/'
});

export default instance;