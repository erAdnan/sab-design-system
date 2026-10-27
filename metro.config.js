require("./scripts/load-app-env");

const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
const path = require("path");
const withStorybook = require("@storybook/react-native/metro/withStorybook");

const defaultConfig = getDefaultConfig(__dirname);
const src = path.resolve(__dirname, "src");

const {
  resolver: { assetExts, sourceExts },
} = defaultConfig;

function resolveDesignSystemRequest(context, moduleName, platform) {
  if (
    moduleName !== "@sab-digital-bank/design-system" &&
    !moduleName.startsWith("@sab-digital-bank/design-system/")
  ) {
    return null;
  }

  const subpath =
    moduleName === "@sab-digital-bank/design-system"
      ? "index"
      : moduleName.slice("@sab-digital-bank/design-system/".length);

  const target = path.resolve(src, subpath).split(path.sep).join("/");
  return context.resolveRequest(context, target, platform);
}

const config = {
  watchFolders: [src],
  transformer: {
    unstable_allowRequireContext: true,
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  },
  resolver: {
    unstable_enablePackageExports: true,
    unstable_conditionNames: ["browser", "require", "react-native"],
    assetExts: assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...sourceExts, "svg", "js", "json", "ts", "tsx"],
    extraNodeModules: {
      "@sab-digital-bank/design-system": src,
    },
    resolveRequest: (context, moduleName, platform) => {
      const designSystemResolved = resolveDesignSystemRequest(
        context,
        moduleName,
        platform
      );
      if (designSystemResolved) {
        return designSystemResolved;
      }
      return context.resolveRequest(context, moduleName, platform);
    },
  },
};

const finalConfig = mergeConfig(defaultConfig, config);

module.exports = withStorybook(finalConfig, {
  enabled: true,
  configPath: path.resolve(__dirname, "./.rnstorybook"),
  useJs: true,
  assets: ["./src/assets/fonts"],
});
