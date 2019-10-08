import { Component, Host, h, Prop } from '@stencil/core';


@Component({
    tag: 'gg-new-gear',
    styleUrl: 'gg-new-gear.css'
})
export class GgNewGear {
    closeModal() {
        this.modalCtrl.dismiss();
    }

    @Prop()
    modalCtrl: HTMLIonModalControllerElement;

    

    render() {
        return (
            <Host><ion-header>
            <ion-toolbar>
            <ion-buttons slot="secondary">
                        <ion-button onClick={() => this.closeModal()}>Cancel</ion-button>
                    </ion-buttons>
              <ion-title>New Gear</ion-title>
            </ion-toolbar>
          </ion-header>
          
          <ion-content>
          <ion-list>
            <ion-item>
              <ion-label position="floating">Gear Name</ion-label>
              <ion-input></ion-input>
            </ion-item>
            <ion-item>
                <ion-label>Gear Type</ion-label>
                <ion-select value="camera" okText="Okay" cancelText="Dismiss">
                  <ion-select-option value="camera">Camera</ion-select-option>
                  <ion-select-option value="microphone">Microphone</ion-select-option>
                  <ion-select-option value="lighting">Lighting</ion-select-option>
                  <ion-select-option value="other">Other</ion-select-option>
                </ion-select>
              </ion-item>
              <ion-item>
                  <ion-label>Requires Approval</ion-label>
                  <ion-toggle></ion-toggle>
                </ion-item>
                <ion-item><ion-button>Tap NFC Chip</ion-button></ion-item>
          </ion-list>
          </ion-content>
          <ion-footer>
              <ion-button expand="block">
                Add Gear
                </ion-button>
                </ion-footer>
          
          </Host>
        );
    }
}
