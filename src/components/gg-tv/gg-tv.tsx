import { Component, Host, h, State, Prop } from '@stencil/core';
import { firestoreDB } from '../../global/firebase';
import { school_id } from '../../global/constants';
import { Requests, Gear } from '../../interfaces';


@Component({
    tag: 'gg-tv',
    styleUrl: 'gg-tv.css'
})

export class GgTv {
    @State()
    requests: Requests[] = [];
    @State()
    requestedGear: string[] = [];
    @State()
    gear: Gear[] = [];
    @Prop() 
    gearById: string; //comes from route url
    reservedGearById: any;
    
    filtertext: string;

    componentDidLoad(){
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
        }
        weekDates = ['2019-11-25', '2019-11-26', '2019-11-27', '2019-11-28', '2019-11-29']
        reservedGearIDByDate = {
            "2019-11-25": {
              "LwHWZGxbbpN6FT0Lyfj5": true,
              "Zb3WKpMwCV7QJN1kFeIs": true,
            },
            "2019-11-26": {
              "lHB1NRiglq6ikfcNkyu5": true,
            }
          }
    render() {
console.log('HERE' , this.gear)
        return (
            <Host><ion-header>
        
                <ion-toolbar>
                    <ion-menu-button slot="start"></ion-menu-button>
                    <ion-title>TV View</ion-title>
                </ion-toolbar>
                </ion-header>
                <ion-content>
                <ion-select
                            okText="Okay"
                            cancelText="Dismiss"
                            placeholder="Select Period">

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
                       
                            
               <table>
                  
  <tr>
    <th>Gear</th>
    <th>Monday</th>
    <th>Tuesday</th>
    <th>Wendsday</th>
    <th>Thursday</th>
    <th>Friday</th>

  </tr>
   {this.gear.map(gear =>
  <tr>
    <td>{gear.name}  <ion-badge
                                slot="end"
                                color={gear.multiple == "1"
                                ? "primary"
                                : gear.multiple == '2'
                                    ? "warning"
                                    : gear.multiple == '3'
                                        ? "danger"
                                        : gear.multiple == '4'
                                            ? "success"
                                            : "dark"}>{gear.multiple}</ion-badge></td>
    <td><ion-chip color={this.reservedGearIDByDate
                                ? 'danger'
                                : 'primary'}>
                                <ion-icon name="checkmark-circle"></ion-icon>
                                <ion-label>{this.reservedGearIDByDate
                                        ? 'Unavailable'
                                        : 'Available'}</ion-label>
                            </ion-chip></td>
    <td><ion-chip color={this.reservedGearIDByDate
                                ? 'primary'
                                : 'danger'}>
                                <ion-icon name="checkmark-circle"></ion-icon>
                                <ion-label>{this.reservedGearIDByDate
                                        ? 'Available'
                                        : 'Unavailable'}</ion-label>
                            </ion-chip></td>
    <td><ion-chip color={this.reservedGearIDByDate
                                ? 'danger'
                                : 'primary'}>
                                <ion-icon name="checkmark-circle"></ion-icon>
                                <ion-label>{this.reservedGearIDByDate
                                        ? 'Unavailable'
                                        : 'Available'}</ion-label>
                            </ion-chip></td>
    <td><ion-chip color={this.reservedGearIDByDate
                                ? 'danger'
                                : 'primary'}>
                                <ion-icon name="checkmark-circle"></ion-icon>
                                <ion-label>{this.reservedGearIDByDate
                                        ? 'Unavailable'
                                        : 'Available'}</ion-label>
                            </ion-chip></td>
                            {this.weekDates.map(date =>
    <td><ion-chip color={this.reservedGearIDByDate[date][gear.id]? "danger": "success"}>
                                <ion-icon name={this.reservedGearIDByDate[date][gear.id]? "close-circle": "checkmark-circle"}></ion-icon>
                                <ion-label>{this.reservedGearIDByDate[date][gear.id]? "Requested": "Available"}</ion-label>
                            </ion-chip></td>)}
  </tr>
                    )}
</table>

                </ion-content>
            </Host>
        );
    }
    
}
