import { Component, Host, h, State } from '@stencil/core';
import { firestoreDB } from '../../global/firebase';
import { Badges } from '../../interfaces';
import { school_id } from '../../global/constants';


@Component({
    tag: 'gg-directory',
    styleUrl: 'gg-directory.css'
})

export class GgDirectory {
 
  componentDidLoad() {
    firestoreDB.collection(`/schools/${school_id}/badges`).onSnapshot(snap => {
        const badgesDocs = snap.docs.map(doc => doc.data() as Badges);
        console.log('Badges', badgesDocs);
        this.Badges = badgesDocs
    })
  }
@State()
Badges: Badges[];
    

    render() {
        return (
            <Host><ion-header>
            <ion-toolbar>
                <ion-menu-button slot="start"></ion-menu-button>
              <ion-title>Directory</ion-title>
            </ion-toolbar>
          </ion-header>
          
          <ion-content>
            <ion-list>
              <ion-item color="warning"> 
                <ion-label>
                  DTOP 👑
                </ion-label>
                  <ion-chip >
                    <ion-label>Teacher, Producer, Benovlent Dictator</ion-label>
                  </ion-chip>
              </ion-item>
              {this.Badges.map(Badges =><ion-item>
                <ion-label>{Badges.name}</ion-label>
                <ion-chip>
                    <ion-label>Badge ID:{Badges.NFCbadgeid}</ion-label>
                  </ion-chip>
                  <ion-chip>
                    <ion-label>{Badges.day}</ion-label>
                  </ion-chip>
                  <ion-chip>
                    <ion-label>{Badges.permslevel}</ion-label>
                  </ion-chip>
              </ion-item>)}
             </ion-list>
          </ion-content></Host>
        )}
}
