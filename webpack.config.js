// module.exports is a node.js thing
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'test') {
   require('dotenv').config({ path: '.env.test' });
} else if (process.env.NODE_ENV === 'development'){
    require('dotenv').config({ path: '.env.development' });
}

module.exports = (env) => {
    const isProduction = env === 'production';
    const CSSExtract = new ExtractTextPlugin('styles.css');

    return {
        entry: './src/app.js',
        output: {
            path: path.join(__dirname, 'public', 'dist'),
            filename: 'bundle.js'
        },
        module:{
            rules: [{
                loader: 'babel-loader',
                test: /\.jsx?$/, // this says that any .js file that you see in the application - use the babel-loader to babel it - meaning it takes the jsx and convert it into js es-5
                exclude: /node_modules/
            },{
                test: /\.s?css$/,
                use: CSSExtract.extract({ 
                    use:[
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                 })
            }]
        },
        plugins: [
            CSSExtract,
            new webpack.DefinePlugin({
                'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
                'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
                'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
                'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
                'process.env.FIREBASE_STOREAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STOREAGE_BUCKET),
                'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID)
            })
        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map',//'cheap-module-eval-source-map', // This line here causes an error, if there is, to appear with a link in the console to the specific location in the file! very useful 
        devServer: { // Serving the bundle.js file from memory. NOT the physhical bundle.js file located in the public folder
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true, // tells the server to just return the index.html when using the react /... for unknown 404 (when user enter a path it will not go to server path, but to client router path)
            publicPath: '/dist/'
        }
    };    
};

// in package.json file: (explained)
// "serve": "live-server public/", // old, no need. webpack doing it for us
// "build": "webpack", // This will produce the bundle.js file in the public folder
// "dev-server": "webpack-dev-server", // this script causes a bundle.js in memory to run. Does NOT produce the bundle.js in the public folder

// Production webpack =>
// if we are to build in production - the dev-tool will be using a slower version to compile, and will generate 2 files:
// bundle.js (small size) and bundle.js.map (large size), which cointains the source maps for production.
// the bundle.js.map will be loaded ONLY if the user will try to debug our app in production using the developer tools

// using the extract-text-webpack-plugin to put the css/scss files in a different text files and not inline in the bundle.js
// adding the CSSExtract class above, and in index.html in the public folder - added and href to that file.
// now when we serve our application, we can see the styles.css file seperatly

