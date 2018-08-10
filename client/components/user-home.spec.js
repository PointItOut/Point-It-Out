/* global describe beforeEach it */

import { expect } from 'chai'
import React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { UserHome } from './user-home'


const adapter = new Adapter()
enzyme.configure({ adapter })

describe('UserHome', () => {
  let userHome

  userHome = shallow(<UserHome email="cody@email.com" />)

  it('renders the email in an h3', () => {
    expect(userHome.find('h3').text()).to.be.equal('Welcome, cody@email.com')
  })


  it('clicking the button update choosingCategory on state', () => {
    userHome.find('button').simulate('click')
    expect(userHome.state('choosingCategory')).to.be.equal(true)
    expect(userHome.find('button')).to.have.length(3)  //only works for only 3 categories

  })
})


