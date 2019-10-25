import { Component, Host, h, State } from '@stencil/core';
import { modalController, ModalOptions } from '@ionic/core';
import '@firebase/auth';
import '@firebase/database';
import { firestoreDB } from '../../global/firebase';
import { Gear } from '../../interfaces';

@Component({
    tag: 'gg-gear',
    styleUrl: 'gg-gear.css'
})

export class GgGear {
    @State()
    gear: Gear[] = [];

    componentDidLoad() {
        firestoreDB.collection('Gear').onSnapshot(snap => {
            const gearDocs = snap.docs.map(doc => doc.data() as Gear);
            console.log('gear', gearDocs);
            this.gear = gearDocs
        })
    }
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
                    <ion-card>
                        <ion-card-header>
                            <ion-card-title>
                                Select Date
                            </ion-card-title>
                        </ion-card-header>
                        <ion-card-content>
                    <ion-datetime value="10/05/2020">
                        
                        </ion-datetime>
                        </ion-card-content>
                    </ion-card>
                    {
                        this.gear.map(gear => <ion-item>
                            <ion-icon slot="start" name={gear.type == "camera" ? "Videocam" : gear.type == 'lighting' ? "sunny" : "logo-freebsd-devil"}></ion-icon>
                            <ion-label>{gear.name}</ion-label>
                            <ion-chip color="primary">
                                <ion-icon name="checkmark-circle"></ion-icon>
                                <ion-label>Available</ion-label>
                            </ion-chip>
                        </ion-item>)
                    }
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
