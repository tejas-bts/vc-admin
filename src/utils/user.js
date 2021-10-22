import { localStorageUserLabel } from '../constants/constantStrings';

export const getCurrentUser = () => {
    let user  = localStorage.getItem(localStorageUserLabel);
    user = JSON.parse(user);
    user.permissions = JSON.parse(user.permissions)
    return user;
}

export const setCurrentUser = (user) => {
    localStorage.setItem(localStorageUserLabel,JSON.stringify(user));
}

export const userPermissions = {
    EDIT_ORGS: 1,
    VIEW_ORGS: 2,
    EDIT_SUPPLIERS: 5,
    VIEW_SUPPLIERS: 6,
    VIEW_STORES: 8,
    EDIT_USERS: 9,  
    VIEW_USERS: 10,
    VIEW_EVENTS: 12,
    EDIT_STORES: 16,
    EDIT_EVENTS: 18,
    PRESENT_EVENTS: 19,
    EDIT_SUPPLIER_ADMINS: 20,
    EDIT_STORE_ADMINS: 21,
    EDIT_SUPPLER_USERS: 22,
    EDIT_STORE_USERS: 23,
    EDIT_ORG_USERS: 24,
}