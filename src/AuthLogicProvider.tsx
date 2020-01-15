import { IParams } from '@authlogic/core';
import * as React from 'react';

//import { getAuthLogicContext, IAuthLogicContextValue } from './AuthLogicContext';

export interface IAuthLogicProviderProps {
  params: IParams;
  children: React.ReactNode | React.ReactNode[] | null;
}


type Action = { type: 'error', error: Error }
type Dispatch = (action: Action) => void
type State = {
  error?: Error
  username?: string
}

const AuthLogicStateContext = React.createContext<State | undefined>(
  undefined,
)
const AuthLogicDispatchContext = React.createContext<Dispatch | undefined>(
  undefined,
)

function authLogicReducer(state: State, action: Action) {
  switch (action.type) {
    case 'error': {
      state.error = action.error
      return state
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

/*
function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
*/

export const AuthLogicProvider = (props: IAuthLogicProviderProps) => {

  const [state, dispatch] = React.useReducer(authLogicReducer, {})

  const { params, children } = props

  console.log('0001')
  console.log(props)

  /*
  async function secure() {
    try {
      console.log('AAAA')
      await (delay(1000))
      console.log('BBBB')
    } catch (e) {
      console.log('CCCC')
      //dispatch({ type: 'error', error: e })
      // Set the error to the reducer
    }
  }

  React.useEffect(() => {
    secure()
  })
  */

  if (state.error) {
    console.log('In Error')
    return (<p>Error: {state.error.message}</p>)
  } else if (state.username) {
    console.log('In Success')
    return (
      <AuthLogicStateContext.Provider value={state}>
        <AuthLogicDispatchContext.Provider value={dispatch}>
          {children}
        </AuthLogicDispatchContext.Provider>
      </AuthLogicStateContext.Provider>
    );
  } else {
    console.log('In Loading')
    return (<p>Loading {params.clientId}</p>)
  }

};
