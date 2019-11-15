import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton } from '@ionic/react';
import { useAccessibility, useIsScreenReaderAvailable } from '@ionic/react-hooks';

interface AccessibilityProps {
}

const Accessibility: React.FC<AccessibilityProps> = () => {
  const isScreenReaderEnabled = useIsScreenReaderAvailable();
  // console.log(isScreenReaderEnabled)
  return (
    <IonPage>
      <IonHeader>
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        <IonToolbar>
          <IonTitle>Accessibility</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        isScreenReaderEnabled
      </IonContent>
    </IonPage>
  );
};

export default Accessibility;