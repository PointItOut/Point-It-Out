import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGithub} from '@fortawesome/free-brands-svg-icons'
const Footer = () => (
  <footer className="container-fluid">
    <div className="row">
      <div className="col-sm-12 col-md-10">
        Created by Alexandra Ash, Amy Berg, Kate Dubitski Kopitchinski and Sivan
        Gilead
      </div>
      <div className="col-sm-12 col-md-2">
        <a href="https://github.com/PointItOut/Point-It-Out">
          <FontAwesomeIcon icon={faGithub} size="2x" />
        </a>
      </div>
    </div>
  </footer>
)

export default Footer
