import React from 'react'
import Header from 'components/Header'
import Card from 'material-ui/lib/card/card'
import CardHeader from 'material-ui/lib/card/card-header'
import CardText from 'material-ui/lib/card/card-text'
import Firebase from 'firebase'
import Avatar from 'material-ui/lib/avatar'
import Badge from 'material-ui/lib/badge'
import IconButton from 'material-ui/lib/icon-button'
import FaceIcon from 'material-ui/lib/svg-icons/action/face'

class StatisticView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      groupData: null
    }
  }
  render () {
    let cards = []
    let groupDataEntry
    let totalRecordCount = 0
    let currentRecordCount
    if (this.state.groupData) {
      for (let key in this.state.groupData) {
        groupDataEntry = this.state.groupData[key]
        currentRecordCount = Object.keys(groupDataEntry).length
        totalRecordCount += currentRecordCount
        cards.push(
          <div key={key} style={{width: '90%', marginLeft: 'auto', marginRight: 'auto', marginTop: 20}}>
            <Card>
              <CardHeader
                title={'第 ' + key + ' 車廂'}
                subtitle={currentRecordCount + ' 人已讀完'}
              />
              <CardText>
                {Object.keys(groupDataEntry).map((id) => {
                  return (
                    <div key={id} style={{display: 'inline-block', marginRight: 20}}>
                      <Avatar size={60} src={`http://graph.facebook.com/${id}/picture`} />
                      <div style={{textAlign: 'center'}}>{groupDataEntry[id].userName}</div>
                    </div>
                  )
                })}
              </CardText>
            </Card>
          </div>
        )
      }
    }

    return (
      <div>
        <Header />
        <div style={{height: 20}}></div>
        <span style={{fontSize: 20, marginLeft: '5%'}}>{this.getTodayString()}</span>
        <span>
          <Badge
            badgeContent={totalRecordCount}
            secondary
            badgeStyle={{top: 20, right: 20}}
          >
            <IconButton tooltip="總共已讀人數">
              <FaceIcon/>
            </IconButton>
          </Badge>
        </span>
        {cards}
      </div>
    )
  }

  componentDidMount () {
    const self = this
    Promise.all([this.getMemebers(), this.getTodayRecords()]).then((results) => {
      self.setState({
        groupData: self.handleGroupData(results[0], results[1])
      })
    })
  }

  getTodayRecords () {
    const self = this
    return new Promise((resolve, reject) => {
      const firebaseRef = new Firebase('https://bible-train.firebaseio.com/')
      firebaseRef.child('record').child(self.getTodayTimestamp()).once('value', (childSnapshot) => {
        const records = childSnapshot.val()
        resolve(records)
      })
    })
  }

  getMemebers () {
    return new Promise((resolve, reject) => {
      const firebaseRef = new Firebase('https://bible-train.firebaseio.com/')
      firebaseRef.child('members').once('value', (childSnapshot) => {
        const members = childSnapshot.val()
        resolve(members)
      })
    })
  }

  handleGroupData (members, records) {
    let resultData = {}
    let memberEntry
    for (let key in records) {
      memberEntry = members[key]
      if (memberEntry) {
        if (!resultData[memberEntry.car]) {
          resultData[memberEntry.car] = {}
        }
        resultData[memberEntry.car][key] = records[key]
      } else {
        if (!resultData[0]) {
          resultData[0] = {}
        }
        resultData[0][key] = records[key]
      }
    }
    return resultData
  }

  getTodayTimestamp () {
    const today = new Date()
    const day = today.getDate()
    const month = today.getMonth()
    const year = today.getFullYear()
    return new Date(`${month + 1}/${day}/${year}`).getTime()
  }

  getTodayString () {
    const today = new Date()
    const day = today.getDate()
    const month = today.getMonth()
    const year = today.getFullYear()
    return `${year}年，${month + 1}月，${day}日`
  }
}

export default StatisticView
