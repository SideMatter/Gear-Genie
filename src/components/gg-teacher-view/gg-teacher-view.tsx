import { Component, Host, h } from '@stencil/core';


@Component({
    tag: 'gg-teacher-view',
    styleUrl: 'gg-teacher-view.css'
})
export class GgTeacherView {

    

    render() {
        return (
            <Host><ion-header>
            <ion-toolbar>
              <ion-menu-button slot="start"></ion-menu-button>
              <ion-title>Teacher View</ion-title>
            </ion-toolbar>
          </ion-header>
          
          <ion-content>
            <ion-searchbar></ion-searchbar>
            <ion-card>
              <ion-card-header>
                <ion-card-title>%RequestName%</ion-card-title>
                <ion-card-subtitle>
                  <ion-chip color="primary">
                    <ion-icon name="contact"></ion-icon>
                    <ion-label>Name</ion-label>
                  </ion-chip>
                  <ion-chip color="secondary">
                    <ion-icon name="calendar"></ion-icon>
                    <ion-label>Pickup by: %Pickup Date%</ion-label>
                  </ion-chip>
                  <ion-chip color="secondary">
                    <ion-icon name="calendar"></ion-icon>
                    <ion-label>Return by: %Return Date%</ion-label>
                  </ion-chip>
                </ion-card-subtitle>
              </ion-card-header>
              <ion-card-content>
                <ion-text>%RequestNotes%</ion-text>
          
                <ion-list>
                  <ion-item>
                    <ion-icon name="videocam" slot="start"></ion-icon>
                    <ion-label>%Gear1%</ion-label>
                  </ion-item>
                  <ion-item>
                    <ion-icon name="mic" slot="start"></ion-icon>
                    <ion-label>%Mic1%</ion-label>
                  </ion-item>
                  <ion-item>
                    <ion-icon name="flashlight" slot="start"></ion-icon>
                    <ion-label>%Light1%</ion-label>
                  </ion-item>
                </ion-list>
                <ion-chip color="success">
                  <ion-icon name="checkmark"></ion-icon>
                  <ion-label>Approve Request</ion-label>
                </ion-chip>
                <ion-chip color="danger">
                  <ion-icon name="close"></ion-icon>
                  <ion-label>Decline Request</ion-label>
                </ion-chip>
          
          
              </ion-card-content>
            </ion-card>
          </ion-content></Host>
        );
    }
}
