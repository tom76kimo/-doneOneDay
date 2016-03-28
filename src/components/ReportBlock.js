/* @flow */
import React from 'react'
import Card from 'material-ui/lib/card/card'
import CardHeader from 'material-ui/lib/card/card-header'
import CardActions from 'material-ui/lib/card/card-actions'
import CardText from 'material-ui/lib/card/card-text'
import Check from 'material-ui/lib/svg-icons/navigation/check'
import RaisedButton from 'material-ui/lib/raised-button'
import Firebase from 'firebase'
import LinearProgress from 'material-ui/lib/linear-progress'
import request from 'superagent'

const FACEBOOK_LOAD_FINISHED = 0
const PROGRESS_LOAD_FINISHED = 0

class ReportBlock extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      progress: null,
      userData: null
    }
  }
  render () {
    let confirmButton = (
      <RaisedButton
        label="等待讀取中"
        disabled
        icon={<Check />} />
    )
    if (this.state.progress) {
      confirmButton = (
        <RaisedButton
          label="已讀完，點我！"
          primary
          icon={<Check />} />)
    }
    let progressDescription = (
      <div>
        <span style={{marginLeft: '10px', fontSize: '20px'}}>歡迎來到讀經列車，正在為您讀取資料中...</span>
      </div>
    )

    let cardHeader = null
    let progressBar = (<LinearProgress mode="indeterminate"/>)
    if ((this.state.userData === FACEBOOK_LOAD_FINISHED ||
        this.state.userData) &&
       (this.state.progress === PROGRESS_LOAD_FINISHED ||
       this.state.progress)) {
      progressBar = null
    }

    if (this.state.progress) {
      progressDescription = (
        <div style={{fontSize: '20px'}}>
          <span style={{color: '#979797', fontSize: '18px', marginRight: 10}}>今日進度：</span>
          {this.state.progress.description}
        </div>
      )
    }

    if (this.state.userData) {
      cardHeader = (
        <CardHeader
          title={this.state.userData.name}
          subtitle="Subtitle"
          avatar="http://lorempixel.com/100/100/nature/"
        />
      )
    }
    return (
      <div style={{marginLeft: 'auto', marginRight: 'auto', maxWidth: '500px'}}>
        <Card>
          {cardHeader}
          {progressBar}
          <CardText>
            <div className="scroll-description">
            {progressDescription}
            </div>
          </CardText>
          <CardActions>
            {confirmButton}
          </CardActions>
        </Card>
      </div>
    )
  }

  componentDidMount () {
    const firebaseRef = new Firebase('https://bible-train.firebaseio.com/')
    const self = this
    firebaseRef.child('progress')
      .orderByChild('time')
      .equalTo(1459008000000)
      .on('child_added', (childSnapshot, prevChildKey) => {
        let progress = childSnapshot.val()
        if (progress) {
          self.setState({
            progress
          })
        }
        firebaseRef.off()
      })

    request.get('/userData').end((err, res) => {
      if (err || !res.body) {
        self.setState({
          userData: 0
        })
        return
      }
      self.setState({
        userData: res.body
      })
    })
  }
}

export default ReportBlock
