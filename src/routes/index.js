import React from 'react'
import { Route, IndexRoute } from 'react-router'
import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import HomeView from 'views/HomeView/HomeView'
import DashboardView from 'views/DashboardView/DashboardView'
import StatisticView from 'views/StatisticView/StatisticView'

export default (store) => (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={HomeView} />
    <Route path='dashboard' component={DashboardView} />
    <Route path='statistic' component={StatisticView} />
  </Route>
)
