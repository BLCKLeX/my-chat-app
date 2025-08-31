import { createSlice, nanoid } from "@reduxjs/toolkit"

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("chatState")
    return serializedState ? JSON.parse(serializedState) : undefined
  } catch (err) {
    return undefined
  }
}

const initialState = loadState() || {
  users: {}, // все юзеры
  activeUserId: null, // текущий вошедший
  activeChatId: null, // выбранный чат
  chats: {}, // чаты по пользователям
}

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    // регистрация / логин пользователя
    addUser: {
      reducer(state, action) {
        const { id, name } = action.payload

        // приведение к нижнему регистру (если есть nickname)

        const normalizeName = name.toLowerCase()
        // проверка, существует ли уже юзер с таким ником
        const existUser = Object.values(state.users).find(
          (user) => user.name.toLowerCase() === normalizeName
        )

        if (!existUser) {
          state.users[id] = { id, name }
          state.chats[id] = {} // чаты для юзера
          state.activeUserId = id
          localStorage.setItem("chatState", JSON.stringify(state))
        } else {
          state.activeUserId = existUser.id
        }
      },
      prepare(name) {
        const id = `user-${nanoid(6)}`
        return { payload: { id, name } }
      },
    },
    //  создание чата у активного юзера
    addChat: {
      reducer(state, action) {
        const { chatId, title } = action.payload
        const userId = state.activeUserId
        if (!userId) return

        if (!state.chats[userId]) {
          state.chats[userId] = {}
        }

        if (!state.chats[userId][chatId]) {
          state.chats[userId][chatId] = {
            chatId,
            title,
            messages: [],
          }
          state.activeChatId = chatId
        }

        localStorage.setItem("chatState", JSON.stringify(state))
      },
      prepare(title) {
        const chatId = `chat-${nanoid(6)}`
        return { payload: { chatId, title } }
      },
    },
    //добавить аватар
    setUserAvatar: {
      reducer(state, action) {
        const { userId, avatar } = action.payload
        if (!userId) return
        else {
          state.users[userId].avatar = avatar
          localStorage.setItem("chatState", JSON.stringify(state))
        }
      },
      prepare(userId, file) {
        const url = URL.createObjectURL(file)
        return { payload: { userId, avatar: url } }
      },
    },
    //  выбрать активный чат
    setActiveChat(state, action) {
      const chatId = action.payload
      const userId = state.activeUserId
      if (!userId) return

      if (state.chats[userId] && state.chats[userId][chatId]) {
        state.activeChatId = chatId
      } else {
        state.activeChatId = null
      }

      localStorage.setItem("chatState", JSON.stringify(state))
    },

    //  отправка сообщения в активный чат
    addMessageToActiveChat: {
      reducer(state, action) {
        const { id, userName, text, files, timestamp } = action.payload
        const userId = state.activeUserId
        const chatId = state.activeChatId
        if (!userId || !chatId) return

        const chat = state.chats[userId]?.[chatId]
        if (chat) {
          chat.messages.push({ id, userName, text, files, timestamp })
        }

        localStorage.setItem("chatState", JSON.stringify(state))
      },
      prepare({ userName, text, files = null }) {
        return {
          payload: {
            id: nanoid(),
            userName,
            text,
            files,
            timestamp: Date.now(),
          },
        }
      },
    },

    //  удалить чат
    deleteChat(state, action) {
      const chatId = action.payload
      const userId = state.activeUserId
      if (!userId) return

      const { [chatId]: _, ...rest } = state.chats[userId]
      state.chats[userId] = rest

      if (state.activeChatId === chatId) {
        state.activeChatId = null
      }

      localStorage.setItem("chatState", JSON.stringify(state))
    },

    // удалить сообщение
    deleteMessage(state, action) {
      const { chatId, messageId } = action.payload
      const userId = state.activeUserId
      if (!userId) return

      const chat = state.chats[userId]?.[chatId]
      if (chat) {
        chat.messages = chat.messages.filter((m) => m.id !== messageId)
      }

      localStorage.setItem("chatState", JSON.stringify(state))
    },

    // очистить все сообщения в чате
    clearChatMessages(state, action) {
      const chatId = action.payload
      const userId = state.activeUserId
      if (!userId) return

      const chat = state.chats[userId]?.[chatId]
      if (chat) {
        chat.messages = []
      }

      localStorage.setItem("chatState", JSON.stringify(state))
    },
  },
})

export const {
  addUser,
  addChat,
  setActiveChat,
  addMessageToActiveChat,
  deleteChat,
  deleteMessage,
  clearChatMessages,
  setUserAvatar
} = chatSlice.actions

export default chatSlice.reducer
