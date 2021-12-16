import { useContext } from 'react';
import StateContext from '../context/state'
import { messagesMap } from '../translations/index'

export const useMessages = () => {

    const { state } = useContext(StateContext)
    const get = (key: any) => messagesMap[state.language][key];

    return { get };
};