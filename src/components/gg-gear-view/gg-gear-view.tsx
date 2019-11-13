import {Component, h, Host, Prop} from '@stencil/core';
import { firestoreDB } from '../../global/firebase';
import { school_id } from '../../global/constants';
import { InputChangeEventDetail } from '@ionic/core';
import { Requests } from '../../interfaces';


@Component({tag: 'gg-gear-view', styleUrl: 'gg-gear-view.css'})
export class GgGearView {
    @Prop()gearid : string
    @Prop()gearById
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
    presentToast() {
        const toast = document.createElement('ion-toast');
        toast.message = 'Flash Check Out is not coded/ready yet. To checkout, make a new request for the date and period and gear you need. Dont worry about approval.';
        toast.duration = 8000;
      
        document.body.appendChild(toast);
        return toast.present();
      }
      requestNameChange(e : CustomEvent < InputChangeEventDetail >) {
        const value = e.detail.value;
        console.log('name', value);
        this.Requests.username = value
    }
flashCheckOut(){
    console.log('this.requests', this.Requests);
    this.Requests.requestedGear = []
    firestoreDB
        .collection(`/schools/${school_id}/requests`)
        .add(this.Requests);
    
}


    render() {
        return (
            <Host>
                <ion-header>
                    <ion-toolbar>
                        <ion-title>Gear View</ion-title>
                    </ion-toolbar>
                </ion-header>
                <ion-content>
                    <ion-card>

                        <ion-card-header>
                            <ion-card-title>
                                {this.gearById[this.gearid].name}
                            </ion-card-title>
                        </ion-card-header>
                        <ion-card-content>
                            <ion-card-body>
                                {this.gearById[this.gearid].details}
                                <ion-list>

                                    <ion-item>

                                        <ion-label>
                                            Status
                                        </ion-label>
                                        <ion-button color="primary" href="/gear">
                                            
                                            <ion-label>View Status</ion-label>
                                        </ion-button>
                                    </ion-item>
                                    <ion-item>
                                        <ion-label>Color Code</ion-label>
                                        <ion-badge
                                            slot="start"
                                            color={this.gearById[this.gearid].multiple == "1"
                                            ? "primary"
                                            : this.gearById[this.gearid].multiple == '2'
                                                ? "warning"
                                                : this.gearById[this.gearid].multiple == '3'
                                                    ? "tertiary"
                                                    : this.gearById[this.gearid].multiple == '4'
                                                        ? "success"
                                                        : "dark"}>{this.gearById[this.gearid].multiple}</ion-badge>
                                    </ion-item>
                                </ion-list>
                            </ion-card-body>
                        </ion-card-content>
                    </ion-card>
<ion-card>
    <ion-card-Header icon="flash" slot="Start">
        <ion-icon icon="flash" slot="Start"></ion-icon>
        <ion-card-title>Flash Check Out</ion-card-title>
    </ion-card-Header>
    <ion-card-content>
        <ion-list>
        <ion-item>
                        <ion-label position="floating">Your Name</ion-label>
                        <ion-input
                            onIonChange={(e) => this.requestNameChange(e)}
                            value={this.Requests.username}></ion-input>
                    </ion-item>
            </ion-list>
    </ion-card-content>
</ion-card>
                </ion-content>
                <ion-footer>
                    <ion-grid>
                        <ion-row>
                            <ion-col>
                                <ion-button href="/new-request" expand="full" color="secondary">Request
                                </ion-button>
                            </ion-col>
                            <ion-col>
                                <ion-button expand="full" onClick={() => this.presentToast()}>Check Out
                                </ion-button>
                            </ion-col>
                        </ion-row>

                    </ion-grid>
                </ion-footer>
            </Host>
        );
    }
}
