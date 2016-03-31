/* @flow */
import React from 'react'
import Header from 'components/Header'
import Card from 'material-ui/lib/card/card'
import CardActions from 'material-ui/lib/card/card-actions'
import CardTitle from 'material-ui/lib/card/card-title'
import CardText from 'material-ui/lib/card/card-text'
import DatePicker from 'material-ui/lib/date-picker/date-picker'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'
import Firebase from 'firebase'
import Snackbar from 'material-ui/lib/snackbar'

class DashboardView extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      newProgress: {
        time: null,
        text: null
      },
      snackbarOpen: false
    }
    this.handleTimeChange = this.handleTimeChange.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
    this.sendNewProgress = this.sendNewProgress.bind(this)
    this.handleSnackBarRequestClose = this.handleSnackBarRequestClose.bind(this)
  }

  render () {
    return (
      <div style={{backgroundColor: '#f6f6f6', height: '100vh'}}>
        <Header />
        <div style={{maxWidth: 500, marginLeft: 'auto', marginRight: 'auto', marginTop: 50}}>
          <Card>
            <CardTitle title="新增進度" subtitle="Card subtitle" />
            <CardText>
              <DatePicker
                hintText="時間"
                mode="landscape"
                onChange={this.handleTimeChange} />
              <TextField
                hintText="進度內容"
                value={this.state.newProgress.text}
                onChange={this.handleTextChange}
              />
            </CardText>
            <CardActions>
              <RaisedButton onMouseDown={this.sendNewProgress} primary label="送出" />
            </CardActions>
          </Card>
        </div>
        <Snackbar
          open={this.state.snackbarOpen}
          message="新增完畢"
          autoHideDuration={4000}
          onRequestClose={this.handleSnackBarRequestClose}
        />
      </div>
    )
  }

  handleSnackBarRequestClose () {
    this.setState({
      snackbarOpen: false
    })
  }

  handleTimeChange (event, date) {
    this.setState({
      newProgress: {
        time: new Date(date).getTime(),
        text: this.state.newProgress.text
      }
    })
  }

  handleTextChange (event) {
    this.setState({
      newProgress: {
        time: this.state.newProgress.time,
        text: event.target.value
      }
    })
  }

  sendNewProgress () {
    if (!this.state.newProgress.time || !this.state.newProgress.text) {
      return
    }

    const self = this
    const firebaseRef = new Firebase('https://bible-train.firebaseio.com/')
    firebaseRef.child('progress').push({
      time: this.state.newProgress.time,
      description: this.state.newProgress.text,
      createTime: Firebase.ServerValue.TIMESTAMP
    }, () => {
      self.setState({
        newProgress: {},
        snackbarOpen: true
      })
    })
  }
}

export default DashboardView
