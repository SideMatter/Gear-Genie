import {Component, Host, h, State, Prop} from '@stencil/core';
import {modalController, ModalOptions} from '@ionic/core';
import {firestoreDB} from '../../global/firebase';
import {Requests, Gear} from '../../interfaces';
import {school_id} from '../../global/constants';

@Component({tag: 'gg-teacher-view', styleUrl: 'gg-teacher-view.css'})
export class GgTeacherview {
    // this is where varibles and controllers and funtions go
    Requests : Requests = {
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
    requests : Requests[] = [];
    @State()
    requestedGear : string[] = [];
    @State()
    gear : Gear[] = [];
    @Prop()
    gearById : string; //comes from route url

    componentDidLoad() {
        firestoreDB
            .collection(`/schools/${school_id}/requests`)
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

    }
    approveRequest(request : Requests) {
        firestoreDB
            .doc(`/schools/${school_id}/requests/${request.id}`)
            .update({status: 'approved'});
            const toast = document.createElement('ion-toast');
        toast.message = 'This request has been approved';
        toast.duration = 2000;
      
        document.body.appendChild(toast);
        return toast.present();
    }
    declineRequest(request : Requests) {
        firestoreDB
            .doc(`/schools/${school_id}/requests/${request.id}`)
            .update({status: 'denied'});
            const toast = document.createElement('ion-toast');
        toast.message = 'This request has been declined';
        toast.duration = 2000;
      
        document.body.appendChild(toast);
        return toast.present();
    }
    async openModal() {
        const modalCtrl = modalController;
        const options : ModalOptions = {
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
            <Host>
                <ion-header>
                    <ion-toolbar>
                        <ion-menu-button slot="start"></ion-menu-button>
                        <ion-title>Student Requests</ion-title>
                    </ion-toolbar>
                </ion-header>

                <ion-content>
                    <ion-card>
                        <ion-card-header>
                            <ion-card-title>
                                Approve or decline requests
                            </ion-card-title>
                        </ion-card-header>
                        <ion-card-content>
                            <ion-card-body>
                                This view will show all requests, so you may approve or decline them. just click the buttons to do so.
                            </ion-card-body>
                        </ion-card-content>
                    </ion-card>
                    {this
                        .requests
                        .map(requests => <ion-card>
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
                                                    : this.gearById[gearid].type == 'microphone'
                                                        ? "microphone"
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
}</ion-list>
                                <ion-button
                                    onClick={() => this.approveRequest(requests)}
                                    expand="block"
                                    color="success">Approve Request</ion-button>
                                <ion-button
                                    onClick={() => this.declineRequest(requests)}
                                    expand="block"
                                    color="danger">Decline Request</ion-button>
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
                </ion-content>
                <ion-footer>
                    <ion-button expand="block">Return Gear</ion-button>
                </ion-footer>
            </Host>
        );
    }
}
