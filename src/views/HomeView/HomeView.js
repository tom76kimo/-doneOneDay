/* @flow */
import React from 'react'
import AppBar from 'material-ui/lib/app-bar'
import Colors from 'material-ui/lib/styles/colors'
import IconButton from 'material-ui/lib/icon-button'
import PermIdentity from 'material-ui/lib/svg-icons/action/perm-identity'

import ReportBlock from 'components/ReportBlock'

const facebookLoginComponent = (
  <a href="/auth/facebook"><IconButton><PermIdentity color={Colors.white} /></IconButton></a>
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
