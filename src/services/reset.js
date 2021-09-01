import {jsonQuery} from '../config/common'

export function apiGetResetCode(data, cbk) {
    return jsonQuery('/api/reset-password?email=' + data.email, cbk, 'GET', )
}

export function apiResetCodeVerify(data, cbk) {
    return jsonQuery('/api/reset-password', cbk, 'POST', data)
}

export function apiResetPassWord(data, cbk) {
    return jsonQuery('/api/reset-password', cbk, 'PATCH', data)
}
