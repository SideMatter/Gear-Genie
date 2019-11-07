import { Component, Host, h, Prop, } from '@stencil/core';



@Component({
    tag: 'gg-checkinout',
    styleUrl: 'gg-checkinout.css'
})

export class GgCheckinout {
  @Prop() gearid: string
    @Prop() gearById
  

    render() {
        return (
            <Host>
              <ion-content>
                <ion-text>{this.gearById}</ion-text>
              </ion-content>

            </Host>
        );
    }
}
