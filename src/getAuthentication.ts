import { Authentication } from '@authlogic/core'
import * as React from 'react';
import { invariant } from 'ts-invariant';
import { getAuthLogicContext, IAuthLogicContextValue } from './AuthLogicContext';
import { Optional } from './Lang';

export function getAuthentication(): Optional<Authentication> {
  const { secure } = React.useContext<IAuthLogicContextValue>(getAuthLogicContext());
  invariant(
    secure,
    'No AuthLogic instance can be found. Please ensure that you ' +
    'have called `AuthLogicProvider` higher up in your tree.'
  );
  return secure!.getAuthentication()
}
