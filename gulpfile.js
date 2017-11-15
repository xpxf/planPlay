
// 导入gulp
var gulp = require("gulp");

//导入插件
var uglify = require('gulp-uglify');//js压缩插件
var bom = require('gulp-bom');//解决中文乱码
var minifyCss = require('gulp-minify-css');//css压缩插件
var minifyHtml = require('gulp-minify-html');//html压缩插件
var htmlmin = require('gulp-htmlmin');//html压缩
var imagemin = require('gulp-imagemin');//图片压缩相关插件
var pngquant = require('imagemin-pngquant');//png图片压缩
var rename = require('gulp-rename');//重命名插件
var babel = require('gulp-babel'); //es6转es5

var obj = {
	removeComments: true, //清除HTML注释
	collapseWhitespace: true, //压缩HTML
	collapseBooleanAttributes: true,//省略布尔属性的值<input checked="true"/> ==> <input checked/>
	removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
	removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
	removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
	minifyJS: true, //压缩页面JS
	minifyCSS: true //压缩页面CSS
}


//压缩html
gulp.task("htmlTask", function(){
	gulp.src("src/*.html")
		.pipe( htmlmin(obj) )
		.pipe( gulp.dest("dest") );
})

// 压缩js
gulp.task("jsTask", function(){
	gulp.src("src/js/*")
		.pipe( babel({"presets": ["es2015"]}) )
		.pipe( uglify() )
		.pipe( gulp.dest("dest/js") );
})

//压缩css
gulp.task("cssTask", function(){
	gulp.src("src/css/*")
		.pipe( minifyCss() )
		.pipe( gulp.dest("dest/css") );
})

gulp.task("imgTask", function(){
	gulp.src("src/images2/*")
		.pipe( imagemin({
			progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
			use: [pngquant()] //使用pngquant插件来深度压缩png图片
	//		optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
	//      interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
	//      multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
		}))
		.pipe( gulp.dest("dest/images2") );
})


//借用依赖实现所有执行的default任务
gulp.task("default", ["htmlTask", "jsTask", "cssTask", "imgTask"]);