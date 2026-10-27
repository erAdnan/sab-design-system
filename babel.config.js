require("./scripts/load-app-env");

module.exports = function (api) {
  api.cache.using(() => process.env.ENVFILE || ".env");

  const envFile = process.env.ENVFILE || ".env";

  return {
    presets: ["module:@react-native/babel-preset"],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: envFile,
          allowlist: ["MOCKS_ENABLED"],
          safe: false,
          allowUndefined: true,
          verbose: false,
        },
      ],
      [
        "module-resolver",
        {
          root: ["."],
          extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
          alias: {
            "@sab-digital-bank/design-system": "./src",
          },
        },
      ],
      "@babel/plugin-transform-export-namespace-from",
      "@babel/plugin-transform-class-static-block",
      "react-native-reanimated/plugin",
    ],
  };
};
