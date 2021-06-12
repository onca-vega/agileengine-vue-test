const webpack = require('webpack');
const { PUBLIC_API_PATH, API_ACCESS_KEY } = process.env;

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.LoaderOptionsPlugin({
        test: /\.s(c|a)ss$/,
        options: {
          rules: [
            {
              use: [
                'vue-style-loader',
                'css-loader',
                {
                  loader: 'sass-loader',
                  // Requires sass-loader@^7.0.0
                  options: {
                    implementation: require('sass'),
                    indentedSyntax: true // optional
                  },
                  // Requires >= sass-loader@^8.0.0
                  options: {
                    implementation: require('sass'),
                    sassOptions: {
                      indentedSyntax: true // optional
                    },
                  },
                },
              ],
            },
          ]
        }
      })
    ]
  },
  chainWebpack: config => {
    config.plugin('define').tap(args => {
      args[0]['process.env'] = {
        ...args[0]['process.env'],
        PUBLIC_API_PATH: JSON.stringify(PUBLIC_API_PATH),
        API_ACCESS_KEY: JSON.stringify(API_ACCESS_KEY)
      };

      return args;
    });
  },
};
