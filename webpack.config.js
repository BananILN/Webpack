const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) =>{
    return {

        mode: env.mode ?? "development",
        entry: path.resolve(__dirname, 'src', 'index.js'),
        output:{
            path: path.resolve(__dirname, 'build'),
            filename: '[name].[contenthash].js',
            assetModuleFilename: 'assets/[name][ext]',
            clean: true,
        },
        plugins: [new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public','index.html')
        }),
            new webpack.ProgressPlugin(),
            new MiniCssExtractPlugin({ filename: 'index.css',}),
        ],
            module: {
                rules: [
                  {
                    test: /\.html$/i,
                    loader: "html-loader",
                  },
                    {
                        test: /\.(c|sa|sc)ss$/i,
                        use: [MiniCssExtractPlugin.loader, "css-loader",   "sass-loader"],
                    },
                  {
                    test: /\.(?:js|mjs|cjs)$/,
                    exclude: /node_modules/,
                    use: {
                      loader: 'babel-loader',
                      options: {
                        targets: "defaults",
                        presets: [
                          ['@babel/preset-env']
                        ]
                      }
                    }
                  },
                  {
                        test: /\.woff2?$/i,
                        
                        generator:{
                            filename: 'fonts/[name][ext]',
                        }
                  },
                    {
                        test: /\.(gif|png|jpe?g|svg)$/i,
                        use: [
                          'file-loader',
                          {
                            loader: 'image-webpack-loader',
                            options: {
                              mozjpeg: {
                                progressive: true,
                              },
                              // optipng.enabled: false will disable optipng
                              optipng: {
                                enabled: false,
                              },
                              pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                              },
                              gifsicle: {
                                interlaced: false,
                              },
                              // the webp option will enable WEBP
                              webp: {
                                quality: 75
                              }
                            }
                          },
                        ],
                    }                
                  
                ],
              },
              

    }
} 
