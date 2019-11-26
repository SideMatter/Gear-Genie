import {Component, Host, h, State, Prop,} from '@stencil/core';
import '@firebase/auth';
import '@firebase/database';
import {firestoreDB} from '../../global/firebase';
import {Gear, Requests} from '../../interfaces';
import {SelectChangeEventDetail} from '@ionic/core';
import { school_id, } from '../../global/constants';
import {statusController} from '../../helpers/utils';

@Component({tag: 'gg-add-gear-to-request', styleUrl: 'gg-add-gear-to-request.css'})
export class GgAddGearToRequest {
    @State()
    gear : Gear[] = [];
    @State()
    filterType = 'camera'
    @State()reservedGearById = {};
     @Prop()
    gearById : string; //comes from route url
    requests : Requests[];
    filtertext: string;
    @Prop()
periodFilming: string; //passed from other component
@Prop()
date: string; //passed from other component
   
    async componentDidLoad() {
        
        firestoreDB
            .collection(`/schools/${school_id}/gear`)
            .orderBy("name")
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
            
            

        const response2 = await statusController(this.date, this.periodFilming);
        this.reservedGearById = response2 
        console.log('periodFilming', this.periodFilming)
        console.log('date', this.date)
    }
    segmentChanged(e : CustomEvent < SelectChangeEventDetail >) {
        const value = e.detail.value;
        console.log('segmentChanged', value);
        this.filterType = value

    }
    clickGear(gear) {
        const requestPage = document.querySelector("gg-new-request");
        requestPage.addGear(gear);
        const nav = requestPage.closest("ion-nav");
        nav.pop();
      }
   
    render() {
        return (
            <Host>

                <ion-header>
                    <ion-toolbar>
                        <ion-buttons slot="start">
                            <ion-back-button/>
                        </ion-buttons>
                        <ion-title>Add Gear</ion-title>
                    </ion-toolbar>
                    <ion-segment onIonChange={e => this.segmentChanged(e)}>
                        <ion-segment-button value="camera">
                            <ion-label>Camera</ion-label>
                        </ion-segment-button>
                        <ion-segment-button value="microphone">
                            <ion-label>Microphone</ion-label>
                        </ion-segment-button>
                        <ion-segment-button value="lighting">
                            <ion-label>Lighting</ion-label>
                        </ion-segment-button>
                        <ion-segment-button value="other">
                            <ion-label>Other</ion-label>
                        </ion-segment-button>
                    </ion-segment>
                </ion-header>

                <ion-content>
                    <ion-list>
                        {this
                            .gear
                            .filter(gear => gear.type === this.filterType)
                            
                        .map(gear => <ion-item disabled={this.reservedGearById[gear.id] == "Unavailable" ? true : false} onClick={() => this.clickGear(gear)}>
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
                                        ? "danger"
                                        : gear.multiple == '4'
                                            ? "success"
                                            : "dark"}>{gear.multiple}</ion-badge>
                                <ion-chip
                                
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
                    </ion-list>
                </ion-content>

            </Host>
        );
    }
}