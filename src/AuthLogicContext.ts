import { IParams, ISecure } from '@authlogic/core';
import * as React from 'react';

export interface IAuthLogicContextValue {
  params?: IParams
  secure?: ISecure
}

let authLogicContext: React.Context<IAuthLogicContextValue>;

export function getAuthLogicContext(): React.Context<IAuthLogicContextValue> {
  if (!authLogicContext) {
    authLogicContext = React.createContext<IAuthLogicContextValue>({});
  }
  return authLogicContext;
}
