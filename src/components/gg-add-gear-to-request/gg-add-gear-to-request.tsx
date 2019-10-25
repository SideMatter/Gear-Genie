import {Component, Host, h, State,} from '@stencil/core';
import '@firebase/auth';
import '@firebase/database';
import {firestoreDB} from '../../global/firebase';
import {Gear} from '../../interfaces';
import {SelectChangeEventDetail} from '@ionic/core';

@Component({tag: 'gg-add-gear-to-request', styleUrl: 'gg-add-gear-to-request.css'})
export class GgAddGearToRequest {
    @State()
    gear : Gear[] = [];
    @State()
    filterType = 'camera'
   
    

    componentDidLoad() {
        firestoreDB
            .collection('Gear')
            .onSnapshot(snap => {
                const gearDocs = snap
                    .docs
                    .map(doc => doc.data()as Gear);
                console.log('gear', gearDocs);
                this.gear = gearDocs
            })
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
                            .map(gear => <ion-item onClick={() => this.clickGear(gear)}>
                                <ion-icon
                                    slot="start"
                                    name={gear.type == "camera"
                                    ? "Videocam"
                                    : gear.type == 'lighting'
                                        ? "sunny"
                                        : "logo-freebsd-devil"}></ion-icon>
                                <ion-label>{gear.name}</ion-label>
                                <ion-chip color="primary">
                                    <ion-icon name="checkmark-circle"></ion-icon>
                                    <ion-label>Available</ion-label>
                                </ion-chip>
                            </ion-item>)
}
                    </ion-list>
                </ion-content>

            </Host>
        );
    }
}
