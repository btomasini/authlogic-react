import { ISecure } from '@authlogic/core';
import * as React from 'react';
import { Optional } from './Lang';

export interface IAuthLogicContextValue {
  secure: Optional<ISecure>
}

let authLogicContext: React.Context<IAuthLogicContextValue>

export function getAuthLogicContext(): React.Context<IAuthLogicContextValue> {
  if (!authLogicContext) {
    authLogicContext = React.createContext<IAuthLogicContextValue>({
      secure: undefined
    })
  }
  return authLogicContext
}
