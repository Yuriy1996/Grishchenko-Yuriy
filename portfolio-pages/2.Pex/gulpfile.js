const gulp = require("gulp");
const saas = require("gulp-sass");
const cssMin = require('gulp-cssmin');
const autoprefixer = require('gulp-autoprefixer');
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const image = require('gulp-image');
const changed = require('gulp-changed');
const plumber = require('gulp-plumber');
const babel = require('gulp-babel');
const browserSync = require("browser-sync").create();
const del = require("del");

const pathsList = {
	root: {
		src: "./",
		dist: "./build/"
	},
	parts: {		
		styles: "styles/",
		scripts: "scripts/",
		images: "images/"
	}
};

gulp.task("browserSync", function() {
	browserSync.init({
		server: {
			baseDir: pathsList.root.src
		}
	});	
});

gulp.task("styles:build", () => {
	return gulp.src(pathsList.root.src + pathsList.parts.styles + "*.scss")
		.pipe(plumber())		
		.pipe(saas().on("error", saas.logError))		
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 2 versions'],
			cascade: false
		}))
		.pipe(cssMin())		
		.pipe(plumber.stop())
		.pipe(gulp.dest(pathsList.root.dist + pathsList.parts.styles))
		.pipe(browserSync.stream());
});

gulp.task("scripts:build", () => {
	return gulp.src(pathsList.root.src + pathsList.parts.scripts + "*.js")
		.pipe(plumber())
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(concat("script.js"))
		.pipe(uglify({
			toplevel: true,
		}))
		.pipe(plumber.stop())
		.pipe(gulp.dest(pathsList.root.dist + pathsList.parts.scripts))
		.pipe(browserSync.stream());
});

gulp.task("images:build", () => {
	return gulp.src(pathsList.root.src + pathsList.parts.images + "**/*")
		.pipe(plumber())
		.pipe(changed(pathsList.root.dist + pathsList.parts.images))
		.pipe(image())
		.pipe(plumber.stop())
		.pipe(gulp.dest(pathsList.root.dist + pathsList.parts.images))
		.pipe(browserSync.stream());
});

gulp.task("layout:build",  gulp.parallel("styles:build", "scripts:build", "images:build"));

// Wathers

gulp.task("html:watch", () => {
	gulp.watch("./*.html").on("change", browserSync.reload);
});

gulp.task("styles:watch", () => {
	gulp.watch(pathsList.root.src + pathsList.parts.styles + "**", gulp.series("styles:build"));
});

gulp.task("scripts:watch", () => {
	gulp.watch(pathsList.root.src + pathsList.parts.scripts + "**", gulp.series("scripts:build"));
});

gulp.task("images:watch", () => {
	gulp.watch(pathsList.root.src + pathsList.parts.images + "**", gulp.series("images:build"));
});

gulp.task("watch", gulp.parallel("layout:build", "html:watch", "styles:watch", "scripts:watch", "images:watch", "browserSync"));

// Del build
gulp.task("del", () => {
	return del(["build/*"]);
});

gulp.task("rewriteBuild", gulp.series("del", "layout:build"));
