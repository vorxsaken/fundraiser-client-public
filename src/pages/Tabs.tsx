import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react'
import React from 'react'
import { home, time, wallet } from 'ionicons/icons'
import { Redirect, Route, RouteComponentProps } from 'react-router-dom'
import Home from './Home'
import Riwayat from './Riwayat'
import Pembayaran from './Pembayaran'
import DetailRiwayat from './DetailRiwayat'
import Bayar from './Bayar'
import Instruction from './Instruction'
import InputNominalBayar from './InputNominalBayar'

const Tabs: React.FC<RouteComponentProps> = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path='/tabs' to='/tabs/home' />
        <Route exact path='/tabs/home' render={props => <Home {...props} />} />
        <Route exact path='/tabs/riwayat'>
          <Riwayat />
        </Route>
        <Route exact path='/tabs/pembayaran'>
          <Pembayaran />
        </Route>
        <Route exact path="/tabs">
          <Redirect to="/tabs/home" />
        </Route>
        <Route path={`/tabs/home/detailriwayat/:id`} component={DetailRiwayat} />
        <Route path={`/tabs/riwayat/detailriwayat/:id`} component={DetailRiwayat} />
        <Route path={`/tabs/pembayaran/bayar/:id`} component={Bayar} />
        <Route path={`/tabs/pembayaran/input-number/:id`} component={InputNominalBayar} />
        <Route path={`/tabs/pembayaran/instruction/:id`} component={Instruction} />
      </IonRouterOutlet>
      <IonTabBar slot='bottom'>
        <IonTabButton tab='home' href='/tabs/home'>
          <IonIcon icon={home} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab='riwayat' href='/tabs/riwayat'>
          <IonIcon icon={time} />
          <IonLabel>Riwayat</IonLabel>
        </IonTabButton>
        <IonTabButton tab='pembayaran' href='/tabs/pembayaran'>
          <IonIcon icon={wallet} />
          <IonLabel>Pembayaran</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  )
}

export default Tabs