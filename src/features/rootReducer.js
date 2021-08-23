import { combineReducers } from 'redux';
import userSlice from "./userReducer.js"

const rootReducer = combineReducers({
  user: userSlice.reducer,
})

export default rootReducer