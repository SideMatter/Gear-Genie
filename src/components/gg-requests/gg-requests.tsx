import { Component, Host, h } from '@stencil/core';
import { modalController, ModalOptions } from '@ionic/core';


@Component({
    tag: 'gg-requests',
    styleUrl: 'gg-requests.css'
})
export class GgRequests {
    // this is where varibles and controllers and funtions go

    async openModal() {
        const modalCtrl = modalController;
        const options: ModalOptions = {
            component: 'gg-new-request',
            componentProps: {
                modalCtrl: modalCtrl
            }
        };
        const modal = await modalCtrl.create(options);
        modal.present()
    }


    render() {
        return (
            <Host><ion-header>
                <ion-toolbar>
                    <ion-menu-button slot="start"></ion-menu-button>
                    <ion-title>My Requests</ion-title>
                </ion-toolbar>
            </ion-header>

                <ion-content>
                    <ion-card>
                        <ion-card-header>
                            <ion-card-title>%Requestname%</ion-card-title>
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
                            <ion-button expand="block">Edit Request</ion-button>
                            <ion-chip color="warning">
                                <ion-icon name="contacts"></ion-icon>
                                <ion-label>Pending Approval</ion-label>
                            </ion-chip>
                            <ion-chip color="primary">
                                <ion-icon name="time"></ion-icon>
                                <ion-label>After School</ion-label>
                            </ion-chip>
                        </ion-card-content>
                    </ion-card>
                    <ion-fab vertical="bottom" horizontal="end" slot="fixed">
                        <ion-fab-button onClick={() => this.openModal()}>
                            <ion-icon name="create"></ion-icon>
                        </ion-fab-button>
                    </ion-fab>
                </ion-content>
                <ion-footer>
                    <ion-button expand="block">Return Gear</ion-button>
                </ion-footer>
            </Host>
        );
    }
}
