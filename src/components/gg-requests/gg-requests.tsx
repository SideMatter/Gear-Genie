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
        type: null,
        requesttype: null,
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
            .collection(`/schools/${school_id}/requests`)
            .orderBy("datefilming")
            .onSnapshot(snap => {
                const RequestDocs = snap
                    .docs
                    .map(doc => {
                        const Request = doc.data()as Requests;
                        Request.id = doc.id;
                        return Request;
                    });

                console.log('Requests', RequestDocs);
                this.requests = RequestDocs
            })
            firestoreDB
                .collection(`/schools/${school_id}/gear`)
                .orderBy("datefilming", "desc")
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
    deleteRequest(request : Requests) {
        const toast = document.createElement('ion-toast');
  toast.header = 'Request Murderer 3000';
  toast.message = 'Are you sure you want to delete this request?';
  toast.position = 'bottom';
  toast.buttons = [
    {
      side: 'start',
      icon: 'trash',
      text: 'Delete',
      handler: () => {
        firestoreDB
            .doc(`/schools/${school_id}/requests/${request.id}`)
            .delete()
      }
    }, {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    }
  ];

  document.body.appendChild(toast);
  return toast.present();
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
    presentToast() {
        const toast = document.createElement('ion-toast');
        toast.message = 'Editing requests is not developed yet. If you need to change something, just make a new request AND tell Alex so he can delete the old one. Its on my to-do list of things to fix';
        toast.duration = 4000;
      
        document.body.appendChild(toast);
        return toast.present();
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
                            <ion-chip
                                    color={requests.requesttype == "Check-out"
                                        ? "secondary"
                                     : "primary"}>
                                    <ion-icon
                                        name={requests.requesttype == "Check-out"
                                        ? "flash"
                                     : "albums"}></ion-icon>
                                    <ion-label>{requests.requesttype == "Check-out"
                                        ? "Flash Check-Out"
                                     : "Request"}</ion-label>
                                </ion-chip>
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
                                            <ion-badge
                                slot="end"
                                color={this.gearById[gearid].multiple == "1"
                                ? "primary"
                                : this.gearById[gearid].multiple == '2'
                                    ? "warning"
                                    : this.gearById[gearid].multiple == '3'
                                        ? "tertiary"
                                        : this.gearById[gearid].multiple == '4'
                                            ? "success"
                                            : "dark"}>{this.gearById[gearid].multiple}</ion-badge>

                                        </ion-item>
                                        
                                        )
                                    }   
                                </ion-list>


                                <ion-button
                                    onClick={() => this.deleteRequest(requests)}
                                    expand="block"
                                    shape="round"
                    color="tertiary"><ion-icon name="trash" slot="start"></ion-icon>Delete Request</ion-button>
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
