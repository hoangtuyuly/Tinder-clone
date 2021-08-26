import { combineReducers } from 'redux';
import userSlice from "./userReducer.js"
import chatSlice from './chatReducer.js';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  chat: chatSlice.reducer,
})

export default rootReducer