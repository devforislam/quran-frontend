import {url, request, reqOptions}from '../utils/request';

export function login(payload) {
    const options = { 
        'method': 'POST',
        body: JSON.stringify(payload)
    };

    return request(url + '/login', options);
}

export function register(payload) {
    const options = { 
        'method': 'POST',
        body: JSON.stringify(payload)
    };

    return request(url + '/register-user', options);
}

export function check()
{
    var token = getToken();
    if (token !== null) {
        // console.log('check login', token, typeof token, token.length, null);
        return true;
    }
    // console.log('check login tt', token);
   
    return false;
}

export function setToken(token, remember)
{
    if (remember === true) {
        localStorage.setItem('authToken', token);
    } else {
        sessionStorage.setItem('authToken', token)
    }
}

export function getToken()
{
    var sessionToken = sessionStorage.getItem('authToken');

    return  sessionToken ? sessionToken : localStorage.getItem('authToken');
}

export function logout()
{
    //reset token
    sessionStorage.removeItem('authToken');
    localStorage.removeItem('authToken');
    
    //reset user
    sessionStorage.removeItem('authUser');
    localStorage.removeItem('authUser');
}

export function setUser(user, remember)
{
    if (remember) {
        localStorage.setItem('authUser', JSON.stringify(user));
    } else {
        sessionStorage.setItem('authUser',JSON.stringify(user));
    }
}

export function getUser() {
    var user = JSON.parse(sessionStorage.getItem('authUser'));

    if (!user) {
        user = JSON.parse(localStorage.getItem('authUser'));
    }
    return user;
}

export {url, reqOptions};