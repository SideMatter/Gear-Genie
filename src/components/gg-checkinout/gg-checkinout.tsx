import { Component, Host, h, } from '@stencil/core';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';


@Component({
    tag: 'gg-checkinout',
    styleUrl: 'gg-checkinout.css'
})

export class GgCheckinout {
  nfc: any;
  ndef: any;

  test(){
    this.nfc.addNdefListener(() => {
      console.log('successfully attached ndef listener');
    }, (err) => {
      console.log('error attaching ndef listener', err);
    }).subscribe((event) => {
      console.log('received ndef message. the tag contains: ', event.tag);
      console.log('decoded tag id', this.nfc.bytesToHexString(event.tag.id));
    
      let message = this.ndef.textRecord('Hello world');
      this.nfc.share([message]).then(onSuccess).catch(onError);
    });
  } 

    render() {
        return (
            <Host><ion-header>
            <ion-toolbar>
                <ion-menu-button slot="start"></ion-menu-button>
              <ion-title>Gear Check In/Return</ion-title>
            </ion-toolbar>
          </ion-header>
          
          <ion-content>
            <div><ion-title>
              My Requests
            </ion-title></div>
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
                    <ion-button expand="block">Check out/in this request</ion-button>
                        <ion-chip color="primary">
                            <ion-icon name="time"></ion-icon>
                            <ion-label>After School</ion-label>
                          </ion-chip>
                  </ion-card-content>
                </ion-card>
            </ion-content>
          <ion-footer>
            <div text-center>
            <ion-title>Flash check-out/in</ion-title></div>
              <ion-button expand="full">Tap</ion-button>
            <ion-button expand="full" color="secondary">Scan</ion-button>
          </ion-footer></Host>
        );
    }
}
