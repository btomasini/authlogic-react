import { Authentication, ISecure } from '@authlogic/core'
import * as React from 'react';
import { getAuthLogicContext } from './AuthLogicContext';
import { Optional } from './Lang';

export function getAuthentication(): Optional<Authentication> {
  const ctx = React.useContext<ISecure>(getAuthLogicContext());
  return ctx.getAuthentication()
}
