import {query} from '../config/common'

export function apiUserProfile(cbk) {
    return query('/api/user', cbk)
}