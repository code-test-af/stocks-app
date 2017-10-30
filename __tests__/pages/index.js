import { shallow } from 'enzyme'
import React from 'react'

import IndexPage from '../../pages/index'

describe('Index page', () => {
  it('should say hello world', () => {
    const app = shallow(<IndexPage />)

    expect(app.find('p').text()).toEqual('Hello, World!')
  })
})
