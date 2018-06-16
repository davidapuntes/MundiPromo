import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';import { AngularFireModule} from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AuthProvider } from '../providers/auth/auth';
import { Facebook } from '@ionic-native/facebook';
import { Camera } from '@ionic-native/camera';
import {EmailComposer} from'@ionic-native/email-composer';
import { EmailProvider } from '../providers/email/email';
import { ImageProvider } from '../providers/image/image';
import { SocialSharing } from '@ionic-native/social-sharing';
import { DatabaseProvider } from '../providers/database/database';
import { PreloaderProvider } from '../providers/preloader/preloader';
import { HttpModule } from '@angular/http';
import { DatePipe } from '@angular/common'
import { ShareProvider } from '../providers/share/share';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Network } from '@ionic-native/network';
import {BrowserTab } from '@ionic-native/browser-tab'
import { InAppBrowser } from '@ionic-native/in-app-browser';





const config = {
  apiKey: "AIzaSyDWuh4kMKL8QcOaExZKS8UemDAwzK_7YpQ",
  authDomain: "promosapp-f65a4.firebaseapp.com",
  databaseURL: "https://promosapp-f65a4.firebaseio.com",
  projectId: "promosapp-f65a4",
  storageBucket: "promosapp-f65a4.appspot.com",
  messagingSenderId: "302191716332"

};


@NgModule({
  declarations: [
    MyApp,   
    
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(config),
    IonicModule.forRoot(MyApp),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HttpModule
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp, 

    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    Facebook,
    Camera,
    EmailComposer,
    EmailProvider,
    ImageProvider,
    SocialSharing,
    DatabaseProvider,
    PreloaderProvider,
    DatePipe,
    ShareProvider,
    GoogleMaps,
    Network,
    BrowserTab,
    InAppBrowser
    
  ]
})
export class AppModule {}
