import {Component, Host, h} from '@stencil/core';
import { statusController } from '../../helpers/utils';

@Component({tag: 'gg-home', styleUrl: 'gg-home.css'})
export class GgHome {

    render() {
        return (
            <Host>
                <ion-header>
                    <ion-toolbar>
                        <ion-buttons slot="start">
                            <ion-menu-button></ion-menu-button>
                        </ion-buttons>
                        <ion-buttons slot="secondary">
                            <ion-button href="/profile">
                                <ion-icon slot="icon-only" name="contact"></ion-icon>
                            </ion-button>
                        </ion-buttons>
                        <ion-title>
                            Home
                        </ion-title>
                    </ion-toolbar>

                </ion-header>

                <ion-content>
                    <ion-card>
                        <ion-card-header>
                            <ion-card-title>Welcome to Gear Genie!</ion-card-title>
                        </ion-card-header>
                        <ion-card-content>
                            <ion-card-body></ion-card-body>
                            <ion-button href="/requests" expand="block">
                                View Requests
                            </ion-button>
                            <ion-button href="/gear" expand="block">
                                View Gear
                            </ion-button>
                            <ion-button color="secondary" href="https://github.com/SideMatter/gear-genie-stencil" expand="block">
                                View Github
                            </ion-button>
                            <ion-button color="secondary" href="https://trello.com/b/mAs82Vmo/gear-genie-roadmap" expand="block">
                                View Trello Board
                            </ion-button>
                            <ion-button onClick={() => statusController()} color="tertiary" expand="block">Pointless Button</ion-button>
                            <ion-card-text>
                                Trust In Dustin -DTOP
                            </ion-card-text>
                        </ion-card-content>
                    </ion-card>
                </ion-content>
                
            </Host>

        );
    }
}
