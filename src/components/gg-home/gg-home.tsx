import {Component, Host, h} from '@stencil/core';

@Component({tag: 'gg-home', styleUrl: 'gg-home.css'})

export class GgHome {
     toggleDarkTheme() {
        document.body.classList.toggle('dark',);
      }

    render() {
        return (
            <Host>
                <ion-header>
                    <ion-toolbar>
                        <ion-buttons slot="start">
                            <ion-menu-button></ion-menu-button>
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
                            <ion-icon name="albums" slot="start"></ion-icon>
                                View Requests
                            </ion-button>
                            <ion-button href="/gear" expand="block" shape="round">
                            <ion-icon name="videocam" slot="start"></ion-icon>
                                View Gear Availablity
                            </ion-button>
                            <ion-button color="secondary" shape="round" href="https://github.com/SideMatter/gear-genie-stencil" expand="block">
                            <ion-icon name="logo-octocat" slot="start"></ion-icon>
                                View Github
                            </ion-button>
                            <ion-button color="secondary" shape="round" href="https://trello.com/b/mAs82Vmo/gear-genie-roadmap" expand="block">
                            <ion-icon name="videocam" slot="start"></ion-icon>
                                View Trello Board
                            </ion-button>
                            <ion-button onClick={() => this.toggleDarkTheme()} expand="block" shape="round" color="dark">
                            <ion-icon name="contrast" slot="start"></ion-icon>
                                Light Switch
                                
                            </ion-button>
                            <ion-button color="tertiary" shape="round" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" expand="block">
                            <ion-icon name="logo-youtube" slot="start"></ion-icon>
                               Pointless Button
                            </ion-button>
                           
                           
                        </ion-card-content>
                    </ion-card>
                </ion-content>
                
            </Host>

        );
    }
}
