import AxiosBase from 'axios';

export default AxiosBase.create({
    baseURL: 'https://api.bunny.net',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});
