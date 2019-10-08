import { Component, Host, h } from '@stencil/core';


@Component({
    tag: 'gg-profile',
    styleUrl: 'gg-profile.css'
})
export class GgProfile {

    

    render() {
        return (
            <Host><ion-header>
            <ion-toolbar>
              <ion-title>Profile</ion-title>
              <ion-buttons slot="start">
                <ion-menu-button></ion-menu-button>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>
          
          <ion-content>
            <div><ion-button>Add Badge Using NFC</ion-button>
            <ion-button color="secondary">Add Badge Using Code</ion-button></div>
          <ion-card color="dark">
            <ion-card-content>
                <ion-card-subtitle>
                    UKNIGHTED A-Day, 2020
                </ion-card-subtitle>
            <ion-card-title>
              John Doe
            </ion-card-title>
            <ion-card-subtitle>
              Badge ID: 1920a0001
          </ion-card-subtitle>
          <ion-chip color="white">Student</ion-chip>
            <ion-img src="https://i.ibb.co/Jtm9ZS9/Shield-White.png" alt="Shield-White" border="0"></ion-img>
            <ion-button>Tap Badge</ion-button>
            <ion-button color="secondary">Show Badge QR code</ion-button>
          </ion-card-content>
          </ion-card>
          </ion-content>
</Host>          
        );
    }
}
