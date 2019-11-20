import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import Menu from './components/Menu';
import Home from './pages/Home';
import Accessibility from './pages/AccessibilityPage';
import AppPage from './pages/AppPage';
import BrowserPage from './pages/BrowserPage';
import ClipboardPage from './pages/ClipboardPage';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import CameraPage from './pages/CameraPage';
import DevicePage from './pages/DevicePage';
import GeolocationPage from './pages/GeolocationPage';
import NetworkPage from './pages/NetworkPage';
import StoragePage from './pages/StoragePage';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonSplitPane contentId="main">
        <Menu />
        <IonRouterOutlet id="main">
          <Route path="/home" component={Home} exact={true} />
          <Route path="/accessibility" component={Accessibility} exact={true} />
          <Route path="/appstate" component={AppPage} exact={true} />
          <Route path="/browser" component={BrowserPage} exact={true} />
          <Route path="/camera" component={CameraPage} exact={true} />
          <Route path="/clipboard" component={ClipboardPage} exact={true} />
          <Route path="/device" component={DevicePage} exact={true} />
          <Route path="/geolocation" component={GeolocationPage} exact={true} />
          <Route path="/network" component={NetworkPage} exact={true} />
          <Route path="/storage" component={StoragePage} exact={true} />
          <Route path="/" render={() => <Redirect to="/home" /> } exact={true} />
        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  </IonApp>
);

export default App;
