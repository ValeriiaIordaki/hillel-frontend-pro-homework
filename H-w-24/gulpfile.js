const{series, src, dest, watch} = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const inject = require('gulp-inject');

function copyHTML(){
   return  src('src/index.html')
           .pipe(dest('dist/')); 
}

function concatJS(){
   return src('./src/**/*.js')
          .pipe(concat('index.js'))
          .pipe(dest('dist/'));
}

function compileCSS(){
   return src(['./src/**/**/reset.scss', './src/**/**/*.scss'])
          .pipe(concat('style.css'))
          .pipe(sass())
          .pipe(dest('dist/'));
}

function injectsLinks(){
    const target = src('./src/index.html');
    const sources = src(['./dist/*.js', './dist/*.css'], {read: false});
    const injectOptions = {
        addRootSlash: false,
        ignorePath: 'dist/'
   };

    return target.pipe(inject(sources, injectOptions))
                 .pipe(dest('./dist/'));
}

function watchFiles() {
    return watch('./src/*.html', series(copyHTML, injectsLinks)),
           watch('./src/**/*.scss', compileCSS),
           watch('./src/**/*.js', concatJS);
}

module.exports.build = series(concatJS, compileCSS, injectsLinks);
module.exports.dev = watchFiles;