import {createSlice} from '@reduxjs/toolkit'

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        chatId: null
    },
    reducers: {
        setChat: (state, action) => {
            state.chatId = action.payload.chatId
        },
    },
});

export const {setChat} = chatSlice.actions;
export const selectChatId = (state) => state.chat.chatId

export default chatSlice;