# SAB Design System

`@sab/design-system` is the React Native component library for SAB. This repository is the source of truth for components, foundations, and Storybook. The demo app in `SAB_Storybook_cli` installs this package and does not own Storybook releases.

## Where to change a component

Clone this repository and edit it here. Do not edit a copied `design-system/` folder inside the demo app and expect that copy to publish.

```bash
git clone git@github.com:SABDigitalBank/sab-design-system.git
cd sab-design-system
yarn install
```

| Change | Where |
| --- | --- |
| Component, token, theme, asset | `src/` |
| Story for that component | `stories/` or `src/**/*.stories.tsx` |
| Web Storybook preview | `.storybook/` |
| Device Storybook shell (Xcode, Gradle, Fastlane) | demo app `DIGITALBANKINGUX/SAB_Storybook_cli` |

Component files must not import the demo app. Language codes live in `src/localization/languages.ts`.

Stories under `stories/base-layouts/` render demo-app catalog screens. They stay on the device Storybook that the demo app hosts. The web Storybook in this repo loads component and foundation stories only.

## Test a change immediately

Web Storybook (fastest check for layout and controls):

```bash
yarn storybook
```

Opens `http://localhost:6006`. Leave it running. Saving a component or a story reloads the browser.

Device Storybook (the Firebase / store binary) still builds from the demo app, because the iOS and Android projects, Match certificates, and Firebase apps live there. From a demo-app checkout that contains this package (today: `"@sab/design-system": "file:./design-system"`):

```bash
yarn storybook:ios
yarn storybook:android
```

While the package is linked with `file:`, saving files in this repo updates the next device bundle. After you publish to npm, point the demo app at the new version (below) and reinstall before a device check of that version.

## Versioning

Semantic versions, starting at `0.1.0`:

| Bump | When |
| --- | --- |
| patch | Fix that does not change props |
| minor | New component or optional prop |
| major | Removed or renamed prop, or a visual change callers must adopt |

Tags match the version: `v0.1.1`. The publish workflow creates the commit and the tag. Do not publish from a laptop.

## Publish to npm

1. In GitHub: **Actions → Publish npm package → Run workflow**.
2. Choose `patch`, `minor`, or `major`, or set an exact version such as `1.2.0`.
3. The workflow needs the `NPM_TOKEN` secret (Automation token, not a password in the repo).
4. Optional secret `NPM_REGISTRY` when the registry is not `https://registry.npmjs.org`.

The package name is `@sab/design-system` with `"access": "restricted"`. npmjs must own the `@sab` scope. GitHub Packages only accepts a scope that matches the org (`@sabdigitalbank/...`). Use npmjs for this name, or rename the package before pointing `NPM_REGISTRY` at GitHub Packages.

`.npmrc` is gitignored. Copy `.npmrc.example` only for a local publish dry-run, and do not commit it.

## How the demo app consumes it

Use the **npm package**, not a git submodule.

A submodule would put a second Git history inside the demo app. The demo app's self-hosted checkout deletes `.git` before fetching, which drops submodule state. A versioned package gives the demo a lockfile entry and a release the Storybook workflow can also build.

Until the first `v0.1.0` is on the registry, the demo app keeps:

```json
"@sab/design-system": "file:./design-system"
```

After publish, change that line to the released version and reinstall:

```json
"@sab/design-system": "0.1.0"
```

Add this to the demo app `.npmrc` (do not commit the token):

```
@sab:registry=https://registry.npmjs.org/
//registry.npmjs.org/:_authToken=${NPM_TOKEN}
```

## Storybook device builds (Firebase and stores)

**Actions → Storybook release → Run workflow.**

| Input | Meaning |
| --- | --- |
| platform | `android`, `ios`, or `both` |
| channel | `firebase` (APK / ad-hoc IPA) or `store` |
| skip_distribution | Build the binary and skip upload |
| host_repository | Demo app that owns the native projects. Default `DIGITALBANKINGUX/SAB_Storybook_cli` |
| host_ref | Branch or tag of that app |

The workflow checks out this repo and the demo app, copies this package over the demo app's `design-system/` folder, then runs the existing Storybook fastlane lanes (`sb` / `SABDS`, bundle id `com.sabdesignsystem.sb`).

### Secrets on this repository

Copy these from the demo app's GitHub secrets. They stay in GitHub settings. The examples `.env.storybook.example` and `.env.storybook.prod.example` show the key names only.

| Secret | Used for |
| --- | --- |
| `APP_REPO_TOKEN` | Read the private demo app (different GitHub org) |
| `ENV_STORYBOOK` | Full contents of the Firebase env file |
| `ENV_STORYBOOK_PROD` | Full contents of the store env file |
| `FIREBASE_SERVICE_ACCOUNT_JSON` | Firebase App Distribution |
| `ANDROID_KEYSTORE_BASE64` | Android release signing |
| `PLAY_STORE_JSON` | Play upload when channel is `store` |
| `ASC_API_KEY_P8` | App Store Connect API key |
| `MATCH_PASSWORD` | Match certificate repo |
| `MATCH_GIT_BASIC_AUTHORIZATION` | Clone the certificate repo |
| `MATCH_GIT_URL` | Optional. Default is the SAB certificates repo |
| `MATCH_GIT_BRANCH` | Optional. Default `main` |
| `NPM_TOKEN` | npm publish |
| `NPM_REGISTRY` | Optional. Default npmjs |
| `SLACK_WEBHOOK_URL` | Optional Fastlane notification |

The self-hosted macOS runner (`runs-on: self-hosted`) must be registered on `SABDigitalBank/sab-design-system` as well as the demo app. npm publish uses GitHub-hosted `ubuntu-latest` and does not need that Mac.

## What is published

`npm publish` ships `src/`, `stories/`, and `examples/` only. Workflows, `.storybook`, and env examples stay in Git.
