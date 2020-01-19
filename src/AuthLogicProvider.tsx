import { create, IParams, ISecure } from '@authlogic/core';
import * as React from 'react';
import { createAuthLogicContext } from './AuthLogicContext';

export interface IAuthLogicProviderProps {
  params: IParams;
  children: React.ReactNode | React.ReactNode[] | null;
}

interface IAuthLogicState {
  error?: Error
  secure?: ISecure
}

export const AuthLogicProvider = (props: IAuthLogicProviderProps) => {

  const [state, setState] = React.useState<IAuthLogicState>({})
  const { params, children } = props

  const loadSecure = async () => {
    // TODO We can combine these back into one if we want
    const secure = create(params)
    try {
      await secure.secure()
      setState({
        secure
      })
    } catch (e) {
      setState({
        error: e
      })
    }
  }

  React.useEffect(() => {
    loadSecure()
  }, [])


  if (state.error) {
    return (<p>Error: {state.error.message}</p>)
  } else if (state.secure && state.secure.getAuthentication()) {
    const AuthLogicContext = createAuthLogicContext(state.secure!)
    return (
      <AuthLogicContext.Provider value={state.secure}>
        {children}
      </AuthLogicContext.Provider>
    );
  } else {
    return (<p>Loading {params.clientId}</p>)
  }

};
