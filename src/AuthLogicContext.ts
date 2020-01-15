import { create, IParams, ISecure } from '@authlogic/core';
import * as React from 'react';

export interface IAuthLogicContextValue {
  error?: Error
  secure: ISecure
}

let authLogicContext: React.Context<IAuthLogicContextValue>;

export function getAuthLogicContext(params: IParams): React.Context<IAuthLogicContextValue> {
  if (!authLogicContext) {
    authLogicContext = React.createContext<IAuthLogicContextValue>({
      secure: create(params)
    });
  }
  return authLogicContext;
}
