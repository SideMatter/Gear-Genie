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
                            <ion-button color="secondary" href="https://github.com/SideMatter/gear-genie-stencil" expand="block">
                                View Github
                            </ion-button>
                            <ion-button color="secondary" href="https://trello.com/b/mAs82Vmo/gear-genie-roadmap" expand="block">
                                View Trello Board
                            </ion-button>
                           
                            <ion-card-text>
                                Trust In Dustin -DTOP
                            </ion-card-text>
                        </ion-card-content>
                    </ion-card>
                    <ion-card>
                        <ion-card-header>
                            <ion-card-title>
                                Version: 1.0.0.4 Update Notes
                            </ion-card-title>
                        </ion-card-header>
                        <ion-card-content>
                            <ion-card-body>
                                <ion-list>
                                    <ion-item>Added Dark Mode, so you can all live in your hermit shells and still use Gear Genie. AHHHHH MY EYES</ion-item>
                                    <ion-item>Fixed Requests so they work, because requesting gear is kinda important. IDK</ion-item>
                                    <ion-item>Added buttons that link to various related Gear Genie goodness. Github for nerds, trello board for features and progress. Only real addicts will use this, and I dont have any of those yet.</ion-item>
                                    <ion-item>STATUS STATUS STATUS! The gear page now dynmaically updates. If gear is requested for that day, it will show as requested. Alex worked really hard on this one, like a week, so in the sprit of november BE THANKFULL</ion-item>
                                </ion-list>
                                
                            </ion-card-body>

                        </ion-card-content>
                    </ion-card>
                </ion-content>
                
            </Host>

        );
    }
}
