import axios from 'axios';

const instance =axios.create({
    // baseURL:'http://localhost:8001',
     baseURL: '  https://time-table-manager-saurabh.herokuapp.com/',
    timeout: 30000,
})

export default instance;