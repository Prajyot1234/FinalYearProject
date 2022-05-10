import { useMemo } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

let store
const exampleInitialState = {
  theme: "light",
  input: "",
  output: "",
  language: "C",
  code: "",
  problemCode : "",
  problemLanguage: "C",
}

export const actionTypes = {
  SET_THEME: 'SET_THEME',
  SET_INPUT: 'SET_INPUT',
  SET_OUTPUT: 'SET_OUTPUT',
  SET_LANGUAGE : 'SET_LANGUAGE',
  SET_CODE : 'SET_CODE',
  SET_PROBLEMCODE : 'SET_PROBLEMCODE',
  SET_PROBLEMLANGUAGE: 'SET_PROBLEMLANGUAGE',
}

// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
  switch (action.type) {
    case actionTypes.SET_THEME:
      return {
        ...state,
        theme : action.payload
      }

    case actionTypes.SET_INPUT:
      return {
        ...state,
        input : action.payload
      }

    case actionTypes.SET_LANGUAGE:
      return {
        ...state,
        language : action.payload
      }

    case actionTypes.SET_OUTPUT:
      return {
        ...state,
        output : action.payload
      }

    case actionTypes.SET_CODE:
      return {
        ...state,
        code : action.payload
      }

    case actionTypes.SET_PROBLEMCODE:
      return {
        ...state,
        problemCode : action.payload
      }

    case actionTypes.SET_PROBLEMLANGUAGE:
      return {
        ...state,
        problemLanguage : action.payload
      }

    default:
      return state
  }
}

// ACTIONS
export const setTheme = (theme) => {
  return { 
    type: actionTypes.SET_THEME, 
    payload: theme,
  }
}

export const setInput = (input) => {
  return { 
    type: actionTypes.SET_INPUT, 
    payload: input, 
  }
}

export const setLanguage = (language) => {
  return { 
    type: actionTypes.SET_LANGUAGE, 
    payload: language, 
  }
}

export const setOutput = (output) => {
  return { 
    type: actionTypes.SET_OUTPUT, 
    payload: output, 
  }
}

export const setCode = (code) => {
  return { 
    type: actionTypes.SET_CODE, 
    payload: code, 
  }
}

export const setProblemCode = (code) => {
  return { 
    type: actionTypes.SET_PROBLEMCODE, 
    payload: code, 
  }
}

export const setproblemLanguage = (language) => {
  return { 
    type: actionTypes.SET_PROBLEMLANGUAGE, 
    payload: language, 
  }
}

const persistConfig = {
  key: 'primary',
  storage,
  blacklist: ['output'], //blacklisted items are not persisted
}

const persistedReducer = persistReducer(persistConfig, reducer)

function makeStore(initialState = exampleInitialState) {
  return createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware())
  )
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? makeStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = makeStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store;
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}
