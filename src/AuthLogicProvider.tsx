import { create, IParams, ISecure } from '@authlogic/core';
import * as React from 'react';
import { getAuthLogicContext } from './AuthLogicContext';

export interface IErrorProps {
  error: Error
}

export interface IAuthLogicProviderProps {
  children: React.ReactNode | React.ReactNode[] | null;
  errorNode?: (props: IErrorProps) => JSX.Element;
  loadingNode?: React.ReactNode | null;
  params: IParams;
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
    const secure = create()
    secure.init(params)
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
    if (props.errorNode) {
      return (<props.errorNode error={state.error} />)
    } else {
      return (<p>Error: {state.error.message}</p>)
    }
  } else if (state.secure && state.secure.getAuthentication()) {
    const AuthLogicContext = getAuthLogicContext()
    return (
      <AuthLogicContext.Provider value={{ secure: state.secure }}>
        {children}
      </AuthLogicContext.Provider>
    );
  } else {
    if (props.loadingNode) {
      return (<div>{props.loadingNode}</div>);
    } else {
      return (<p>Loading...</p>)
    }
  }

};
