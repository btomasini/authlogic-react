import * as React from 'react';
import { create, Params } from '@authlogic/core';
import { invariant } from 'ts-invariant';

import { getAuthlogicContext } from './AuthlogicContext';

export interface AuthlogicProviderProps {
  params: Params;
  children: React.ReactNode | React.ReactNode[] | null;
}

export const AuthlogicProvider: React.FC<AuthlogicProviderProps> = ({
  params,
  children
}) => {
  const AuthlogicContext = getAuthlogicContext();
  return (
    <AuthlogicContext.Consumer>
      {async (context = {}) => {
        if (params && context.params !== params) {
          let secure = create(params)
          await secure.secure()
          context = Object.assign({}, context, { params, secure });
        }

        invariant(
          context.params,
          'AuthlogicProvider was not passed params instance. Make ' +
          'sure you pass params via the "params" prop.'
        );

        return (
          <AuthlogicContext.Provider value={context}>
            {children}
          </AuthlogicContext.Provider>
        );
      }}
    </AuthlogicContext.Consumer>
  );
};
