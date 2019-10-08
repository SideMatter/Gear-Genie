import { Component, Host, h } from '@stencil/core';


@Component({
    tag: 'gg-directory',
    styleUrl: 'gg-directory.css'
})
export class GgDirectory {

    

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
              <ion-item>
                <ion-label>Alex Lyman</ion-label>
                <ion-chip>
                    <ion-label>Badge ID:177001</ion-label>
                  </ion-chip>
              </ion-item>
              <ion-item>
                <ion-label>Eric Phillips</ion-label>
              </ion-item>
              <ion-item>
                <ion-label>Dustin Dean Topham</ion-label>
              </ion-item>
              <ion-item>
                <ion-label>IDK more people lol</ion-label>
              </ion-item>
              <ion-item>
                <ion-label>Avery Webb</ion-label>
              </ion-item>
              <ion-item>
                <ion-label>Pokémon Yellow</ion-label>
              </ion-item>
              <ion-item>
                <ion-label>Pokémon Yellow</ion-label>
              </ion-item>
              <ion-item>
                <ion-label>Pokémon Yellow</ion-label>
              </ion-item>
              <ion-item>
                <ion-label>Pokémon Yellow</ion-label>
              </ion-item>
              <ion-item>
                <ion-label>Pokémon Yellow</ion-label>
              </ion-item>
              <ion-item>
                <ion-label>Pokémon Yellow</ion-label>
              </ion-item>
              <ion-item>
                <ion-label>Pokémon Yellow</ion-label>
              </ion-item>
            </ion-list>
          </ion-content></Host>
        )}
}
