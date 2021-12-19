import { useContext } from 'react';
import StateContext from '../context/state'
import { messagesMap } from '../translations/index'

export const useMessages = () => {

    const { generalState } = useContext(StateContext)
    const get = (key: any) => messagesMap[generalState.language][key];

    return { get };
};