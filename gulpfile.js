//1. 导入
const {src,dest,watch} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const concat = require('gulp-concat');

//2. 任务
//index
function fnIndex(){
    return src('./src/index.html')
    .pipe(dest('./dist'));
}
//css
function fnCSS(){
    return src('./src/sass/*.scss')
    .pipe(sass({outputStyle: 'expanded'}))
    // .pipe(cssnano())
    .pipe(rename({suffix : '.min'}))
    .pipe(dest('./dist/css'));
}
//js
function fnJS(){
    return src('./src/js/*.js')
    // .pipe(concat('index.js'))
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(rename({suffix : '.min'}))
    .pipe(dest('./dist/js'));
}
//img
function fnImg(){
    return src('./src/img/*')
    .pipe(imagemin())
    .pipe(dest('./dist/img'));
}
//html
function fnHTML(){
    return src('./src/html/*.html')
    .pipe(htmlmin())
    .pipe(dest('./dist/html'));
}
//watch
function fnWatch(){
    watch('./src/index.html',fnIndex);
    watch('./src/sass/*.scss',fnCSS);
    watch('./src/js/*.js',fnJS);
    watch('./src/img/*',fnImg);
    watch('./src/html/*.html',fnHTML);

}

//3. 导出
exports.index = fnIndex;
exports.css = fnCSS;
exports.js = fnJS;
exports.html = fnHTML;
exports.img = fnImg;
exports.default = fnWatch;
