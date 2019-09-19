var redux = require('redux');

const allReducerInitialState = {
    openSignInDialog : false,
    openSignUpDialog : false,
    isSignIned : false

}
const allReducer = (state = allReducerInitialState, action) => {
    switch (action.type) {
        case 'DISPLAY_SIGNIN_DIALOG':
            return {...state, openSignInDialog: !state.openSignInDialog}
        case 'DISPLAY_SIGNUP_DIALOG':
            return {...state, openSignUpDialog: !state.openSignUpDialog}
        case 'SIGNINED':
            return {...state, isSignIned: true}
        case 'SIGN_OUT':
            return {...state, isSignIned: false}
        default:
            return state
    }
}

const store = redux.createStore(allReducer);

export default store;