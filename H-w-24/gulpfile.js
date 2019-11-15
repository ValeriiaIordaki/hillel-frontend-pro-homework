const {series, src, dest, watch} = require('gulp'),
concat = require('gulp-concat'),
sass = require('gulp-sass'),
inject = require('gulp-inject'),
rename = require('gulp-rename');

function copyTask(){
   return  src('src/index.html')
           .pipe(dest('dist/')); 
}

function concatJS(){
   return src('./src/**/*.js')
          .pipe(concat('index.js'))
          .pipe(dest('dist/'));
}

function compileCSS(){
   return src('./src/**/**/main.scss')
          .pipe(sass())
          .pipe(rename('style.css'))
          .pipe(dest('dist/'));
}

function injectsLinks(){
    const target = src('./src/index.html'),
    sources = src(['./dist/*.js', './dist/*.css'], {read: false}),
    injectOptions = {
        addRootSlash: false,
        ignorePath: 'dist/'
   };

    return target.pipe(inject(sources, injectOptions))
                 .pipe(dest('./dist/'));
}

function watchFiles() {
    return watch('./src/*.html', series(copyTask, injectsLinks)),
           watch('./src/**/*.scss', compileCSS),
           watch('./src/**/*.js', concatJS);
}

module.exports= {
   build : series(concatJS, compileCSS, injectsLinks),
   dev : watchFiles
}
