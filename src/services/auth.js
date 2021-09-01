import {jsonQuery} from '../config/common'

export function apiLogin(data, cbk) {
    return jsonQuery('/api/login', cbk, 'POST', data)
}

export function apiLogout(cbk) {
    return jsonQuery('/api/logout', cbk, 'POST');
}