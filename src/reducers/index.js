import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import userData from './userData';

const rootReducer = combineReducers({
    form: formReducer,
    user: userData,
});

export default rootReducer;