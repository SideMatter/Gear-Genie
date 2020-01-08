import {Component, h, Host, Prop} from '@stencil/core';
import {firestoreDB} from '../../global/firebase';
import {school_id} from '../../global/constants';
import {InputChangeEventDetail, DatetimeChangeEventDetail, SelectChangeEventDetail} from '@ionic/core';
import {Requests} from '../../interfaces';

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
        status: "approved",
        type: null,
        requesttype: "Check-out"
    }
    date: string;
    periodFilming: any;
    requestNameChange(e : CustomEvent < InputChangeEventDetail >) {
        const value = e.detail.value;
        console.log('name', value);
        this.Requests.username = value
    }
    flashCheckOut() {
        console.log('this.requests', this.Requests);
        this.Requests.requestedGear = [this.gearid]
        this.Requests.requestname = `${this.Requests.username} checked out ${this.gearById[this.gearid].name}`
        firestoreDB
            .collection(`/schools/${school_id}/requests`)
            .add(this.Requests);
        const toast = document.createElement('ion-toast');
        toast.message = 'Gear Checked Out. It is due back 10 mins before the end of this period.';
        toast.duration = 8000;

        document
            .body
            .appendChild(toast);
        return toast.present();

    }
    requestDateFilming(e : CustomEvent < DatetimeChangeEventDetail >) {
        const value = e.detail.value;
        console.log('value', value);
        this.Requests.datefilming = value
        this.date = value
    }
    requestPeriodFilming(e : CustomEvent < SelectChangeEventDetail >) {
        const value = e.detail.value;
        console.log('type', value);
        this.Requests.periodfilming = value
        this.periodFilming = e.detail.value
        console.log('periodFilming', this.periodFilming);
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
                                            slot="end"
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
                        <ion-card-Header>
                            <ion-icon icon="flash" slot="Start"></ion-icon>
                            <ion-card-title>Flash Check Out</ion-card-title>
                            <ion-card-subtitle>Only use this if you are at school checking out the gear in class. If you want to reserve gear click the request button at the bottom of the page</ion-card-subtitle>
                        </ion-card-Header>
                        <ion-card-content>
                            <ion-list>
                                <ion-item>
                                    <ion-label position="floating">Your Name</ion-label>
                                    <ion-input
                                        onIonChange={(e) => this.requestNameChange(e)}
                                        value={this.Requests.username}></ion-input>
                                </ion-item>
                                <ion-item>
                        <ion-label>Period Filming</ion-label>
                        <ion-select
                            value={this.Requests.periodfilming}
                            onIonChange={(e) => this.requestPeriodFilming(e)}
                            okText="Okay"
                            cancelText="Dismiss">

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
                    </ion-item>
                    <ion-item>
                        <ion-label position="fixed">Date Filming</ion-label>
                        <ion-input
                         onIonChange={(e) => this.requestDateFilming(e)}
                            type="date"
                            value={this.Requests.datefilming}></ion-input>
                    </ion-item>
                            </ion-list>
                            <ion-button expand="full" onClick={() => this.flashCheckOut()} shape="round" href='/requests'>
                            <ion-icon name="flash"></ion-icon>
                                Check Out
                            </ion-button>
                        </ion-card-content>
                    </ion-card>
                </ion-content>
                <ion-footer>

                    <ion-button href="/new-request" expand="full" color="secondary" shape="round" >Request
                    </ion-button>

                </ion-footer>
            </Host>
        );
    }
}
