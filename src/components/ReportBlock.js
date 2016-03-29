/* @flow */
import React from 'react'
import Card from 'material-ui/lib/card/card'
import CardHeader from 'material-ui/lib/card/card-header'
import CardActions from 'material-ui/lib/card/card-actions'
import CardText from 'material-ui/lib/card/card-text'
import Check from 'material-ui/lib/svg-icons/navigation/check'
import CheckCircle from 'material-ui/lib/svg-icons/action/check-circle'
import RaisedButton from 'material-ui/lib/raised-button'
import Firebase from 'firebase'
import LinearProgress from 'material-ui/lib/linear-progress'
import request from 'superagent'
import Dialog from 'material-ui/lib/dialog'
import Colors from 'material-ui/lib/styles/colors'
import IconButton from 'material-ui/lib/icon-button'

const FACEBOOK_LOAD_FINISHED = 0
const PROGRESS_LOAD_FINISHED = 0

class ReportBlock extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      progress: null,
      userData: null,
      modalOpen: false,
      modalActions: [],
      modalBody: (<LinearProgress mode="indeterminate"/>),
      modalTitle: '紀錄中'
    }
    this.clickHasRead = this.clickHasRead.bind(this)
    this.hasReadFinished = this.hasReadFinished.bind(this)
    this.disabledConfirmButton = this.disabledConfirmButton.bind(this)
  }
  render () {
    let confirmButton
    if (this.state.progress) {
      confirmButton = this.confirmButton()
    } else {
      confirmButton = this.disabledConfirmButton()
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
        <Dialog
          title={this.state.modalTitle}
          actions={this.state.modalActions}
          open={this.state.modalOpen}
          modal >
          {this.state.modalBody}
        </Dialog>
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

  disabledConfirmButton () {
    return (
      <RaisedButton
        label="等待讀取中"
        disabled
        icon={<Check />} />)
  }

  confirmButton () {
    return (
      <RaisedButton
        label="已讀完，點我！"
        primary
        onMouseDown={this.clickHasRead}
        icon={<Check />} />)
  }

  clickHasRead () {
    const self = this
    this.setState({
      modalOpen: true
    })
    if (!this.state.userData) {
      request.get('/userData').end((err, res) => {
        if (err) {
          return
        }
        if (!res.body) {
          // should login facebook
          self.setState({
            modalTitle: '您尚未登入，請先登入',
            modalBody: (
              <a href="/auth/facebook" style={{
                display: 'block',
                width: 70,
                marginRight: 'auto',
                marginLeft: 'auto'
              }}>
                <IconButton>
                  <div className="fb-icon-black">
                    <i className="fa fa-facebook-official"></i>
                  </div>
                </IconButton>
              </a>)
          })
        }
      })
    } else {
      const firebaseRef = new Firebase('https://bible-train.firebaseio.com/')
      firebaseRef.child('record').child(1459008000000).child(this.state.userData.id).set({
        userName: this.state.userData.name,
        createTime: Firebase.ServerValue.TIMESTAMP
      }, (err) => {
        if (!err) {
          self.setState({
            modalTitle: '記錄完畢！',
            modalBody: (<CheckCircle color={Colors.green400} style={{width: 50, height: 50}}/>),
            modalActions: [
              <RaisedButton primary label="記錄完畢" onTouchTap={this.hasReadFinished}/>
            ]
          })
        }
      })
    }
  }

  hasReadFinished () {
    this.setState({
      modalOpen: false
    })
  }
}

export default ReportBlock
