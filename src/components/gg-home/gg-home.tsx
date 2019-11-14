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
                            <ion-button href="/requests" expand="block" shape="round">
                                View Requests
                            </ion-button>
                            <ion-button href="/gear" expand="block" shape="round">
                                View Gear
                            </ion-button>
                            <ion-button color="secondary" shape="round" href="https://github.com/SideMatter/gear-genie-stencil" expand="block">
                                View Github
                            </ion-button>
                            <ion-button color="secondary" shape="round" href="https://trello.com/b/mAs82Vmo/gear-genie-roadmap" expand="block">
                                View Trello Board
                            </ion-button>
                            <ion-button color="tertiary" shape="round" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" expand="block">
                               Pointless Button
                            </ion-button>
                           
                            <ion-card-text>
                                Trust In Dustin -DTOP
                            </ion-card-text>
                        </ion-card-content>
                    </ion-card>
                    <ion-card>
                        <ion-card-header>
                            <ion-card-title>
                                Version: 1.0.1.0 Update Notes
                            </ion-card-title>
                        </ion-card-header>
                        <ion-card-content>
                            <ion-card-body>
                                <ion-list>
                                    <ion-item>Flash Check Out is a cool new feature! It's faster then the time it takes to run and pickup Topham's phone when it rings!</ion-item>
                                    <ion-item>Moved some UI things around. The Status chip is now above the gear in requests to similfy things</ion-item>
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
