import { Component, Host, h, State, Method, Prop } from '@stencil/core';
import { modalController, ModalOptions } from '@ionic/core';
import { firestoreDB } from '../../global/firebase';
import { Requests, Gear } from '../../interfaces';
import { school_id, } from '../../global/constants';


@Component({
    tag: 'gg-requests',
    styleUrl: 'gg-requests.css'
})
export class GgRequests {
    // this is where varibles and controllers and funtions go
    Requests: Requests = {
        requestname: null,
        requestedGear: [],
        username: null,
        datefilming: null,
        periodfilming: null,
        trellocardlink: null,
        approval: null,
        id: null,
        status: "needs-approval",
        type: null
    }
    @State()
    requests: Requests[] = [];
    @State()
    requestedGear: string[] = [];
    @State()
    gear: Gear[] = [];
    @Prop() 
    gearById: string; //comes from route url

    @Method()
    async addGear(gear) {
        console.log('gear from other page', gear);
        this.requestedGear = [
            ...this.requestedGear,
            gear.id,


        ];

    }
    clickGear(gear) {
        const requestPage = document.querySelector('gg-requests');
        requestPage.addGear(gear);
    }
    componentDidLoad() {
        firestoreDB.collection(`/schools/${school_id}/requests`).onSnapshot(snap => {
            const requestDocs = snap.docs.map(doc => doc.data() as Requests);
            console.log('Requests', requestDocs);
            this.requests = requestDocs
            firestoreDB
                .collection(`/schools/${school_id}/gear`)
                .onSnapshot(snap => {
                    const gearDocs = snap
                        .docs
                        .map(doc => {
                            const gear = doc.data() as Gear;
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
        const options: ModalOptions = {
            component: "ion-nav",
            componentProps: {
                root: "gg-new-request",
                rootParams: {
                    modalCtrl: modalCtrl,
                    gearById : this.gearById
                }
            }
        };
        const modal = await modalCtrl.create(options);
        modal.present();
    }



    render() {
        return (
            <Host><ion-header>
                <ion-toolbar>
                    <ion-menu-button slot="start"></ion-menu-button>
                    <ion-title>All Requests</ion-title>
                </ion-toolbar>
            </ion-header>

                <ion-content>
                    {
                        this.requests.map(requests => <ion-card>
                            <ion-card-header>
                                <ion-card-title>{requests.requestname}</ion-card-title>
                            </ion-card-header>
                            <ion-card-content>
                                <ion-list>
                                    {requests
                                        .requestedGear
                                        .map(gearid => <ion-item>
                                            <ion-icon
                                                slot="start"
                                                name={this.gearById[gearid].type == "camera"
                                                    ? "Videocam"
                                                    : this.gearById[gearid].type == 'lighting'
                                                        ? "sunny"
                                                        : "logo-freebsd-devil"}></ion-icon>

                                            <ion-label>{this.gearById[gearid].name}</ion-label>
                                            <ion-badge slot="end"
                                            color={this.gearById[gearid].multiple == "1"
                                                ? "primary"
                                                : this.gearById[gearid].multiple == '2'
                                                    ? "warning"
                                                    : this.gearById[gearid].multiple == '3'
                                                        ? "tertiary"
                                                         : this.gearById[gearid].multiple == '4'
                                                        ? "success"
                                                        : "dark"}>{this.gearById[gearid].multiple}</ion-badge>

                                        </ion-item>)
                                    }   
                                </ion-list>

                                <ion-button expand="block">Edit Request</ion-button>

                                <ion-chip
                                    color={requests.status == "denied"
                                        ? "danger"
                                        : requests.status == 'approved'
                                            ? "success"
                                            : "warning"}>
                                    <ion-icon
                                        name={requests.status == "denied"
                                            ? "close-circle"
                                            : requests.status == 'approved'
                                                ? "checkmark-circle"
                                                : "contacts"}></ion-icon>
                                    <ion-label>{requests.status == "denied"
                                        ? "Declined"
                                        : requests.status == 'approved'
                                            ? "Approved"
                                            : "Needs Approval"}</ion-label>
                                </ion-chip>
                                <ion-chip color="primary">
                                    <ion-icon name="time"></ion-icon>
                                    <ion-label>{requests.periodfilming}</ion-label>

                                </ion-chip>
                                <ion-chip color="primary">
                                    <ion-icon name="calendar"></ion-icon>
                                    <ion-label>{requests.datefilming}</ion-label>
                                </ion-chip>
                                <ion-chip color="primary">
                                    <ion-icon name="contact"></ion-icon>
                                    <ion-label>{requests.username}</ion-label>
                                </ion-chip>

                            </ion-card-content>
                        </ion-card>)
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
