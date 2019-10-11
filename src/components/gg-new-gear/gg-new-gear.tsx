import { Component, Host, h, Prop, State } from '@stencil/core';
import { InputChangeEventDetail, SelectChangeEventDetail, ToggleChangeEventDetail } from '@ionic/core';
import { firestoreDB } from '../../global/firebase';


@Component({
  tag: 'gg-new-gear',
  styleUrl: 'gg-new-gear.css'
})
export class GgNewGear {
  @State()
  gear: Gear = {
    name: null,
    type: null,
    approvalNeeded: false
  }
  @Prop()
  modalCtrl: HTMLIonModalControllerElement;

  closeModal() {
    this.modalCtrl.dismiss();
  }
  gearNameChange(e: CustomEvent<InputChangeEventDetail>) {
    const value = e.detail.value;
    console.log('value', value);
    this.gear.name = value
  }

  gearTypeChange(e: CustomEvent<SelectChangeEventDetail>) {
    const value = e.detail.value;
    console.log('type', value);
    this.gear.type = value
  }
  gearApprovalNeeded(e: CustomEvent<ToggleChangeEventDetail>) {
    const value = e.detail.checked;
    console.log('ApprovalNeeded', value);
    this.gear.approvalNeeded = value
  }
  addGear() {

    console.log('this.gear', this.gear);
    firestoreDB.collection("Gear").add(this.gear);
    this.closeModal();
  }

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
              <ion-input onIonChange={(e) => this.gearNameChange(e)} value={this.gear.name}></ion-input>
            </ion-item>
            <ion-item>
              <ion-label>Gear Type</ion-label>
              <ion-select onIonChange={(e) => this.gearTypeChange(e)} value={this.gear.type} okText="Okay" cancelText="Dismiss">
                <ion-select-option value="camera">Camera</ion-select-option>
                <ion-select-option value="microphone">Microphone</ion-select-option>
                <ion-select-option value="lighting">Lighting</ion-select-option>
                <ion-select-option value="other">Other</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item>
              <ion-label>Requires Approval</ion-label>
              <ion-toggle onIonChange={(e) => this.gearApprovalNeeded(e)} checked={this.gear.approvalNeeded}></ion-toggle>
            </ion-item>
            <ion-item><ion-button>Tap NFC Chip</ion-button><ion-button>Scan QR Code</ion-button></ion-item>
          </ion-list>
        </ion-content>
        <ion-footer>
          <ion-button expand="block" onClick={() => this.addGear()}>
            Add Gear
                </ion-button>
        </ion-footer>

      </Host>
    );
  }
}
