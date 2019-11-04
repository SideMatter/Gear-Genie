import { Component, h,  } from '@stencil/core';
import firebase from 'firebase/app'
declare const firebaseui;

@Component({
  tag: 'gg-auth',
  styleUrl: 'auth.css'
})
export class Auth {
  componentDidLoad() {
   
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    var uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: function (_authResult, _redirectUrl) {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          return true;
        },
        uiShown: function () {
          // The widget is rendered.
          // Hide the loader.
          document.getElementById('loader').style.display = 'none';
        }
      },
      // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
      signInFlow: 'popup',
      signInSuccessUrl: '/home',
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID
      ],
      // Terms of service url.
      tosUrl: '<your-tos-url>',
      // Privacy policy url.
      privacyPolicyUrl: '<your-privacy-policy-url>'
    };

    ui.start('#firebaseui-auth-container', uiConfig);
    
  }



  render() {
    return (

      <div>
        <h1>Welcome to Gear Genie, the greatest app of human kind</h1>
        <div id="firebaseui-auth-container"></div>
        <div id="loader">Loading...</div>
      </div>

    );
  }

}
