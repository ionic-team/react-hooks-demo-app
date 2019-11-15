import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton } from '@ionic/react';
import { useAppState, useAppLaunchUrl, useAppUrlOpen } from '@ionic/react-hooks';

interface AppStateProps {
}

const AppState: React.FC<AppStateProps> = () => {
  const isActive = useAppState();
  const launchUrl = useAppLaunchUrl();
  const urlOpen = useAppUrlOpen();
  console.log(isActive);
  return (
    <IonPage>
      <IonHeader>
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        <IonToolbar>
          <IonTitle>AppState</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <p>isActive: {JSON.stringify(isActive)}</p>
        <p>appLaunchUrl: {launchUrl}</p>
        <p>appUrlOpen: {urlOpen}</p>
        
      </IonContent>
    </IonPage>
  );
};

export default AppState;