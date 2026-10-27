# SAB Design System

`@sab-digital-bank/design-system` is the React Native component library and the Storybook app (`com.sabdesignsystem.sb`). Components, theme, localization, stories, Fastlane, and the iOS/Android Storybook projects live in this repository.

Current version: **0.0.1**.

## Where to change a component

```bash
git clone git@github.com:SABDigitalBank/sab-design-system.git
cd sab-design-system
yarn install:all
```

`yarn install:all` installs Node modules, Ruby gems (Fastlane and CocoaPods), and iOS pods. On Linux it skips pods. Android still needs JDK 17 and the Android SDK installed separately.

Step by step, the same setup is:

```bash
yarn install
yarn bundle:install
./scripts/run-bundle.sh exec bash -c 'cd ios && exec pod install'
```

Native clean commands:

```bash
yarn android:clean
yarn ios:clean
yarn clean:all
```

`yarn ios:clean` reinstalls pods with the same Bundler CocoaPods that `yarn install:all` uses.

| Change | Where |
| --- | --- |
| Component, token, icon, asset | `src/` |
| Theme | `src/context/theme`, `src/assets/styles/theme` |
| Language codes and component copy | `src/localization/` |
| Story | `stories/` |
| Storybook preview | `.storybook/` |
| Device Storybook (Xcode, Gradle, Fastlane) | `ios/`, `android/`, `fastlane/` |

Component code stays inside this package. Theme and `LanguageCodes` are exported from here.

## Test a change immediately

Web Storybook:

```bash
yarn storybook
```

Opens `http://localhost:6006`. Saving a component or a story reloads the browser.

Device Storybook on a simulator or emulator:

```bash
# Terminal 1
yarn start

# Terminal 2
yarn storybook:ios
yarn storybook:android
```

`yarn storybook:ios` uses scheme **SABDS** / **Debug-SB**. `yarn storybook:android` installs `com.sabdesignsystem.sb`.

## Release pipeline

GitHub **Actions → Release → Run workflow**. The form asks for:

| Input | Values |
| --- | --- |
| Version bump | `patch`, `minor`, or `major` |
| Platform | `both`, `android`, `ios`, or `none` (npm only) |
| Channel | `firebase` or `store` |
| Skip distribution | build the binary and still publish npm |

From `0.0.1`, a patch release becomes `0.0.2`, a minor release `0.1.0`, and a major release `1.0.0`.

After the selected Storybook builds succeed, the workflow:

1. Commits the new version to `main` (`chore: release vX.Y.Z`)
2. Pushes tag `vX.Y.Z`
3. Publishes `@sab-digital-bank/design-system` to npm

A failed device build does not commit, tag, or publish.

| Bump | When |
| --- | --- |
| patch | Fix that keeps the same props |
| minor | New component or optional prop |
| major | Removed or renamed prop, or a visual change callers must adopt |

The package name is `@sab-digital-bank/design-system` with `"access": "restricted"`. The npm organization is `sab-digital-bank`. `.npmrc` is gitignored. Copy `.npmrc.example` only for a local dry-run.

`npm publish` ships `src/`, `stories/`, and `examples/`. The native app, Fastlane, and workflows stay in git.

## Storybook device builds

Fastlane in this repo builds the Storybook app. iOS signing uses Fastlane Match and the same certificate repo as the demo app: [SABDigitalBank/certificates](https://github.com/SABDigitalBank/certificates). Match is readonly in CI. The Storybook bundle id is `com.sabdesignsystem.sb`.

Local release build:

```bash
cp .env.storybook.example .env.storybook
cp .env.storybook.prod.example .env.storybook.prod
yarn fastlane:storybook:android:apk
yarn fastlane:storybook:ios:ipa
```

Store builds use the `.prod` env files (`yarn fastlane:storybook:android:aab:store`, `yarn fastlane:storybook:ios:ipa:store`).

### Secrets

Set these on `SABDigitalBank/sab-design-system`. Do not commit them.

| Secret | Used for |
| --- | --- |
| `ENV_STORYBOOK` | Firebase env file contents |
| `ENV_STORYBOOK_PROD` | Store env file contents |
| `FIREBASE_SERVICE_ACCOUNT_JSON` | Firebase App Distribution |
| `ANDROID_KEYSTORE_BASE64` | Android release signing |
| `PLAY_STORE_JSON` | Play Store upload |
| `ASC_API_KEY_P8` | App Store Connect API key |
| `MATCH_PASSWORD` | Decrypt `certificates.git` |
| `MATCH_GIT_BASIC_AUTHORIZATION` | Clone `certificates.git` |
| `MATCH_GIT_URL` | Optional override; default is `https://github.com/SABDigitalBank/certificates.git` |
| `MATCH_GIT_BRANCH` | Optional; default `main` |
| `NPM_TOKEN` | npm Automation token |
| `NPM_REGISTRY` | Optional; default `https://registry.npmjs.org` |
| `SLACK_WEBHOOK_URL` | Optional Fastlane notification |

The self-hosted macOS runner label `self-hosted` must be available to this repository. It needs Homebrew Ruby 3+, JDK 17, Android SDK, and Xcode 26+.

## How the demo app uses this package

Until the first npm publish, the demo app depends on the folder:

```json
"@sab-digital-bank/design-system": "file:./design-system"
```

After a release, set that dependency to the published version, for example `"@sab-digital-bank/design-system": "0.0.2"`, and reinstall.
