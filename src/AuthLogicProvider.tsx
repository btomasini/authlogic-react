import { create, IParams } from '@authlogic/core';
import * as React from 'react';
import { invariant } from 'ts-invariant';

import { getAuthLogicContext } from './AuthLogicContext';

export interface IAuthLogicProviderProps {
  params: IParams;
  children: React.ReactNode | React.ReactNode[] | null;
}

export const AuthLogicProvider: React.FC<IAuthLogicProviderProps> = ({
  params,
  children
}) => {
  const AuthLogicContext = getAuthLogicContext();
  return (
    // TODO - Should this be async?
    <AuthLogicContext.Consumer>
      {(context = {}) => {
        if (params && context.params !== params) {
          const secure = create(params)
          secure.secure()
          context = Object.assign({}, context, { params, secure });
        }

        invariant(
          context.params,
          'AuthlogicProvider was not passed params instance. Make ' +
          'sure you pass params via the "params" prop.'
        );

        return (
          <AuthLogicContext.Provider value={context}>
            {children}
          </AuthLogicContext.Provider>
        );
      }}
    </AuthLogicContext.Consumer>
  );
};
