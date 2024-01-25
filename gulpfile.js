var gulp = require("gulp");

var sass = require('gulp-sass')(require('sass')),
    cssnano = require("gulp-cssnano"),
    concat = require("gulp-concat"),
    rename = require("gulp-rename"),
    watch = require('gulp-watch'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync');

//owl
gulp.task('owl_js', function() {
    return gulp.src(['node_modules/owl.carousel/dist/owl.carousel.js','node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest("./build/js"));
});
gulp.task("owl_css", function() {
    return gulp.src(['node_modules/owl.carousel/src/scss/owl.carousel.scss','node_modules/owl.carousel/src/scss/owl.theme.default.scss',])
        .pipe(sass())
        .pipe(cssnano())
        .pipe(gulp.dest("./build/css"));
});
//owl

gulp.task("scss", function() {
    return gulp.src("./dev/scss/index.scss")
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(cssnano())
        .pipe(rename("template_styles.min.css"))
        .pipe(sourcemaps.write(''))
        .pipe(gulp.dest("./build/css"))
        .pipe(browserSync.stream());
});

gulp.task('img', function() {
    return gulp.src(["./dev/img/*.+(jpg|jpeg|png|gif)","./dev/img/*.svg"])
        .pipe(gulp.dest("./build/img"))
        .pipe(browserSync.stream());
});

gulp.task("scripts", function() {
    return gulp.src("./dev/js/**/*.js")
        .pipe(concat('scripts.js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest("./build/js"))
        .pipe(browserSync.stream());
});
gulp.task("html", function() {
    return gulp.src("./index.html")
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {

    browserSync.init({
        server: {
            baseDir: "./"
        }
    })

    gulp.watch('./dev/scss/**/*.scss', gulp.series('scss'));
    gulp.watch(['./dev/img/**/*.+(jpg|jpeg|png|gif)','./dev/img/**/*.svg'], gulp.series('img'));
    gulp.watch('./dev/js/**/*.js', gulp.series('scripts'));
    gulp.watch('./index.html', gulp.series('html'));
});

gulp.task('default', gulp.series("owl_js","owl_css", "scss", "img", "scripts", "watch"));