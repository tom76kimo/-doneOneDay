/* @flow */
import React from 'react'
import AppBar from 'material-ui/lib/app-bar'
import Colors from 'material-ui/lib/styles/colors'
import IconButton from 'material-ui/lib/icon-button'
import PermIdentity from 'material-ui/lib/svg-icons/action/perm-identity'

export class HomeView extends React.Component {
  render () {
    return (
      <div>
        <AppBar
          title='讀經列車'
          iconElementRight={<IconButton><PermIdentity color={Colors.white} /></IconButton>} />
        <h1>Your New Project</h1>
      </div>
    )
  }
}

export default HomeView
