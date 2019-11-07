import {Component, h, Host, Prop} from '@stencil/core';
import {firestoreDB} from '../../global/firebase';
import {school_id} from '../../global/constants';

@Component({tag: 'gg-gear-view', styleUrl: 'gg-gear-view.css'})
export class GgGearView {
    @Prop()gearid : string
    @Prop()gearById

    statusAvailable() {
        firestoreDB.doc(`/schools/${school_id}/gear/${this.gearById[this.gearid]}`).update({status: 'Available'});
    }
    statusApproval() {
        firestoreDB.doc(`/schools/${school_id}/gear/${this.gearById[this.gearid]}`).update({status: 'Needs Approval'});
    }
    statusUnavailable() {
        firestoreDB.doc(`/schools/${school_id}/gear/${this.gearById[this.gearid]}`).update({status: 'Unavailable'});
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
                                            Current Status
                                        </ion-label>
                                        <ion-chip color="primary">
                                            <ion-icon name="checkmark-circle"></ion-icon>
                                            <ion-label>{this.gearById.status}</ion-label>
                                        </ion-chip>
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

                </ion-content>
                <ion-footer>
                    <ion-grid>
                        <ion-row>
                            <ion-col>
                                <ion-button href="/new-request" expand="full" color="secondary">Request
                                </ion-button>
                            </ion-col>
                            <ion-col>
                                <ion-button expand="full">Check Out
                                </ion-button>
                            </ion-col>
                        </ion-row>

                    </ion-grid>
                </ion-footer>
            </Host>
        );
    }
}
