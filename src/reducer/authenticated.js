import authenticatedAction from '../action/index'
const {AUTHENTICATED, UNAUTHENTICATED} = authenticatedAction.authenticated;

const authenticatedState = false
const authenticatedReducer = (state=authenticatedState, action) => {

    switch(action.type) {
        case AUTHENTICATED:
            return true;

        case UNAUTHENTICATED:
            return false;
        default: 
        return state;
    }
}

export default authenticatedReducer;