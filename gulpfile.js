const { src, dest, series, watch } = require('gulp')
const concat = require('gulp-concat')
const htmlMin = require('gulp-htmlmin')
const autoprefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const svgSprite = require('gulp-svg-sprite')
const image = require('gulp-image')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify-es').default
const notify = require('gulp-notify')
const sourcemaps = require('gulp-sourcemaps')
const del = require('del')
const browserSync = require('browser-sync').create()

const clean = () => {
    return del(['dist'])
}

const fonts = ()=> {
    return src('src/fonts/**/*')
      .pipe(dest('dist/fonts'))
  }

const styles = () => {
    return src('src/styles/**/*.css')
    .pipe(concat('main.css'))
    .pipe(autoprefixer({
        cascade:false
    }))
    .pipe(cleanCSS({
        level:2
    }))
    .pipe(dest('dist/styles'))
    .pipe(browserSync.stream())
}


const devSourceCSS = () => {
   return src('src/styles/**/*.css')
   .pipe(sourcemaps.init())
   .pipe(sourcemaps.write())
   .pipe(concat('dev.css'))
   .pipe(dest('src'))
   .pipe(browserSync.stream())
}


const htmlMinify =()=> {
    return src('src/**/*.html')
    .pipe(htmlMin({
        collapseWhitespace: true,
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const svgSprites = () => {
    return src('src/images/svg/**/*.svg')
    .pipe(svgSprite({
        mode: {
            stack:{
                sprite:'../sprite.svg'
            }
        }
    }))
    .pipe(dest('dist/images'))
}

const scripts = () => {
    return src([
        'src/js/index.js'
    ])
    .pipe(babel({
        presets:['@babel/env']
    }))
    .pipe(concat('main.js'))
    .pipe(uglify({
        toplevel:true
    }).on('error', notify.onError()))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const devScripts  = () => {
    return src([
        'src/js/index.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write())
    .pipe(concat('dev.js'))
   .pipe(dest('src'))
   .pipe(browserSync.stream())
}

const watchFiles = () => {
    browserSync.init({
        server: {
            baseDir:'dist'
        }
    })
}


const images =()=> {
    return src([
        'src/images/**/*.jpg',
        'src/images/**/*.png',
        'src/images/*.svg',
        'src/images/**/*.jpeg',
        'src/images/**/*.webp',
    ])
    .pipe(image())
    .pipe(dest('dist/images'))
}




watch('src/**/*.html', htmlMinify)
watch('src/styles/*.css', styles)
watch('src/images/svg/**/*.svg', svgSprites)
watch('src/dev.css', devSourceCSS)
watch('src/dev.js', devScripts)
watch('src/js/**/*.js', scripts)
watch('src/fonts/**/*',fonts)



exports.styles = styles
exports.scripts = scripts
exports.htmlMinify = htmlMinify
exports.default = series(clean, fonts, htmlMinify, scripts, styles, images, svgSprites, watchFiles)
exports.dev = series(clean, fonts, htmlMinify, devSourceCSS, devScripts, images, svgSprites, watchFiles)