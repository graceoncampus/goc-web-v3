// TODO: DELETE THIS FILE (NOT NEEDED ANYMORE BUT JUST IN CASE FOR FUTURE REFERENCE)
// Issues with NodeJs Polyfill with webpack 5.0+
// https://stackoverflow.com/a/71280203
// https://stackoverflow.com/a/73661388
const webpack = require("webpack");

module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    assert: require.resolve("assert"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    os: require.resolve("os-browserify"),
    url: require.resolve("url"),
    net: false,
    child_process: false,
    tls: false,
    vm: false,
    fs: false,
  });

  config.resolve.fallback = fallback;
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ]);

  // https://github.com/react-dnd/react-dnd/issues/3425
  config.module.rules.unshift({
    test: /\.m?js$/,
    resolve: {
      fullySpecified: false, // disable the behavior
    },
  });
  config.ignoreWarnings = [/Failed to parse source map/];

  return config;
};
