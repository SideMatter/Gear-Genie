import { Component, Host, h, State } from '@stencil/core';
import { modalController, ModalOptions } from '@ionic/core';
import '@firebase/auth';
import '@firebase/database';
import { firestoreDB } from '../../global/firebase';
import { school_id } from '../../global/constants';
import { Gear } from '../../interfaces';

@Component({ tag: 'gg-gear', styleUrl: 'gg-gear.css' })

export class GgGear {
    @State()
    gear: Gear[] = [];

    componentDidLoad() {
        firestoreDB
            .collection(`/schools/${school_id}/gear`)
            .onSnapshot(snap => {
                const gearDocs = snap
                    .docs
                    .map(doc => doc.data() as Gear);
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
                    <ion-card color="danger">
                        <ion-card-header>

                            <ion-card-title>WARNING!</ion-card-title>
                        </ion-card-header>

                        <ion-card-content>
                            <ion-text>This page is still in pre-alpha, meaning that it may not work or may
                                break other things, Using this page you do so at your own risk of loss</ion-text>
                            <ion-datetime placeholder="Select Date"></ion-datetime>
                        </ion-card-content>
                    </ion-card>
                    {this
                        .gear
                        .map(gear => <ion-item>
                            <ion-icon
                                slot="start"
                                name={gear.type == "camera"
                                    ? "Videocam"
                                    : gear.type == 'lighting'
                                        ? "sunny"
                                        : "logo-freebsd-devil"}></ion-icon>
                            <ion-label>{gear.name}</ion-label>
                            <ion-chip color="primary">
                                <ion-icon name="checkmark-circle"></ion-icon>
                                <ion-label>Status Coming #Soon</ion-label>
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
