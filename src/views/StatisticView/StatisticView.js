import React from 'react'
import Header from 'components/Header'
import Card from 'material-ui/lib/card/card'
import CardHeader from 'material-ui/lib/card/card-header'
import CardText from 'material-ui/lib/card/card-text'
import Firebase from 'firebase'
import Avatar from 'material-ui/lib/avatar'

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
    if (this.state.groupData) {
      for (let key in this.state.groupData) {
        groupDataEntry = this.state.groupData[key]
        cards.push(
          <div key={key} style={{width: '90%', marginLeft: 'auto', marginRight: 'auto', marginTop: 20}}>
            <Card>
              <CardHeader
                title={'第 ' + key + ' 車廂'}
                subtitle={Object.keys(groupDataEntry).length + ' 人已讀完'}
              />
              <CardText>
                {Object.keys(groupDataEntry).map((id) => {
                  return (
                    <div key={id} style={{display: 'inline-block', marginRight: 20}}>
                      <Avatar size={60} src={`http://graph.facebook.com/${id}/picture`} />
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
    return new Promise((resolve, reject) => {
      const firebaseRef = new Firebase('https://bible-train.firebaseio.com/')
      firebaseRef.child('record').child(1459267200000).once('value', (childSnapshot) => {
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
