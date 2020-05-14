const merge = require("webpack-merge");
const common = require("./webpack.common");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  performance: {
    hints: false
  },
  plugins: [
      new CopyWebpackPlugin([
        {from: `${__dirname}/src`, to: `${__dirname}/public`}
      ])
  ]
});
