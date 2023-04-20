import { createContext } from 'react';

export const ACTION = {
  page: '頁面',
};

export const PAGE = {
  demo: '/demo',
};

export const Context = createContext();

export const initialState = {
  [ACTION.page]: PAGE.demo,
};

export const reducer = (state, action) => {
  if (action.state instanceof Object) {
    let stateStorage = {};
    Object.entries(action.state)
      .map((actionState) => {
        const value = Object.values(ACTION).filter((actionValue) => actionValue === actionState[0]);
        if (value.length > 0) return actionState;
        if (action.type) return [action.type, Object.fromEntries([actionState])];
        return undefined;
      })
      .filter((actionState) => actionState !== undefined)
      .forEach((actionState) => {
        const [key, value] = actionState;
        const prevValue = stateStorage[key];
        if (prevValue) stateStorage = { [key]: { ...prevValue, ...value } };
        else stateStorage = { [key]: { ...state[key], ...value } };
      });
    return { ...state, ...stateStorage };
  }
  if (action.type) return { ...state, [action.type]: action.state };
  return state;
};
