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
| Figma docs in Storybook (export, WebP, catalog) | [`stories/docs/README.md`](stories/docs/README.md) |
| Storybook preview | `.storybook/` |
| Device Storybook (Xcode, Gradle, Fastlane) | `ios/`, `android/`, `fastlane/` |

Component code stays inside this package. Theme and `LanguageCodes` are exported from here.

## Test a change immediately

Web Storybook:

```bash
yarn storybook
```

Opens `http://localhost:6006`. Saving a component or a story reloads the browser.

To add **Figma documentation pages** (exports, WebP conversion, `FigmaDocPage` catalog/stories, `main.js` / `preview.jsx` wiring): see [`stories/docs/README.md`](stories/docs/README.md).

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
| Platform | `both` (Android + iOS + **web**), `android`, `ios`, `web`, or `npm` |
| Publish npm only | checkbox. Skip device and web builds. Compile the package and publish. |
| Channel | `firebase` or `store` (device App Distribution / stores) |
| Skip distribution | skip device upload; web builds Storybook but does not upload Hosting |

Check **Publish npm only**, or set Platform to `npm`. That runs one job: install, compile, write the release notes, and publish. It does not build device or web Storybook. Channel does not matter for that run.

**Web Storybook** is hosted on Firebase Hosting (`sab-digital-banking-ux`). Locally: `yarn deploy:storybook:web`. Docs: [`firebase/README.md`](firebase/README.md). Deploy without a version bump: **Actions → Deploy Storybook web**.

From `0.0.1`, a patch release becomes `0.0.2`, a minor release `0.1.0`, and a major release `1.0.0`.

After the selected jobs succeed, the workflow:

1. Compiles the package with `yarn build`. A failed compile does not tag or publish.
2. Writes release notes from commits and merged pull requests since the previous `v*` tag.
3. Commits the version and the notes to `main` (`chore: release vX.Y.Z`)
4. Pushes tag `vX.Y.Z` and creates the GitHub Release
5. Publishes `@sab-digital-bank/design-system` to npm

A failed device build does not commit, tag, or publish. With **Publish npm only** there is no device build.

| Bump | When |
| --- | --- |
| patch | Fix that keeps the same props |
| minor | New component or optional prop |
| major | Removed or renamed prop, or a visual change callers must adopt |

The package name is `@sab-digital-bank/design-system` with `"access": "restricted"`. The npm organization is `sab-digital-bank`. `.npmrc` is gitignored. Copy `.npmrc.example` only for a local dry-run.

`npm publish` ships `src/`, `stories/`, `examples/`, and `CHANGELOG.md`. The native app, Fastlane, and workflows stay in git.

## Releases

Each publish lists the commits and merged pull requests since the previous `v*` tag. The npm page below shows the latest version. Older versions stay in `CHANGELOG.md`, which also ships in the package, and on the matching GitHub Release.

<!-- release-notes:start -->
## [0.0.1] - 2026-10-26

### Changes
- Initial import of the SAB design system. ([83e352c](https://github.com/SABDigitalBank/sab-design-system/commit/83e352c))
- Storybook device builds and npm publishing live in this repository. ([b585480](https://github.com/SABDigitalBank/sab-design-system/commit/b585480))
<!-- release-notes:end -->

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
| `FIREBASE_SERVICE_ACCOUNT_JSON` | Firebase App Distribution and Firebase Hosting (needs Hosting Admin) |
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

## Install in a React Native app

`@sab-digital-bank/design-system` is published as a private package: [npmjs.com/package/@sab-digital-bank/design-system](https://www.npmjs.com/package/@sab-digital-bank/design-system). The first published version is `0.0.1`. `npm publish` ships `src/`, `stories/`, `examples/`, and `CHANGELOG.md`. The app compiles that source. The Storybook iOS and Android projects stay in this git repo and are not inside the npm tarball.

### 1. Authenticate

In the app repo, copy `.npmrc.example` to `.npmrc`:

```
@sab-digital-bank:registry=https://registry.npmjs.org/
//registry.npmjs.org/:_authToken=${NPM_TOKEN}
```

`NPM_TOKEN` is an npm Automation token that can read this package. Do not commit `.npmrc`.

```bash
export NPM_TOKEN=your_read_token
yarn add @sab-digital-bank/design-system@0.0.1
```

After a later release, change `0.0.1` to that version and reinstall.

### 2. Packages the app must provide

`0.0.1` lists React Native libraries as devDependencies of this repo, so `yarn add` does not install them into the app. The app needs one copy of each library the components import:

| Package | Why |
| --- | --- |
| `react`, `react-native` | Host runtime |
| `react-native-svg` and `react-native-svg-transformer` | Icon and illustration `.svg` imports |
| `react-native-reanimated`, `react-native-gesture-handler`, `react-native-screens`, `react-native-safe-area-context` | Motion, gestures, screens |
| `react-native-linear-gradient`, `@react-native-community/blur`, `lottie-react-native` | Gradients, blur, stories |
| `@gorhom/bottom-sheet`, `@react-native-async-storage/async-storage` | Sheets and saved language |
| `i18next`, `react-i18next` | Component copy |

Metro must compile SVG imports. Remove `svg` from `assetExts`, add it to `sourceExts`, and set `babelTransformerPath` to `react-native-svg-transformer`.

Fonts ship inside the package. Point the app at them and rebuild the native projects:

```js
module.exports = {
  assets: ["./node_modules/@sab-digital-bank/design-system/src/assets/fonts/"],
};
```

### 3. Import from the package

```ts
import { Button } from "@sab-digital-bank/design-system/components/button/Button";
import { useTheme } from "@sab-digital-bank/design-system/context/theme/themeContext";
import { spacingS } from "@sab-digital-bank/design-system/assets/styles/constants/size";
```

If Metro does not apply the package `exports` map, resolve `@sab-digital-bank/design-system` and its subpaths to `node_modules/@sab-digital-bank/design-system/src`. The demo app does that in `metro.config.js`. Do not point the app at a `file:` checkout of this repo.
