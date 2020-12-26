import React, { useReducer } from 'react'

const dataContext = (reducer, actions, INITIAL_STATE) => {
    const Context = React.createContext();

    const Provider = ({ children }) => {
        const [ state, dispatch ] = useReducer(reducer, INITIAL_STATE);

        const boundActions = {};
        for (let key in actions) {
            boundActions[key] = actions[key](dispatch)
        }

        return(
            <Context.Provider value={{ state, ...boundActions }}>
                {children}
            </Context.Provider>
        );
    }

    return { Context, Provider };
};

export default dataContext;