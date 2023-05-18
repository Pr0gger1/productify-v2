const Dotenv = require("dotenv-webpack");
const OptimizePlugin = require("optimize-plugin");

module.exports = {
  target: ['web', 'es2017'],
  plugins: [new Dotenv(), new OptimizePlugin()],
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.module\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              esModule: true,
              modules: {
                namedExport: true,
              },
            },
          },
        ],
      },
      {
        test: /\.module\.scss$/,
        use: [
          "style-loader",
          {
            loader: "sass-loader",
            options: {
              esModule: true,
              modules: {
                namedExport: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|svg)$/,
        loader: "file-loader",
        options: {
          name: "assets/[name].[ext]",
        },
      },
    ],
  },
};
