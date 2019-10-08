import { Component, Host, h } from '@stencil/core';


@Component({
    tag: 'gg-home',
    styleUrl: 'gg-home.css'
})
export class GgHome {

    

    render() {
        return (
            <Host>
            <ion-header>
  <ion-toolbar>
      <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
      <ion-buttons slot="secondary">
        <ion-button href="/profile">
          <ion-icon slot="icon-only" name="contact"></ion-icon>
        </ion-button>
      </ion-buttons>
      <ion-title>
          Home
        </ion-title>
    </ion-toolbar>
    
</ion-header>

<ion-content>
    <ion-card>
        <ion-card-header>
          <ion-card-title>%RequestName%</ion-card-title>
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
          <ion-chip color="warning">
              <ion-icon name="contacts"></ion-icon>
              <ion-label>Pending Approval</ion-label>
            </ion-chip>
        </ion-card-content>
      </ion-card>
      <ion-card>
          <ion-card-header>
            <ion-card-title>%RequestName%</ion-card-title>
          </ion-card-header>
         <ion-card-content>
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
                <ion-label>Approved</ion-label>
              </ion-chip>
              <ion-chip color="secondary">
                  <ion-icon name="calendar"></ion-icon>
                  <ion-label>Pickup by: %Pickup Date%</ion-label>
                </ion-chip>
          </ion-card-content>
        </ion-card>
    <ion-card>
      <ion-card-header>
        <ion-card-title>%RequestName%</ion-card-title>
      </ion-card-header>
     <ion-card-content>
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
            <ion-icon name="checkmark-circle"></ion-icon>
            <ion-label>Picked Up</ion-label>
          </ion-chip>
          <ion-chip color="secondary">
              <ion-icon name="calendar"></ion-icon>
              <ion-label>Return by: %Return Date%</ion-label>
            </ion-chip>
      </ion-card-content>
    </ion-card>
</ion-content>
<ion-footer>
    <ion-button href="/checkinout" expand="block">Check Out Gear</ion-button>
    <ion-button href="/checkinout" expand="block">Return Gear</ion-button>
</ion-footer></Host>

        );
    }
}
