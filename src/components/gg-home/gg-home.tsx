import {Component, Host, h} from '@stencil/core';

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
                        </ion-card-content>
                    </ion-card>
                </ion-content>
                
            </Host>

        );
    }
}
