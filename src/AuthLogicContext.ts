import { ISecure } from '@authlogic/core';
import * as React from 'react';
import invariant from 'ts-invariant';

let authLogicContext: React.Context<ISecure>

export function createAuthLogicContext(secure: ISecure): React.Context<ISecure> {
  authLogicContext = React.createContext<ISecure>(secure)
  return authLogicContext
}

export function getAuthLogicContext(): React.Context<ISecure> {
  invariant(authLogicContext, "AuthLogicContext not created, be sure your component is wrapped in AuthLogicProvider")
  return authLogicContext
}
