    const project_folder = "dist";
    const source_folder = "src";



    const path = {
        build:{
            html: project_folder + "/",
            css: project_folder + "/css/",
            js: project_folder + "/js/",
            img: project_folder + "/img/",
            fonts: project_folder + "/fonts/",
        },
        src:{
            html: [source_folder + "/*.html", "!"+source_folder + "/_*.html"], //all html files / ,  but no file that start with '_'
            css: source_folder + "/sass/style.sass",
            js: source_folder + "/js/main.js",
            img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}", //img / all folder / any name . {format}
            fonts: source_folder + "/fonts/*.ttf",
        },
        watch:{
            html: source_folder + "/**/*.html", // all foler / any name.html
            css: source_folder + "/sass/**/*",
            js: source_folder + "/js/**/*.js",
            img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}"
        },
        clean: "./" + project_folder + "/" //clean folder every time when we start gulp
    }


    const   {src, dest} = require('gulp'),
            fs = require('fs'),
            gulp = require('gulp'), //gulp
            browsersync = require('browser-sync').create(), //browserSync
            fileinclude = require('gulp-file-include'), //for html to include files
            del = require('del'), //delete dist
            sass= require('gulp-sass')(require('sass')), //from sass to css
            autoprefixer = require("gulp-autoprefixer"), //--webkit
            group_media = require("gulp-group-css-media-queries"), //all media in one place
            clean_css = require('gulp-clean-css'), //optimization css
            rename = require('gulp-rename'), //rename files
            webpack = require('webpack-stream'), //webpack for js
            imagemin = require('gulp-imagemin'), //image compression
            webp = require('gulp-webp'), //convert jpg or any to WEBP   
            webphtml = require('gulp-webp-html'), //work with webp in html
            webpcss = require('gulp-webpcss'), //work with webp in css
            svgSprite = require('gulp-svg-sprite'), //work with svg
            ttf2woff = require('gulp-ttf2woff'), //convert ttf to woff
            ttf2woff2 = require('gulp-ttf2woff2'), //conver ttf2 to woff2
            fonter = require('gulp-fonter');


    function browserSync(params) {
        browsersync.init({
            server:{
                baseDir: "./" + project_folder + "/"
            },
            port:3000,
            notify:false
        })
    }
    

//Work with files   
    function html(params) {
        return src(path.src.html)
            .pipe(fileinclude())
            .pipe(webphtml())
            .pipe(dest(path.build.html))
            .pipe(browsersync.stream())
    }

    function css(params) {
        return src(path.src.css)
            .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError)) //обработка
            .pipe(
                group_media()
            )
            .pipe(
                autoprefixer({//--webkit
                    overrideBrowserslist: ['last 5 version'],
                    cascade: true
                })
            )
            .pipe(webpcss({webpClass: '.webp',noWebpClass: '.no-webp'}))
            .pipe(dest(path.build.css))
            .pipe(clean_css())
            .pipe(rename({
                extname: ".min.css"
            }))
            .pipe(dest(path.build.css))
            .pipe(browsersync.stream())
    }

    function js(params) {
        return src(path.src.js)
            .pipe(webpack({
                mode: 'development',
                output: {
                    filename: 'script.js'
                },
                watch: false,
                devtool: "source-map",
                module: {
                    rules: [
                        {
                        test: /\.m?js$/,
                        exclude: /(node_modules|bower_components)/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                            presets: [['@babel/preset-env', {
                                debug: true,
                                corejs: 3,
                                useBuiltIns: "usage"
                            }]]
                            }
                        }
                        }
                    ]
                    }
            }))
            .pipe(dest(path.build.js))
            .pipe(browsersync.stream())

        
    }

    function images(params) {
        return src(path.src.img)
            .pipe(
                webp({
                    quality: 70
                })
            )
            .pipe(dest(path.build.img))
            .pipe(src(path.src.img))
            .pipe(
                imagemin({
                    progressive: true,
                    svgPlugins: [{removeViewBox: false}],
                    interlaced: true,
                    optimizationLevel: 3
                })
            )
            .pipe(dest(path.build.img))
            .pipe(browsersync.stream())
    }

    function fonts(params) {
        src(path.src.fonts)
            .pipe(ttf2woff())
            .pipe(dest(path.build.fonts))
        return src(path.src.fonts)
            .pipe(ttf2woff2())
            .pipe(dest(path.build.fonts))

    }

    gulp.task('otf2ttf', function() {
        return src([source_folder + '/fonts/*.otf'])
            .pipe(fonter({
                formats: ['ttf']
            }))
            .pipe(dest(source_folder + '/fonts/'))
    })

    gulp.task('svgSprite',function(){
        return gulp.src([source_folder + 'iconsprite/*.svg'])
            .pipe(svgSprite({
                mode:{
                    stack:{
                        sprite: "../icons/icons.svg",
                    }
                },
            }
            ))
            .pipe(dest(path.build.img))
    })


        
    function cb() { }
        
        
    

    function watchFiles(params) {
        gulp.watch([path.watch.html],html)
        gulp.watch([path.watch.css],css)
        gulp.watch([path.watch.js],js)
        gulp.watch([path.watch.img],images)
    }

    function clean(params) {
        return del(path.clean)
    }
    
    const build = gulp.series(clean,gulp.parallel(html,js,css,images,fonts)) 
    const watch = gulp.parallel(build,watchFiles,browserSync);

    




exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;

        