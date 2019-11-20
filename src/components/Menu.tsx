import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { star } from 'ionicons/icons';

interface MenuProps extends RouteComponentProps {

}

const Menu: React.FunctionComponent<MenuProps> = () => (
  <IonMenu contentId="main" type="push">
    <IonHeader>
      <IonToolbar>
        <IonTitle>Menu</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonList>

        <IonMenuToggle autoHide={false}>
          <IonItem routerLink='/accessibility' routerDirection="none">
            <IonIcon slot="start" icon={star} />
            <IonLabel>Accessibility</IonLabel>
          </IonItem>
          <IonItem routerLink='/appstate' routerDirection="none">
            <IonIcon slot="start" icon={star} />
            <IonLabel>App</IonLabel>
          </IonItem>
          <IonItem routerLink='/browser' routerDirection="none">
            <IonIcon slot="start" icon={star} />
            <IonLabel>Browser</IonLabel>
          </IonItem>
          <IonItem routerLink='/camera' routerDirection="none">
            <IonIcon slot="start" icon={star} />
            <IonLabel>Camera</IonLabel>
          </IonItem>
          <IonItem routerLink='/clipboard' routerDirection="none">
            <IonIcon slot="start" icon={star} />
            <IonLabel>Clipboard</IonLabel>
          </IonItem>
          <IonItem routerLink='/device' routerDirection="none">
            <IonIcon slot="start" icon={star} />
            <IonLabel>Device</IonLabel>
          </IonItem>
          <IonItem routerLink='/geolocation' routerDirection="none">
            <IonIcon slot="start" icon={star} />
            <IonLabel>Geolocation</IonLabel>
          </IonItem>
          <IonItem routerLink='/network' routerDirection="none">
            <IonIcon slot="start" icon={star} />
            <IonLabel>Network</IonLabel>
          </IonItem>
          <IonItem routerLink='/storage' routerDirection="none">
            <IonIcon slot="start" icon={star} />
            <IonLabel>Storage</IonLabel>
          </IonItem>
        </IonMenuToggle> 
      </IonList>
    </IonContent>
  </IonMenu>
);

export default withRouter(Menu);
