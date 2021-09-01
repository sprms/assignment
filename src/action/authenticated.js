const AUTHENTICATED = 'AUTHENTICATED';
const setAuthenticated = () => {
    return {
        type: AUTHENTICATED
    };
}

const UNAUTHENTICATED = 'UNAUTHENTICATED';
const setUnAuthenticated = () => {
    return {
        type: UNAUTHENTICATED
    };
}

export {
    AUTHENTICATED,
    setAuthenticated,

    UNAUTHENTICATED,
    setUnAuthenticated
}

