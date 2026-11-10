# RJN Assistant Android app

This repository contains the existing web assistant packaged as a native Android
WebView app. The app requests only the permissions needed for microphone,
notifications, and Bluetooth features, then uses a visible microphone
foreground service while a voice session is active.

## Build

Open the repository in Android Studio and run **Build > Build APK(s)**, or run:

```bash
gradle assembleDebug
```

After installing, open the app once and grant the Android permission prompts.
Add **RJN Assistant** from the system Quick Settings tile editor; tapping the
tile starts or stops the foreground session even when the app UI is closed.

Android requires the user to approve permissions and add Quick Settings tiles
manually. The service does not execute arbitrary hidden commands or bypass
Android background-execution restrictions.
