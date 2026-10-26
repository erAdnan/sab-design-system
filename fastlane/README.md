fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

### post_on_slack

```sh
[bundle exec] fastlane post_on_slack
```

Post a release notification to Slack (Incoming Webhook)

----


## iOS

### ios inc_version

```sh
[bundle exec] fastlane ios inc_version
```

Bump iOS build number and sync marketing version from package.json

### ios certificates

```sh
[bundle exec] fastlane ios certificates
```

Fetch certificates and provisioning profiles via Match (readonly by default)

### ios distribute_adhoc

```sh
[bundle exec] fastlane ios distribute_adhoc
```

Ad-hoc IPA via Match (readonly) + gym — Firebase-style distribution example

### ios build_release

```sh
[bundle exec] fastlane ios build_release
```

Build iOS release IPA and upload to Firebase or TestFlight

### ios upload_firebase

```sh
[bundle exec] fastlane ios upload_firebase
```

Upload an existing iOS IPA to Firebase App Distribution

----


## Android

### android inc_version

```sh
[bundle exec] fastlane android inc_version
```

Bump Android versionCode and sync versionName from package.json

### android build_release

```sh
[bundle exec] fastlane android build_release
```

Build Android release APK/AAB and upload to Firebase or Play Store

### android upload_firebase

```sh
[bundle exec] fastlane android upload_firebase
```

Upload an existing Android artifact to Firebase App Distribution

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
