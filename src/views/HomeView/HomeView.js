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
  constructor (props) {
    super(props)
    this.state = {
      showMainBackgroundImage: false
    }
  }
  render () {
    return (
      <div className={this.state.showMainBackgroundImage ? 'main-background' : null}>
        <AppBar
          title='讀經列車'
          iconElementRight={facebookLoginComponent} />
        <div style={{height: '20px', width: '100%'}}></div>
        <ReportBlock />
      </div>
    )
  }

  componentDidMount () {
    const self = this
    const img = document.createElement('img')
    img.src = 'https://pixabay.com/static/uploads/photo/2015/01/08/15/48/bridge-593148_960_720.jpg'
    img.onload = () => {
      self.setState({
        showMainBackgroundImage: true
      })
    }
  }
}

export default HomeView
