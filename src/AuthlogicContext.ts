import * as React from 'react';
import { Secure, Params } from '@authlogic/core';

export interface AuthlogicContextValue {
  params?: Params
  secure?: Secure
}

let authlogicContext: React.Context<AuthlogicContextValue>;

export function getAuthlogicContext() {
  if (!authlogicContext) {
    authlogicContext = React.createContext<Secure>({});
  }
  return authlogicContext;
}
