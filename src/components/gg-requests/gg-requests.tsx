import { Component, Host, h, State, Method } from '@stencil/core';
import { modalController, ModalOptions } from '@ionic/core';
import { firestoreDB } from '../../global/firebase';
import { Requests } from '../../interfaces';


@Component({
    tag: 'gg-requests',
    styleUrl: 'gg-requests.css'
})
export class GgRequests {
    // this is where varibles and controllers and funtions go
    @State()
    requests: Requests[] = [];
    @Method()
  addGear(gear) {
  console.log('gear from other page', gear);
}

    componentDidLoad() {
        firestoreDB.collection('Requests').onSnapshot(snap => {
            const requestDocs = snap.docs.map(doc => doc.data() as Requests);
            console.log('Requests', requestDocs);
            this.requests = requestDocs
        })
    }
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
    clickGear(gear){
        const requestPage = document.querySelector('gg-requests');
        requestPage.addGear(gear);
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
                {
                        this.requests.map(requests =><ion-card>
                            <ion-card-header>
                                <ion-card-title>{requests.requestname}</ion-card-title>
                            </ion-card-header>
                            <ion-card-content>
                                <ion-list>
                                    <ion-item>{requests.gear}</ion-item>
                                </ion-list>
                                <ion-button expand="block">Edit Request</ion-button>
                                <ion-chip color={requests.status == "needs-approval" ? "warning" : requests.status == 'approved' ? "success" : "danger"}>
                                    <ion-icon name={requests.status == "needs-approval" ? "contacts" : requests.status == 'approved' ? "checkmark-circle" : "close-circle"}></ion-icon>
                                    <ion-label>{requests.status == "needs-approval" ? "Approval Needed" : requests.status == 'approved' ? "Approved" : "Declined"}</ion-label>
                                </ion-chip>
                                <ion-chip color="primary">
                                    <ion-icon name="time"></ion-icon>
                                    <ion-label>{requests.periodfilming}</ion-label>
                                </ion-chip>
                                <ion-chip color="primary">
                                    <ion-icon name="calendar"></ion-icon>
                                    <ion-label>{requests.datefilming}</ion-label>
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
