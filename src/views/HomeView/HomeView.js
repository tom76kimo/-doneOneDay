/* @flow */
import React from 'react'
import AppBar from 'material-ui/lib/app-bar'
import IconButton from 'material-ui/lib/icon-button'
import ReportBlock from 'components/ReportBlock'

const facebookLoginComponent = (
  <a href="/auth/facebook">
    <IconButton>
      <div className="fb-icon">
        <i className="fa fa-facebook-official"></i>
      </div>
    </IconButton>
  </a>
)

export class HomeView extends React.Component {
  render () {
    return (
      <div>
        <AppBar
          title='讀經列車'
          iconElementRight={facebookLoginComponent} />
        <div style={{height: '20px', width: '100%'}}></div>
        <ReportBlock />
      </div>
    )
  }
}

export default HomeView
