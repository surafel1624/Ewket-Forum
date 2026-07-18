import axios from 'axios';

const axiosBase = axios.create({
    baseURL: "https://ewket-forum.onrender.com/api/"
});

export default axiosBase;