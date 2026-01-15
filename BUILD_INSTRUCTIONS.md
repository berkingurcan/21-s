# Build Instructions for 21-S App

This document outlines the steps to clean your development environment and generate an Android APK for the 21-S application.

## Prerequisites

Ensure you have the EAS CLI installed and are logged in:

```bash
npm install -g eas-cli
eas login
```

## 1. Clean Build Environment

If you are facing issues or want to ensure a completely fresh build, follow these steps to clear caches and regenerate native files.

### Clear Metro Bundler Cache
Clear the local bundler cache to resolve stale JavaScript issues:

```bash
npx expo start --clear
```

### Clean Native Directories
If you have generated native code (the `android` folder) and want to reset it:

> **Warning:** This will delete the `android` and `ios` directories. Ensure any custom native code changes are committed or backed up.

```bash
# Remove existing native directories
rm -rf android ios

# Regenerate native projects
npx expo prebuild
```

## 2. Generate Android APK (Locally)

To generate the APK file directly on your machine (without uploading to EAS servers), add the `--local` flag.

### Option A: EAS Local Build (Recommended)
This uses your local environment to run the build process defined in `eas.json`.

```bash
eas build --platform android --profile preview --local
```

**Output:**
- The command will generate an `.apk` file in your project directory (or ask you where to save it) upon completion.

### Option B: Native Gradle Build (Debug APK)
Since you have the `android/` directory, you can use the native Gradle wrapper to build a debug APK instantly.

```bash
cd android
./gradlew assembleDebug
```

**Output:**
- The APK will be located at:  
  `android/app/build/outputs/apk/debug/app-debug.apk`

### Notes on the `preview` profile:
- This profile is configured with `"distribution": "internal"`, which typically generates an `.apk` file for Android.
