import { Component, Host, h, Prop } from '@stencil/core';


@Component({
    tag: 'gg-new-request',
    styleUrl: 'gg-new-request.css'
})
export class GgNewRequest {


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
                    <ion-title>New Request</ion-title>
                </ion-toolbar>
            </ion-header>

                <ion-content>

                    <ion-item>
                        <ion-label position="floating">Request Name</ion-label>
                        <ion-input></ion-input>
                    </ion-item>

                    <ion-item>
                        <ion-label position="fixed">Date Filming</ion-label>
                        <ion-input type="date"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-label>Period Filming</ion-label>
                        <ion-select okText="Okay" cancelText="Dismiss">
                            <ion-select-option value="A1">A1</ion-select-option>
                            <ion-select-option value="A2">A2</ion-select-option>
                            <ion-select-option value="A3">A3</ion-select-option>
                            <ion-select-option value="A4">A4</ion-select-option>
                            <ion-select-option value="B5">B5</ion-select-option>
                            <ion-select-option value="B6">B6</ion-select-option>
                            <ion-select-option value="B7">B7</ion-select-option>
                            <ion-select-option value="B8">B8</ion-select-option>
                            <ion-select-option value="Afterschool">After School</ion-select-option>
                            <ion-select-option value="Lunch">Lunch</ion-select-option>
                        </ion-select>
                    </ion-item>
                    <ion-item>
                        <ion-label position="floating">Trello Card Link</ion-label>
                        <ion-input type="url"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-label>Gear</ion-label>
                        <ion-select okText="Okay" cancelText="Dismiss" multiple={true}>
                            <ion-select-option value="%gear1%">%Gear1%</ion-select-option>
                            <ion-select-option value="%gear2%">%Gear2%</ion-select-option>
                            <ion-select-option value="%gear3%">%Gear3%</ion-select-option>
                        </ion-select>
                    </ion-item>
                </ion-content>
                <ion-footer class="ion-padding">
                    <ion-button expand="block" type="submit">
                        Submit Request
                </ion-button>
                </ion-footer>
            </Host>
        );
    }
}
