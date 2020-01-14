import { Authentication } from '@authlogic/core';
import { configure } from 'enzyme';
import { mount, ReactWrapper } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react'
const mockCreate = jest.fn()
jest.mock('@authlogic/core', () => ({
  create: mockCreate
}))
import { AuthLogicProvider } from '../AuthLogicProvider'
import { getAuthentication } from '../getAuthentication';

configure({ adapter: new Adapter() });

const StubConsumer: React.FC = () => {
  const auth = getAuthentication()
  return (<p>{auth!.expiresIn}</p>)
}

beforeEach(() => {
  jest.resetModules();
});

describe('<AuthLogicProvider/>', () => {

  const issuer = 'test-issuer'
  const clientId = 'test-client-id'
  const scope = 'test-scope'

  let wrapper: ReactWrapper
  const mockSecure = {
    getAuthentication: jest.fn(),
    secure: jest.fn(),
  }

  beforeEach(async () => {
    const params = {
      clientId,
      issuer,
      scope,
    }

    mockCreate.mockImplementation(() => mockSecure)

    const authenticaiton: Authentication = {
      expiresIn: 1000
    }

    mockSecure.getAuthentication.mockReturnValue(authenticaiton)

    wrapper = mount(<AuthLogicProvider params={params}><StubConsumer /></AuthLogicProvider>)

  })

  it('renders something', () => {
    expect(wrapper.find('p').first().text()).toBe('1000')
  })
})
