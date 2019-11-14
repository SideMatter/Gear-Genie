import {Component, Host, h, State, Prop} from '@stencil/core';
import {modalController, ModalOptions, SearchbarChangeEventDetail} from '@ionic/core';
import '@firebase/auth';
import '@firebase/database';
import {firestoreDB} from '../../global/firebase';
import {school_id} from '../../global/constants';
import {Gear, Requests} from '../../interfaces';
import {statusController} from '../../helpers/utils';

@Component({tag: 'gg-gear', styleUrl: 'gg-gear.css'})

export class GgGear {
    @State()
    gear : Gear[] = [];
    @State()reservedGearById = {};
    @Prop()
    gearById : string; //comes from route url
    requests : Requests[];
    filtertext: string;

    componentDidLoad() {
        firestoreDB
            .collection(`/schools/${school_id}/requests`)
            .onSnapshot(snap => {
                const requestDocs = snap
                    .docs
                    .map(doc => doc.data()as Requests);
                console.log('Requests', requestDocs);
                this.requests = requestDocs
                firestoreDB
                    .collection(`/schools/${school_id}/gear`)
                    .onSnapshot(snap => {
                        const gearDocs = snap
                            .docs
                            .map(doc => {
                                const gear = doc.data()as Gear;
                                gear.id = doc.id;
                                return gear
                            });
                        console.log('gear', gearDocs);
                        this.gear = gearDocs

                    })
            })
    }
    async openModal() {
        const modalCtrl = modalController;
        const options : ModalOptions = {
            component: 'gg-new-gear',
            componentProps: {
                modalCtrl: modalCtrl
            }
        };
        const modal = await modalCtrl.create(options);
        modal.present()
    }
    presentPopover(ev) {
        const popover = Object.assign(document.createElement('ion-popover'), {
            component: 'gg-status-popup',
            event: ev,
            translucent: true
        });
        document
            .body
            .appendChild(popover);
        return popover.present();
    }
    periodFilming = "A1";
    date = "2019-10-05";
    async calendarChanged(e) {

        this.date = e
            .detail
            .value
            .substr(0, 10)

        const response = await statusController(this.date, this.periodFilming);

        this.reservedGearById = response
        console.log('cory is the best person person ever', response)
        console.log('betterstring', this.date)
        const toast = document.createElement('ion-toast');
        toast.message = 'Date Filming Updated.';
        toast.duration = 2000;

        document
            .body
            .appendChild(toast);
        return toast.present();
    }
    async periodChanged(e) {
        this.periodFilming = e.detail.value;
        const response = await statusController(this.date, this.periodFilming);
        this.reservedGearById = response
        const toast = document.createElement('ion-toast');
        toast.message = 'Period Filming Updated .';
        toast.duration = 2000;

        document
            .body
            .appendChild(toast);
        return toast.present();
    }

        gearFilterText(e : CustomEvent < SearchbarChangeEventDetail >) {
            const value = e.detail.value;
            console.log('value', value);
            this.filtertext = value
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

                            <ion-card-title>Gear Status</ion-card-title>
                        </ion-card-header>
                        <ion-searchbar onIonChange={e => this.gearFilterText(e)}></ion-searchbar>
                        <ion-card-content>
                            <ion-text>This page shows all gear and the status of it. Status is based on
                                period and date.</ion-text>
                                

                            <ion-datetime
                                pickerFormat="YYYY-MM-DD"
                                placeholder="Tap Here To Select Date"
                                onIonChange={e => this.calendarChanged(e)}></ion-datetime>

                            <ion-select
                                okText="Okay"
                                cancelText="Dismiss"
                                placeholder="Tap Here To Select Period"
                                onIonChange={e => this.periodChanged(e)}>
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
                        </ion-card-content>
                    </ion-card>
                    {this
                        .gear
                        // .filter(gear => gear.name === this.filtertext)
                        .map(gear => <ion-item>
                            <ion-icon
                                slot="start"
                                name={gear.type == "camera"
                                ? "Videocam"
                                : gear.type == 'lighting'
                                    ? "sunny"
                                    : "logo-freebsd-devil"}></ion-icon>
                            <ion-label>{gear.name}</ion-label>
                            <ion-badge
                                slot="end"
                                color={gear.multiple == "1"
                                ? "primary"
                                : gear.multiple == '2'
                                    ? "warning"
                                    : gear.multiple == '3'
                                        ? "tertiary"
                                        : gear.multiple == '4'
                                            ? "success"
                                            : "dark"}>{gear.multiple}</ion-badge>
                            <ion-chip
                                onClick={() => this.presentPopover(this.gearById)}
                                color={this.reservedGearById[gear.id]
                                ? 'danger'
                                : 'primary'}>
                                <ion-icon name="checkmark-circle"></ion-icon>
                                <ion-label>{this.reservedGearById[gear.id]
                                        ? 'Unavailable'
                                        : 'Available'}</ion-label>
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
