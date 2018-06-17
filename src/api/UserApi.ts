import axios from 'axios';
import { UserData } from '../types/api/UserData';
import { API_BASE_URL } from '../constants';

const USER_URL: string = API_BASE_URL + '/user';

export function getAllUsers(cb: (users: UserData[]) => void, er?: (error: any) => void) {
    axios.get(USER_URL)
        .then(function (response: any) {
            cb(response.data);
        })
        .catch(function (error: any) {
            if (er) {
                er(error);
            } else {
                console.log(error);
            }
        });
}

export function getUserById(id: number, cb: (user: UserData) => void, er?: (error: any) => void) {
    axios.get(USER_URL + '/' + id)
        .then(function (response: any) {
            cb(response.data);
        })
        .catch(function (error: any) {
            if (er) {
                er(error);
            } else {
                console.log(error);
            }
        });
}

export function deleteUserById(id: number, cb: () => void, er?: (error: any) => void) {
    axios.delete(USER_URL + '/' + id)
        .then(function () {
            cb();
        })
        .catch(function (error: any) {
            if (er) {
                er(error);
            } else {
                console.log(error);
            }
        });
}

export function putUser(user: UserData, cb: (user: UserData) => void, er?: (error: any) => void) {
    console.log(user);
    axios.put(USER_URL, user)
        .then(function (response: any) {
            cb(response.data);
        })
        .catch(function (error: any) {
            if (er) {
                er(error);
            } else {
                console.log(error);
            }
        });
}
