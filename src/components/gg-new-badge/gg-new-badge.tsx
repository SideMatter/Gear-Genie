import { Component, h, Host, State } from '@stencil/core';
import { InputChangeEventDetail, SelectChangeEventDetail } from '@ionic/core';
import {Badges} from '../../interfaces';
import { firestoreDB } from '../../global/firebase';
import { school_id } from '../../global/constants';

@Component({
    tag: 'gg-new-badge',
    styleUrl: 'gg-new-badge.css'
})

export class GgNewBadge {
    @State()
    badges : Badges = {
    name: null,
   day: null,
   firebaseUUID: null,
   permslevel: null,

}
    badgeNameChange(e : CustomEvent < InputChangeEventDetail >) {
        const value = e.detail.value;
        console.log('value', value);
        this.badges.name = value
    }
    badgeDayChange(e : CustomEvent < SelectChangeEventDetail >) {
        const value = e.detail.value;
        console.log('day', value);
        this.badges.day = value
    }
    badgeUUIDChange(e : CustomEvent < InputChangeEventDetail >) {
        const value = e.detail.value;
        console.log('UUID', value);
        this.badges.firebaseUUID = value
    }
    badgePermsChange(e : CustomEvent < SelectChangeEventDetail >) {
        const value = e.detail.value;
        console.log('day', value);
        this.badges.permslevel = value
    }
    addBadge() {

        console.log('this.badges', this.badges);
        firestoreDB
            .collection(`/schools/${school_id}/gear`)
            .add(this.badges);
        
    }

    render() {
        return (
            <Host>
                <ion-header>
                    <ion-toolbar>
                        <ion-title>New Badge</ion-title>
                    </ion-toolbar>
                </ion-header>

                <ion-content>
                    <ion-list>
                        <ion-item>
                            <ion-label position="floating">Your Name</ion-label>
                            <ion-input onIonChange={(e) => this.badgeNameChange(e)} value={this.badges.name}></ion-input>
                        </ion-item>
                        <ion-select
                                onIonChange={(e) => this.badgeDayChange(e)}
                                value={this.badges.day}
                                okText="Okay"
                                cancelText="Dismiss"
                                placeholder="day">
                                <ion-select-option value="A-Day">A-Day</ion-select-option>
                                <ion-select-option value="B-Day">B-Day</ion-select-option>
                                <ion-select-option value="Full-Time">Full-Time</ion-select-option></ion-select>
                        <ion-item>
                            <ion-label position="floating">Firebase UUID Number</ion-label>
                            <ion-input onIonChange={(e) => this.badgeUUIDChange(e)} value={this.badges.firebaseUUID}></ion-input>
                        </ion-item>
                      
                      
                        <ion-item>
                            <ion-label>Permission Level</ion-label>
                            <ion-select
                                onIonChange={(e) => this.badgePermsChange(e)}
                                value={this.badges.permslevel}
                                okText="Okay"
                                cancelText="Dismiss">
                                <ion-select-option value="Student">Student</ion-select-option>
                                <ion-select-option value="Teacher">Teacher</ion-select-option>
                                <ion-select-option value="Developer">Developer</ion-select-option>
                            </ion-select>
                        </ion-item>
                        </ion-list>
                </ion-content>
                <ion-footer>
                    <ion-button expand="block" onClick={() => this.addBadge()}>
                        Add Gear
                    </ion-button>
                </ion-footer>
                 </Host>
        );
    }
}
