/* @flow */
import React from 'react'
import Card from 'material-ui/lib/card/card'
import CardHeader from 'material-ui/lib/card/card-header'
import CardActions from 'material-ui/lib/card/card-actions'
import CardText from 'material-ui/lib/card/card-text'
import Check from 'material-ui/lib/svg-icons/navigation/check'
import RaisedButton from 'material-ui/lib/raised-button'

class ReportBlock extends React.Component {
  render () {
    return (
      <div style={{marginLeft: 'auto', marginRight: 'auto', maxWidth: '500px'}}>
        <Card>
          <CardHeader
            title="小憲憲"
            subtitle="status"
            avatar="http://lorempixel.com/100/100/nature/"
          />
          <CardText>
            今天進度是：使3:10 - 13
          </CardText>
          <CardActions>
            <RaisedButton
              label="已讀完，點我！"
              primary
              icon={<Check />} />
          </CardActions>
        </Card>
      </div>
    )
  }
}

export default ReportBlock
