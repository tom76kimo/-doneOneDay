/* @flow */
import React from 'react'
import ReportBlock from 'components/ReportBlock'
import Header from 'components/Header'
import IconButton from 'material-ui/lib/icon-button'
import { Link } from 'react-router'

export class HomeView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showMainBackgroundImage: false
    }
  }
  render () {
    return (
      <div className="main-block">
        <div
          ref="mainBackground"
          style={{opacity: 0}}
          className={this.state.showMainBackgroundImage ? 'main-background' : 'main-background-not-ready'}></div>
        <Header />
        <div style={{height: '20px', width: '100%'}}></div>
        <ReportBlock />
        <IconButton
          touch
          className="statistic-button"
          style={{position: 'absolute'}}
          tooltip="統計資料"
          tooltipPosition="top-center" >
          <Link to="/statistic"><i className="fb-icon fa fa-bar-chart"></i></Link>
        </IconButton>
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
      }, () => {
        setTimeout(() => {
          self.refs.mainBackground.style.opacity = 1
        }, 0)
      })
    }
  }
}

export default HomeView
