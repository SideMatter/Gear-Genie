import { Component, Host, h } from '@stencil/core';
import { modalController, ModalOptions } from '@ionic/core';

@Component({
    tag: 'gg-gear',
    styleUrl: 'gg-gear.css'
})
export class GgGear {

    async openModal() {
        const modalCtrl = modalController;
        const options: ModalOptions = {
            component: 'gg-new-gear',
            componentProps: {
                modalCtrl: modalCtrl
            }
        };
        const modal = await modalCtrl.create(options);
        modal.present()
    }

    render() {
        return (
            <Host>
                <ion-header>
                    <ion-toolbar>
                        <ion-menu-button slot="start"></ion-menu-button>
                        <ion-title>Gear</ion-title>
                    </ion-toolbar>
                </ion-header>

                <ion-content>
                    <div><ion-button>Set Date</ion-button></div>
                    <ion-list>
                        <ion-item>
                            <ion-icon name="videocam" slot="start"></ion-icon>
                            <ion-label>%Gear1%</ion-label>
                            <ion-chip color="primary">
                                <ion-icon name="checkmark-circle"></ion-icon>
                                <ion-label>Available</ion-label>
                            </ion-chip>
                        </ion-item>
                        <ion-item>
                            <ion-icon name="mic" slot="start"></ion-icon>
                            <ion-label>%Mic2%</ion-label>
                            <ion-chip color="danger">
                                <ion-icon name="close-circle"></ion-icon>
                                <ion-label>Unavailable</ion-label>
                            </ion-chip>
                        </ion-item>  <ion-item>
                            <ion-icon name="videocam" slot="start"></ion-icon>
                            <ion-label>%Light3%</ion-label>
                            <ion-chip color="warning">
                                <ion-icon name="warning"></ion-icon>
                                <ion-label>Available with permission</ion-label>
                            </ion-chip>
                        </ion-item>
                    </ion-list>
                    <ion-fab vertical="bottom" horizontal="end" slot="fixed">
                        <ion-fab-button onClick={() => this.openModal()}>
                            <ion-icon name="create"></ion-icon>
                        </ion-fab-button>
                    </ion-fab>
                </ion-content>
            </Host>
        );
    }
}
