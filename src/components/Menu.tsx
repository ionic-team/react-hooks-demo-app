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
import { AppPage } from '../declarations';
import { star } from 'ionicons/icons';

interface MenuProps extends RouteComponentProps {

}

const Menu: React.FunctionComponent<MenuProps> = ({ }) => (
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
            <IonLabel>AppState</IonLabel>
          </IonItem>
        </IonMenuToggle>

      </IonList>
    </IonContent>
  </IonMenu>
);

export default withRouter(Menu);
