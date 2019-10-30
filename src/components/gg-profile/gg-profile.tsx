import { Component, Host, h } from '@stencil/core';
import { firestoreDB } from '../../global/firebase';
import { Badges } from '../../interfaces';
import { school_id } from '../../global/constants';


@Component({
  tag: 'gg-profile',
  styleUrl: 'gg-profile.css'
})
export class GgProfile {
  badges: any[];
  componentDidLoad() {
    firestoreDB.collection(`/schools/${school_id}/badges`).onSnapshot(snap => {
        const badgeDocs = snap.docs.map(doc => doc.data() as Badges);
        console.log('Badges', badgeDocs);
        this.badges = badgeDocs
    })
}


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
          <ion-card color="danger">
            <ion-card-header>
              <ion-card-title>
                WARNING
              </ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <ion-card-body>
                This screen is not completed yet. Using it will break things. Don't use it. -Alex
              </ion-card-body>
            </ion-card-content>
          </ion-card>
          <div><ion-button>Add Badge Using NFC</ion-button>
            <ion-button color="secondary">Add Badge Using Code</ion-button></div>
          <ion-card color="dark">
            <ion-card-content>
              <ion-card-subtitle>
                UKNIGHTED A-Day 2020
                </ion-card-subtitle>
              <ion-card-title>
                John Doe
            </ion-card-title>
              <ion-card-subtitle>
                Badge ID: 1920a0001
          </ion-card-subtitle>
              <ion-chip color="light">Student</ion-chip>
              <ion-img src="https://i.ibb.co/Jtm9ZS9/Shield-White.png" alt="Shield-White" style={{ border: "0" }}></ion-img>
              <ion-button>Tap Badge</ion-button>
              <ion-button color="secondary">Show Badge QR code</ion-button>
            </ion-card-content>
          </ion-card>
        </ion-content>
      </Host>
    );
  }
}
