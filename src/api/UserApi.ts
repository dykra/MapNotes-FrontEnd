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

export function putUser(user: UserData, er?: (error: any) => void) {
    axios.put(USER_URL, user)
        .catch(function (error: any) {
            if (er) {
                er(error);
            } else {
                console.log(error);
            }
        });
}