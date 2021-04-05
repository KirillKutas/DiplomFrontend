import jwtDecode from 'jwt-decode';

export const setToken = (authHeader: string) => {
    const token = authHeader.split(' ')[1];
    sessionStorage.setItem('token', token);
    return token;
};

export const getToken = () => sessionStorage.getItem('token');

export const removeToken = () => sessionStorage.removeItem('token');

export const parseToken = (token: string) => jwtDecode(token);
