var redux = require('redux');

const allReducerInitialState = {
    handleSignInDialog : false,

}
const allReducer = (state = allReducerInitialState, action) => {
    switch (action.type) {
        case 'DISPLAY_SIGNIN_DIALOG':
            return {...state, handleSignInDialog: !state.handleSignInDialog}
        default:
            return state
    }
}

const store = redux.createStore(allReducer);

export default store;