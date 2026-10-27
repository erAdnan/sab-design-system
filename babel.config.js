const fs = require("fs");
const path = require("path");

require("./scripts/load-app-env");

module.exports = function (api) {
  api.cache.using(() => process.env.ENVFILE || ".env");

  const requested = process.env.ENVFILE || ".env";
  const envFile = path.isAbsolute(requested)
    ? requested
    : path.resolve(__dirname, requested);
  const plugins = [];

  if (fs.existsSync(envFile)) {
    plugins.push([
      "module:react-native-dotenv",
      {
        moduleName: "@env",
        path: envFile,
        allowlist: ["MOCKS_ENABLED"],
        safe: false,
        allowUndefined: true,
        verbose: false,
      },
    ]);
  }

  return {
    presets: ["module:@react-native/babel-preset"],
    plugins: [
      ...plugins,
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
