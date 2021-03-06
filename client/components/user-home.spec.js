/* global describe beforeEach it */

import { expect } from 'chai'
import React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { UserHome } from './UserHome'

const adapter = new Adapter()
enzyme.configure({ adapter })

describe('UserHome', () => {
  let userHome

  userHome = shallow(<UserHome username="Cody" />)

  it('renders the username in an h3', () => {
    expect(userHome.find('h3').text()).to.be.equal('Welcome, Cody')
  })

  it('clicking the button updates choosingCategory on local state', () => {
    userHome.find('button').simulate('click')
    expect(userHome.state('choosingCategory')).to.be.equal(true)
    expect(userHome.state('choosingMode')).to.be.equal(false)
    expect(userHome.find('button')).to.have.length(3) //testing for exactly 3 categories, which are hard coded
  })

  it('after choosing a category, the user sees two buttons for choosing the mode of play', () => {
    userHome.setProps({
      chooseCategory: () => console.log('=*= fake chooseCategory called =*=')
    })
    userHome.setState({ choosingCategory: true, choosingMode: false })
    userHome.find('#btn-geography').simulate('click')
    expect(userHome.state('choosingMode')).to.be.equal(true)
    expect(userHome.find('button')).to.have.length(2) // two buttons for choosing mode
  })
})
