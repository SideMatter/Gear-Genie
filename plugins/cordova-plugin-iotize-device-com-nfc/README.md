# IoTize PhoneGap NFC iPhone XR / XS support

This is a fork from [PhoneGap NFC Plugin 1.0.3](https://github.com/chariotsolutions/phonegap-nfc)

## Ionic support

You can use this plugin with the ionic-native NFC provider:
```bash
npm i @ionic-native/nfc
```
Note: the iOS method `beginNDEFSession` is not referenced in `@ionic-native/nfc`. In order to call this method within an Ionic project, you need to declare it within your typescript file:

```typescript
declare var nfc: Any;

nfc.beginNDEFSession(success, failure);
```
## IoTize NFC Com Protocol

The current plugin comes with a protocol that allows to use NFC ISO15693 compatible devices to communicate with IoTize products.

see [Communication protocol](http://developer.iotize.com/content/device-api/communication-protocol/) for more informations


## Edit AndroidManifest using config.xml

Using cordova config-file node, you may edit AndroidManifest.xml file when adding the android platform. Copy the following snippet and add it inside the ```<platform name="android">``` node of your project's config.xml file: 

```xml
<config-file parent="/manifest/application/activity[@android:name='MainActivity']" target="app/src/main/AndroidManifest.xml" xmlns:android="http://schemas.android.com/apk/res/android">
    <intent-filter>
        <action android:name="android.nfc.action.NDEF_DISCOVERED" />
        <category android:name="android.intent.category.DEFAULT" />
        <data android:mimeType="application/YOUR_APPLICATION_PACKAGE" />
    </intent-filter>
</config-file>
```

Replace YOUR_APPLICATION_PACKAGE according to your application and IoTize tap configuration.

IoTize Cordova NFC Plugin
==========================

The NFC plugin allows you to read and communicate with IoTize NFC Taps.

This plugin uses NDEF (NFC Data Exchange Format) and ISO15693 custom commands

Supported Platforms
-------------------
* Android
* [iOS 11](#ios-notes)

## Contents

* [Installing](#installing)
* [NFC](#nfc)
* [NDEF](#ndef)
  - [NdefMessage](#ndefmessage)
  - [NdefRecord](#ndefrecord)
* [Events](#events)
* [Platform Differences](#platform-differences)
* [Launching Application when Scanning a Tag](#launching-your-android-application-when-scanning-a-tag)
* [Testing](#testing)
* [License](#license)

# Installing

### Cordova

    $ cordova plugin add @iotize/device-com-nfc.cordova

## iOS Notes

Reading NFC NDEF tags is supported on iPhone 7 and iPhone 7 Plus running iOS 11. To enable your app to detect NFC tags, the plugin adds the Near Field Communication Tag Reading capability in your Xcode project. You must build your application with XCode 9+. See the [Apple Documentation](http://help.apple.com/xcode/mac/current/#/dev88ff319e7) for more info.

Use [nfc.addNdefListener](#nfcaddndeflistener) to read NDEF NFC tags with iOS. Unfortunately, iOS also requires you to begin a session before scanning NFC tag. The JavaScript API contains two iOS specific function [nfc.beginNDEFSession](#nfcgbeginndefsession) and [nfc.invalidateNDEFSession](#nfcinvalidatendefsession)

You must call [nfc.beginNDEFSession](#nfcgbeginndefsession) before every scan. 

### *iOS 13 Beta*

With iOS 13, Apple opened its NFC API and allowed communication with ISO15693 tags.

 Use [nfc.connect](#nfcconnect) to begin a NFC communication session in your iOS app. you may then use the [nfc.transceive](#nfctransceive) method to exchange, and then close the session with [nfc.close](#nfcclose)

# NFC

> The nfc object provides access to the device's NFC sensor.

## Methods

- [nfc.addNdefListener](#nfcaddndeflistener)
- [nfc.addMimeTypeListener](#nfcaddmimetypelistener)
- [nfc.enabled](#nfcenabled)
- [nfc.showSettings](#nfcshowsettings)
- [nfc.beginNDEFSession](#beginndefsession)
- [nfc.invalidateNDEFSession](#nfcinvalidatendefsession)

## Tag Technology Functions

- [nfc.connect](#nfcconnect)
- [nfc.transceive](#nfctransceive)
- [nfc.close](#nfcclose)

## nfc.addNdefListener

Registers an event listener for any NDEF tag.

    nfc.addNdefListener(callback, [onSuccess], [onFailure]);

### Parameters

- __callback__: The callback that is called when an NDEF tag is read.
- __onSuccess__: (Optional) The callback that is called when the listener is added.
- __onFailure__: (Optional) The callback that is called if there was an error.

### Description

Function `nfc.addNdefListener` registers the callback for ndef events.

A ndef event is fired when a NDEF tag is read.

For BlackBerry 10, you must configure the type of tags your application will read with an [invoke-target in config.xml](#blackberry-10-invoke-target).

On Android registered [mimeTypeListeners](#nfcaddmimetypelistener) takes precedence over this more generic NDEF listener.

On iOS you must call [beginNDEFSession](#nfcbeginndefsession) before scanning a NDEF tag.

### Supported Platforms

- Android
- iOS

## nfc.removeNdefListener

Removes the previously registered event listener for NDEF tags added via `nfc.addNdefListener`.

    nfc.removeNdefListener(callback, [onSuccess], [onFailure]);

Removing listeners is not recommended. Instead, consider that your callback can ignore messages you no longer need.

### Parameters

- __callback__: The previously registered callback.
- __onSuccess__: (Optional) The callback that is called when the listener is successfully removed.
- __onFailure__: (Optional) The callback that is called if there was an error during removal.

### Supported Platforms

- Android
- iOS

## nfc.addMimeTypeListener

Registers an event listener for NDEF tags matching a specified MIME type.

    nfc.addMimeTypeListener(mimeType, callback, [onSuccess], [onFailure]);

### Parameters

- __mimeType__: The MIME type to filter for messages.
- __callback__: The callback that is called when an NDEF tag matching the MIME type is read.
- __onSuccess__: (Optional) The callback that is called when the listener is added.
- __onFailure__: (Optional) The callback that is called if there was an error.

### Description

Function `nfc.addMimeTypeListener` registers the callback for ndef-mime events.

A ndef-mime event occurs when a `Ndef.TNF_MIME_MEDIA` tag is read and matches the specified MIME type.

This function can be called multiple times to register different MIME types. You should use the *same* handler for all MIME messages.

    nfc.addMimeTypeListener("text/json", *onNfc*, success, failure);
    nfc.addMimeTypeListener("text/demo", *onNfc*, success, failure);

On Android, MIME types for filtering should always be lower case. (See [IntentFilter.addDataType()](http://developer.android.com/reference/android/content/IntentFilter.html#addDataType\(java.lang.String\)))

### Supported Platforms

- Android

## nfc.removeMimeTypeListener

Removes the previously registered event listener added via `nfc.addMimeTypeListener`.

    nfc.removeMimeTypeListener(mimeType, callback, [onSuccess], [onFailure]);

Removing listeners is not recommended. Instead, consider that your callback can ignore messages you no longer need.

### Parameters

- __mimeType__: The MIME type to filter for messages.
- __callback__: The previously registered callback.
- __onSuccess__: (Optional) The callback that is called when the listener is successfully removed.
- __onFailure__: (Optional) The callback that is called if there was an error during removal.

### Supported Platforms

- Android


## nfc.showSettings

Show the NFC settings on the device.

    nfc.showSettings(success, failure);

### Description

Function `showSettings` opens the NFC settings for the operating system.

### Parameters

- __success__: Success callback function [optional]
- __failure__: Error callback function, invoked when error occurs. [optional]

### Quick Example

    nfc.showSettings();

### Supported Platforms

- Android

## nfc.enabled

Check if NFC is available and enabled on this device.

nfc.enabled(onSuccess, onFailure);

### Parameters

- __onSuccess__: The callback that is called when NFC is enabled.
- __onFailure__: The callback that is called when NFC is disabled or missing.

### Description

Function `nfc.enabled` explicitly checks to see if the phone has NFC and if NFC is enabled. If
everything is OK, the success callback is called. If there is a problem, the failure callback
will be called with a reason code.

The reason will be **NO_NFC** if the device doesn't support NFC and **NFC_DISABLED** if the user has disabled NFC.

Note: that on Android the NFC status is checked before every API call **NO_NFC** or **NFC_DISABLED** can be returned in **any** failure function.

### Supported Platforms

- Android
- iOS

## nfc.beginNDEFSession

iOS requires you to begin a session before scanning a NFC tag.

    nfc.beginNDEFSession(success, failure);

### Description

Function `beginNDEFSession` starts the [NFCNDEFReaderSession](https://developer.apple.com/documentation/corenfc/nfcndefreadersession) allowing iOS to scan NFC tags.

If the session is closed by the user, it will trigger the Error callback (if it exists)

### Parameters

- __success__: Success callback function called when the session begins [optional]
- __failure__: Error callback function, invoked when error occurs. [optional]

### Quick Example

    nfc.beginNDEFSession();

### Supported Platforms

- iOS

## nfc.invalidateSession

Invalidate the NFC NDEF session.

    nfc.invalidateSession(success, failure);

### Description

Function `invalidateSession` stops the [NFCNDEFReaderSession](https://developer.apple.com/documentation/corenfc/nfcndefreadersession) returning control to your app.

### Parameters

- __success__: Success callback function called when the session in invalidated [optional]
- __failure__: Error callback function, invoked when error occurs. [optional]

### Quick Example

    nfc.invalidateSession();

### Supported Platforms

- iOS

# Tag Technology Functions

This plugin is built to communicate with IoTize tags. See the original plugin if you need a more complete use of the NFC

[PhoneGap NFC Plugin 1.0.3](https://github.com/chariotsolutions/phonegap-nfc)

## nfc.connect

Connect to the tag and enable I/O operations to the tag from this TagTechnology object.

```typescript
//Android
nfc.connect(tech);

nfc.connect(tech, timeout);

//iOS
nfc.connect()
````

### Description

Function `connect` enables I/O operations to the tag from this TagTechnology object. `nfc.connect` should be called after receiving a nfcEvent from the `addNdefListener`. Only one TagTechnology object can be connected to a Tag at a time.

See Android's [TagTechnology.connect()](https://developer.android.com/reference/android/nfc/tech/TagTechnology.html#connect()) for more info.

On iOS, `connect` starts a NFC Session, and is resolved when the device is connected to a Tag.

### Parameters (Android only)

- __tech__: The tag technology e.g. android.nfc.tech.IsoDep
- __timeout__: The transceive(byte[]) timeout in milliseconds [optional]

### Returns

 - Promise when the connection is successful

### Quick Example
```typescript
nfc.addTagDiscoveredListener(function(nfcEvent) {
    nfc.connect('android.nfc.tech.IsoDep', 500).then(
        () => console.log('connected to', nfc.bytesToHexString(nfcEvent.tag.id)),
        (error) => console.log('connection failed', error)
    );
})
```
### Supported Platforms

- Android
- iOS 13 (beta)

## nfc.transceive

Send raw command to the tag and receive the response.

    nfc.transceive(data);

### Description

Function `transceive` sends raw commands to the tag and receives the response. `nfc.connect` must be called before calling `transceive`. Data passed to transceive can be a hex string representation of bytes or an ArrayBuffer. The response is returned as an ArrayBuffer in the promise. 

See Android's documentation [IsoDep.transceive()](https://developer.android.com/reference/android/nfc/tech/IsoDep.html#transceive(byte[])), [NfcV.transceive()](https://developer.android.com/reference/android/nfc/tech/NfcV.html#transceive(byte[])), [MifareUltralight.transceive()](https://developer.android.com/reference/android/nfc/tech/MifareUltralight.html#transceive(byte[])) for more info.

### Parameters

- __data__: a string of hex data or an ArrayBuffer

### Returns

 - Promise with the response data as an ArrayBuffer

### Quick Example

    // Promise style
    nfc.transceive('90 5A 00 00 03 AA AA AA 00').then(
        response => console.log(util.arrayBufferToString(response)),
        error => console.log('Error selecting DESFire application')
    )

    // async await
    const response = await nfc.transceive('90 5A 00 00 03 AA AA AA 00');
    console.log('response =',util.arrayBufferToString(response));

### Supported Platforms

- Android
- iOS 13 (beta)

## nfc.close

Close TagTechnology connection.

    nfc.close();

### Description

Function `close` disabled I/O operations to the tag from this TagTechnology object, and releases resources.

See Android's [TagTechnology.close()](https://developer.android.com/reference/android/nfc/tech/TagTechnology.html#close()) for more info.

### Parameters

 - none

### Returns

 - Promise when the connection is successfully closed

### Quick Example

    nfc.transceive().then(
        () => console.log('connection closed'),
        (error) => console.log('error closing connection', error);
    )

### Supported Platforms

- Android
- iOS 13 (beta)

# NDEF

> The `ndef` object provides NDEF constants, functions for creating NdefRecords, and functions for converting data.
> See [android.nfc.NdefRecord](http://developer.android.com/reference/android/nfc/NdefRecord.html) for documentation about constants

## NdefMessage

Represents an NDEF (NFC Data Exchange Format) data message that contains one or more NdefRecords.
This plugin uses an array of NdefRecords to represent an NdefMessage.

## NdefRecord

Represents a logical (unchunked) NDEF (NFC Data Exchange Format) record.

### Properties

- __tnf__: 3-bit TNF (Type Name Format) - use one of the TNF_* constants
- __type__: byte array, containing zero to 255 bytes, must not be null
- __id__: byte array, containing zero to 255 bytes, must not be null
- __payload__: byte array, containing zero to (2 ** 32 - 1) bytes, must not be null

The `ndef` object has a function for creating NdefRecords

    var type = "text/pg",
        id = [],
        payload = nfc.stringToBytes("Hello World"),
        record = ndef.record(ndef.TNF_MIME_MEDIA, type, id, payload);

There are also helper functions for some types of records

Create a URI record

    var record = ndef.uriRecord("http://chariotsolutions.com");

Create a plain text record

    var record = ndef.textRecord("Plain text message");

Create a mime type record

    var mimeType = "text/pg",
        payload = "Hello Phongap",
        record = ndef.mimeMediaRecord(mimeType, nfc.stringToBytes(payload));

Create an Empty record

    var record = ndef.emptyRecord();

Create an Android Application Record (AAR)

    var record = ndef.androidApplicationRecord('com.example');

See `ndef.record`, `ndef.textRecord`, `ndef.mimeMediaRecord`, and `ndef.uriRecord`.

The Ndef object has functions to convert some data types to and from byte arrays.

See the [phonegap-nfc.js](https://github.com/chariotsolutions/phonegap-nfc/blob/master/www/phonegap-nfc.js) source for more documentation.

# Events

Events are fired when NFC tags are read.  Listeners are added by registering callback functions with the `nfc` object.  For example ` nfc.addNdefListener(myNfcListener, win, fail);`

## NfcEvent

### Properties

- __type__: event type
- __tag__: Ndef tag

### Types

- ndef-mime
- ndef

The tag contents are platform dependent.

`id` and `techTypes` may be included when scanning a tag on Android.

Assuming the following NDEF message is written to a tag, it will produce the following events when read.

    var ndefMessage = [
        ndef.createMimeRecord('text/pg', 'Hello PhoneGap')
    ];

#### Sample Event on Android

    {
        type: 'ndef',
        tag: {
            "isWritable": true,
            "id": [4, 96, 117, 74, -17, 34, -128],
            "techTypes": ["android.nfc.tech.IsoDep", "android.nfc.tech.NfcA", "android.nfc.tech.Ndef"],
            "type": "NFC Forum Type 4",
            "canMakeReadOnly": false,
            "maxSize": 2046,
            "ndefMessage": [{
                "id": [],
                "type": [116, 101, 120, 116, 47, 112, 103],
                "payload": [72, 101, 108, 108, 111, 32, 80, 104, 111, 110, 101, 71, 97, 112],
                "tnf": 2
            }]
        }
    }

#### Sample Event on iOS

    {
        type: 'ndef',
        tag: {
            "ndefMessage": [{
                "tnf": 2,
                "type": [116, 101, 120, 116, 47, 112, 103],
                "id": [],
                "payload": [72, 101, 108, 108, 111, 32, 80, 104, 111, 110, 101, 71, 97, 112]
            }]
        }
    }

## Getting Details about Events

The raw contents of the scanned tags are written to the log before the event is fired.  Use `adb logcat` on Android

You can also log the tag contents in your event handlers.  `console.log(JSON.stringify(nfcEvent.tag))`  Note that you want to stringify the tag not the event to avoid a circular reference.

# Platform Differences

## Multiple Listeners

Multiple listeners can be registered in JavaScript. e.g. addNdefListener, addTagDiscoveredListener, addMimeTypeListener.

On Android, only the most specific event will fire.  If a Mime Media Tag is scanned, only the addMimeTypeListener callback is called and not the callback defined in addNdefListener. You can use the same event handler for multiple listeners.

On iOS, events are fired as NDEF ones. If the application has been launched with a NFC Tag, the scanned NDEF will be fired as soon as the addNdefListener has been called

# Launching your Application when Scanning a Tag

## Android

On Android, intents can be used to launch your application when a NFC tag is read.  This is optional and configured in AndroidManifest.xml.

    <intent-filter>
      <action android:name="android.nfc.action.NDEF_DISCOVERED" />
      <data android:mimeType="text/pg" />
      <category android:name="android.intent.category.DEFAULT" />
    </intent-filter>

Note: `data android:mimeType="text/pg"` should match the data type you specified in JavaScript

We have found it necessary to add `android:noHistory="true"` to the activity element so that scanning a tag launches the application after the user has pressed the home button.

See the Android documentation for more information about [filtering for NFC intents](http://developer.android.com/guide/topics/connectivity/nfc/nfc.html#ndef-disc).

## iOS:

With the proper configuration, it is now possible to launch a phoneGap / cordova app by reading a NFC NDEF Tag. 

When a tag is detected, a notification appears and asks you to open the linked app. It then opens the app (if it is not open yet) and gives the NDEFMessage delivered by the tag.

You don't have to start a session anymore (cf [iOS notes](#iOS-Notes)), but you need to accept the notification in order to retrieve the tag's content.

This feature is available on iPhone XR / XS / XS Max. earlier devices do not support background tag reading.

You will need to turn on *Associated Domains* and *Near Field Communication Tag Reading* capabilities in your Xcode project, support universal links and add the website linked to the app as an *Associated Domain* with the following scheme:

    applinks:www.example.com

Tag delivery is then handled by the plugin.

Check out the official documentation for more precise informations.

- [Adding support for background tag reading](https://developer.apple.com/documentation/corenfc/adding_support_for_background_tag_reading) 

- [Support Universal Links](https://developer.apple.com/library/archive/documentation/General/Conceptual/AppSearch/UniversalLinks.html)

Testing
=======

Tests require the [Cordova Plugin Test Framework](https://github.com/apache/cordova-plugin-test-framework)

Create a new project

    git clone https://github.com/chariotsolutions/phonegap-nfc
    cordova create nfc-test com.example.nfc.test NfcTest
    cd nfc-test
    cordova platform add android
    cordova plugin add ../phonegap-nfc
    cordova plugin add ../phonegap-nfc/tests
    cordova plugin add https://github.com/apache/cordova-plugin-test-framework.git

Change the start page in `config.xml`

    <content src="cdvtests/index.html" />

Run the app on your phone

    cordova run

License
================

## IoTize SAS

Copyright 2019 IoTize SAS

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Chariot Solutions

The MIT License

Copyright (c) 2011-2017 Chariot Solutions

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
