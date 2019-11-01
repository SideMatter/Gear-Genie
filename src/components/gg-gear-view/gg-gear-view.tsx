import { Component, h, Host,  Prop } from '@stencil/core';


@Component({
    tag: 'gg-gear-view',
    styleUrl: 'gg-gear-view.css'
})
export class GgGearView {
    @Prop() gearid: string
    @Prop() gearById

    

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
                   
                   <ion-card-header><ion-card-title>
                   {this.gearById[this.gearid].name}</ion-card-title>
                   </ion-card-header>
                   <ion-card-content>
                       <ion-card-body>
                           {this.gearById[this.gearid].details}
                           <ion-list>
                           <ion-item>

  <ion-label>
    Current Status
  </ion-label>
  <ion-chip>status coming soon</ion-chip>
</ion-item>
                           </ion-list>
                       </ion-card-body>
                   </ion-card-content>
               </ion-card>

           </ion-content>
           <ion-footer>
               <ion-grid>
                   <ion-row>
                       <ion-col><ion-button href="/new-request" expand="full" color="secondary">Request
                           </ion-button></ion-col>
                       <ion-col><ion-button expand="full">Check Out
                           </ion-button></ion-col>
                   </ion-row>
                   
               </ion-grid>
           </ion-footer>
            </Host>
        );
    }
}
