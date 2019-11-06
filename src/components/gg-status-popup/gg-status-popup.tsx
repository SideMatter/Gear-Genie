import { Component, Host, h, Prop  } from '@stencil/core';
import { firestoreDB } from '../../global/firebase';
import { school_id } from '../../global/constants';


@Component({
    tag: 'gg-status-popup',
    styleUrl: 'gg-status-popup.css'
})

export class GgStatusPopup {
  @Prop() gearid: string
  @Prop() gearById: string
    statusAvailable(){
        firestoreDB
        .doc(`/schools/${school_id}/gear/${this.gearById[this.gearid]}`)
        .update({status: 'Available'});
    }
    statusApproval(){
        firestoreDB
        .doc(`/schools/${school_id}/gear/${this.gearById[this.gearid]}`)
        .update({status: 'Needs Approval'});
    }
    statusUnavailable(){
        firestoreDB
        .doc(`/schools/${school_id}/gear/${this.gearById[this.gearid]}`)
        .update({status: 'Unavailable'});
    }
   
    

    render() {
        return (
            <Host>
                <ion-content>
                    <ion-list>
                    <ion-button color="primary" expand="block" onClick={() => this.statusAvailable()}>
  <ion-label>
    Available
  </ion-label>
</ion-button> <ion-button color="warning"  expand="block">
  <ion-label>
    Require Permission
  </ion-label>
</ion-button> <ion-button color="danger"  expand="block">
  <ion-label>
  Unavailable
  </ion-label>
</ion-button>
                    </ion-list>
                </ion-content>
                </Host>
        );
    }
}
