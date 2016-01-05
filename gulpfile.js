/**
 * Gulpfile for task running
 * @author Kaanon MacFarlane <@thekaanon>
*/

var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var fs = require('fs');
  
var configFile = process.cwd() + '/webpack.config.js';  
if (!fs.existsSync(configFile)) {
    console.error('No webpack config found');
  return;
}
var webpackConfig = require(configFile);

gulp.task('webpack:build', function(callback) {
    webpackConfig.plugins = (webpackConfig.plugins || []).concat(
      new webpack.DefinePlugin({
          'process.env': {
              NODE_ENV: 'production'
          }
       }),
       new webpack.optimize.UglifyJsPlugin()
    );
    var compiler = webpack(webpackConfig);

    webpack(webpackConfig).run(function(err, stats) {
        if (err) {
          throw new gutil.PluginError('webpack:build', err);
        }

        gutil.log('[webpack:build]', stats.toString({
            colors: true
        }));
        callback();
   });
});

gulp.task('webpack:watch', function() {
    webpack(webpackConfig).watch(100, function (err, stats) {
        if (err) {
          throw new gutil.PluginError('webpack:watch', err);
        }

        gutil.log('[webpack:build]', stats.toString({
          colors: true
        }));
    });
});
