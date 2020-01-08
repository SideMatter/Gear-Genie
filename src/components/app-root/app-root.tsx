import { Component, h, Prop } from '@stencil/core';
import '@firebase/auth';
import '@firebase/database';
import { firestoreDB } from '../../global/firebase';
import { school_id } from '../../global/constants';
import { Gear } from '../../interfaces';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})

export class AppRoot {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home',
    },

    {
      title: 'Gear',
      url: '/gear',
      icon: 'videocam'
    },

    {
      title: 'Requests',
      url: '/requests',
      icon: 'albums'
    },

    {
      title: 'Directory',
      url: '/directory',
      icon: 'contacts'
    },

    {
      title: 'Profile',
      url: '/profile',
      icon: 'contact'
    }
  ];
  gear: Gear[];
  generateGearById(gear: Gear[]){
    const gear_by_id  = {};
    gear.forEach(gearitem => {
        gear_by_id[gearitem.id] = gearitem;
        console.log(gearitem, "here")
    });
    return gear_by_id;
}

@Prop() gearid: string; //comes from route url
@Prop() gearById

componentDidLoad() {
  firestoreDB
                .collection(`/schools/${school_id}/gear`)
                .onSnapshot(snap => {
                    const gearDocs = snap
                        .docs
                        .map(doc => {
                            const gear = doc.data() as Gear;
                            gear.id = doc.id;
                            return gear
                        });
                    console.log('gear', gearDocs);
                    this.gear = gearDocs
                    this.gearById = this.generateGearById(gearDocs)
                        
                })
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

                toggleDarkTheme(prefersDark.matches);
                
                // Listen for changes to the prefers-color-scheme media query
                prefersDark.addListener((mediaQuery) => toggleDarkTheme(mediaQuery.matches));
                
                // Add or remove the "dark" class based on if the media query matches
                function toggleDarkTheme(shouldAdd) {
                  document.body.classList.toggle('dark', shouldAdd);
                }
                 
}

  render() {
    return (

      <ion-app>
        <ion-router useHash={false}>
          <ion-route url="/home" component="gg-home" componentProps={{
              gearById: this.gearById
            }}/>
            <ion-route url="/edit" component="gg-edit-request" componentProps={{
              gearById: this.gearById
            }}/>
          <ion-route url="/gear" component="gg-gear" componentProps={{
              gearById: this.gearById
            }}/>
            <ion-route url="/new-badge" component="gg-new-badge"
            />
          <ion-route url="/requests" component="gg-requests" componentProps={{
              gearById: this.gearById
            }}/>
          <ion-route url="/directory" component="gg-directory" componentProps={{
              gearById: this.gearById
            }}/>
            <ion-route url="/tv" component="gg-tv"/>
          <ion-route url="/profile" component="gg-profile" componentProps={{
              gearById: this.gearById
            }}/>
          <ion-route url="/checkinout" component="gg-checkinout" componentProps={{
              gearById: this.gearById
            }}/>
          <ion-route url="/teacher" component="gg-teacher-view" componentProps={{
              gearById: this.gearById
            }}/>
          <ion-route url="/new-gear" component="gg-new-gear" componentProps={{
              gearById: this.gearById
            }}/>
          <ion-route url="/new-request" component="gg-new-request" componentProps={{
              gearById: this.gearById
            }}/>
          <ion-route url="/profile" component="gg-profile" componentProps={{
              gearById: this.gearById
            }}/>
          <ion-route url="/add-gear" component="gg-add-gear-to-request"componentProps={{
              gearById: this.gearById
            }}/>
          <ion-route url="/auth" component="gg-auth"/>
          <ion-route url="/cal" component="gg-gear-calender"/>
          <ion-route url="/gear-view" component="gg-gear-view"componentProps={{
              gearById: this.gearById
            }}/>
            <ion-route url="/status-popup" component="gg-status-popup"componentProps={{
              gearById: this.gearById
            }}/>
          <ion-route url="gear/:gearid" component="gg-gear-view"componentProps={{
              gearById: this.gearById
            }}/>
            
          <ion-route url="/" component="gg-home"/>
        </ion-router>
        <ion-split-pane contentId="main">
          <ion-menu contentId="main" type="overlay">
            <ion-header>
              <ion-toolbar>
                <ion-title>Menu</ion-title>
              </ion-toolbar>
            </ion-header>
            <ion-content>
              <ion-list>
                {
                  this.appPages.map(page => <ion-menu-toggle auto-hide="false" >
                    <ion-item href={page.url}>
                      <ion-icon slot="start" name={page.icon}></ion-icon>
                      <ion-label>
                        {page.title}
                      </ion-label>
                    </ion-item>
                  </ion-menu-toggle>)
                }
              </ion-list>
             
            </ion-content>
          </ion-menu>
          <ion-nav id="main"></ion-nav>
        </ion-split-pane>
      </ion-app>
    );
  }
}
