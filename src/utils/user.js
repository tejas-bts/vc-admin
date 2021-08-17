import { localStorageUserLabel } from '../constants/constantStrings';

export const getCurrentUser = () => {
    let user  = localStorage.getItem(localStorageUserLabel);
    user = JSON.parse(user);
    return user;
}

export const setCurrentUser = (user) => {
    localStorage.setItem(localStorageUserLabel,JSON.stringify(user));
}