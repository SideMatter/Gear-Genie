import { Component, Host, h, Prop  } from '@stencil/core';
import { firestoreDB } from '../../global/firebase';
import { school_id } from '../../global/constants';


@Component({
    tag: 'gg-status-popup',
    styleUrl: 'gg-status-popup.css'
})

export class GgStatusPopup {
    @Prop()
gearById: string;

    statusAvailable(){
        firestoreDB
        .doc(`/schools/${school_id}/gear/${this.gearById}`)
        .update({status: 'Available'});
    }
    statusApproval(){
        firestoreDB
        .doc(`/schools/${school_id}/gear/${this.gearById}`)
        .update({status: 'Needs Approval'});
    }
    statusUnavailable(){
        firestoreDB
        .doc(`/schools/${school_id}/gear/${this.gearById}`)
        .update({status: 'Unavailable'});
    }
   
    

    render() {
        return (
            <Host>
                <ion-content>
                    <ion-list>
                    <ion-item color="primary" onClick={() => this.statusAvailable()}>
  <ion-label>
    Available
  </ion-label>
</ion-item> <ion-item color="warning">
  <ion-label>
    Require Permission
  </ion-label>
</ion-item> <ion-item color="danger">
  <ion-label>
  Unavailable
  </ion-label>
</ion-item>
                    </ion-list>
                </ion-content>
                </Host>
        );
    }
}
