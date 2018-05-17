##基于gulp的简单项目使用教程

###	建立项目



1. 初始化NPM . 打开命令行工具(windows下windows+r . cmd) . 进入项目路径 . npm init 根据提示完成初始化 . 

2. 建立src文件夹 . src文件夹目录结构为：

       │  index.html
       ├─js
       │      a.js
       │      b.js
       └─style
               a.css
               b.css

   

   ```js
   //index.html
   <!DOCTYPE html>
   <html lang="en">
   <head>
   	<meta charset="UTF-8">
   	<title>Document</title>
   	<link rel="stylesheet" href="./assets/css/style.min.css" />
   </head>
   <body>
   	<div class="a">这里是元素.a</div>
   	<div class="b">这里是元素.b</div>
   	<script src="./assets/js/index.min.js"></script>
   </body>
   </html>

   //a.js
   console.log('a.js');

   //b.js
   console.log('b.js');

   //a.css
   .a{color:blue}

   //b.css
   .b{color:red}
   ```

#### 开始使用gulp

```
npm i gulp --save-dev
```

根目录下添加gulpfile.js文件 . 

```javascript
//编辑 gulpfile.js
const gulp = require('gulp');

//编辑 package.json
"scripts":{
    //添加一行
  "start": "gulp"  
} 
```

尝试启动gulp . 

```
npm start 
```

会得到错误提示 : Task 'default' is not in your gulpfile . 

假设需要将所有JS文件合并压缩并输出到 dist/assets/js 文件夹

```
// 使用 gulp-concat(合并文件) 与 gulp-uglify(压缩文件)
npm i gulp-concat gulp-uglify --save-dev
```

```javascript
// 添加以下代码到
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

gulp.task('js',()=>{
	return gulp.src('src/**/*.js')
	.pipe(concat('index.min.js'))
	.pipe(uglify())
	.pipe(dest('dist/assets/js/'))
});

gulp.task('default',['js']);
```

```
npm start
```

查看 dist/assets/js . 压缩过的文件已经被输出到这里.

同样的 . 当需要为样式文件处理压缩合并或者动态转换REM单位 . 或者将index.html以及字体等项目文件复制后输出. 都需要建立对应的task来处理.下面添加处理css以及复制index.html文件的task.

```
// gulp-clean-css(压缩css) 
npm i gulp-clean-css --save-dev
```

```js
//gulpfile.js
//添加
const cleanCSS = require('gulp-clean-css');

gulp.task('css', () => {
	return gulp.src('src/**/*.css')
		.pipe(concat('style.min.css'))
		.pipe(cleanCSS())
		.pipe(gulp.dest('dist/assets/css/'))
});

gulp.task('html', () => {
	return gulp.src('src/index.html')
		.pipe(gulp.dest('dist/'))
});

//修改
gulp.task('default', ['js','css','html']);
```

```
npm start
```

查看dist文件夹 . 打开index.html . 会出现蓝色与红色的两行文字 .



### 监控(watch) 



实际开发中不可能每次修改文件都去手动执行文件输出.因此需要建立文件修改监控.

```js
//修改package.json
"scripts": {
    //开发监控
    "dev": "set NODE_ENV=development&&gulp",
    //直接输出文件
    "build": "set NODE_ENV=production&&gulp"
}

//建立监控
gulp.task('html:watch', () => gulp.watch(['src/index.html'], ['html']));
gulp.task('js:watch', () => gulp.watch(['src/**/*.js'], ['js']));
gulp.task('css:watch', () => gulp.watch(['src/**/*.css'], ['css']));

//开发或者产出
if (process.env.NODE_ENV === 'development') {
	// gulp默认任务所关联的任务
	gulp.task('default', [
        'html:watch',
        'js:watch',
        'css:watch'
    ]);
} else if (process.env.NODE_ENV === 'production') {
	//产出文件
	gulp.task('default', ['js', 'css', 'html']);
}
```

开启监控

```
npm run dev
```

尝试修改一个文件

```
// a.css
//修改
.a{color:green}
```

刷新页面发现第一行变成绿色 . 



### revision

更新文件版本后需要为文件自动加上hash后缀,清除缓存.

```js
// gulpfile.js
const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const gulpSequence = require('gulp-sequence');
const clean = require('gulp-clean');
const rev = require('gulp-rev');
const revCollector = require('gulp-rev-collector');

gulp.task('js', () => {
	return gulp.src('src/**/*.js')
		.pipe(concat('index.min.js'))
		.pipe(rev())
		.pipe(gulp.dest('dist/assets/js'))
		.pipe(rev.manifest('js-rev.json'))
		.pipe(gulp.dest('dist/rev'));
});

gulp.task('css', () => {
	return gulp.src('src/**/*.css')
		.pipe(concat('style.min.css'))
		.pipe(cleanCSS())
		.pipe(rev())
		.pipe(gulp.dest('dist/assets/css'))
		.pipe(rev.manifest('css-rev.json'))
		.pipe(gulp.dest('dist/rev'));
});

gulp.task('rev', function () {
	return gulp.src(['dist/rev/*.json', 'src/index.html'])
		.pipe(revCollector({replaceReved: true}))
		.pipe(gulp.dest('dist'));
});
gulp.task('clean', () => gulp.src('dist', {
	read: false
}).pipe(clean()));

gulp.task('html:watch', () => gulp.watch(['src/index.html'], ['html']));
gulp.task('js:watch', () => gulp.watch(['src/**/*.js'], ['js']));
gulp.task('css:watch', () => gulp.watch(['src/**/*.css'], ['css']));
gulp.task('rev:watch', () => gulp.watch(['dist/rev/*.json','src/index.html'], ['rev']));

if (process.env.NODE_ENV === 'development') {
	gulp.task('default', ['rev:watch', 'js:watch', 'css:watch']);
} else if (process.env.NODE_ENV === 'production') {
	gulp.task('default', gulpSequence('clean', 'css', 'js', 'rev'));
}

```