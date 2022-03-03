var rename = require("gulp-rename");
var gulp = require('gulp');


function defaultTask(cb) {
    let src;
    switch (process.env.NODE_ENV) {

        case "production": {
            src=gulp.src('./env/env.yarn')
        }
        case "development": {
            src=gulp.src('./env/env.development')
        }
        case "develop":{
            src=gulp.src('./env/env.develop')

        }
        case "test": {
            src=gulp.src('./env/env.test');
        }
        default: {
            src=gulp.src('./env/env.development')
        }
    }

    src.pipe(rename('.env')).pipe(gulp.dest("./env/"));
    cb();
}

exports.default = defaultTask