import {Component, Host, h, State} from '@stencil/core';
import {modalController, ModalOptions} from '@ionic/core';
import {firestoreDB} from '../../global/firebase';
import {Requests} from '../../interfaces';
import { school_id } from '../../global/constants';

@Component({tag: 'gg-teacher-view', styleUrl: 'gg-teacher-view.css'})
export class GgTeacherview {
    // this is where varibles and controllers and funtions go
    @State()
    requests : Requests[] = [];

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
    }
    declineRequest(request : Requests) {
        firestoreDB
            .doc(`/schools/${school_id}/requests/${request.id}`)
            .update({status: 'declined'});
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
                            This view will show all requests
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
                                <ion-list></ion-list>
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
