# Начало работы со сборкой
Для работы сборки должны быть установлены:

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/en/docs/install)
- [Gulp.js](https://gulpjs.com/) - глобальная установка: `npm install gulp-cli -g`

## Установка зависимостей из package.json
В каталоге проекта выполнить: `yarn`.

После установки зависимостей сборка готова к работе.

## Файловая структура
```
dist // собранные файлы проекта
|--css // стили
|--favicon // файлы favicon
|--fonts // шрифты
|--img // изображения
|  |--content // контентные изображения
|  |--icons
|  |  |--svg // svg-иконки, доступные через спрайт svg-symbols.svg
|  |--svg-symbols.svg // svg-спрайт
|--js // скрипты
|--vendors // библиотеки
|--*.html // страницы
gulp
|--tasks // задачи gulp
node_modules
src // исходники файлов проекта
|--favicon // файлы favicon
|--fonts // шрифты
|--img // изображения
|  |--content // контентные изображения
|  |--icons
|     |--svg // svg-иконки, доступные после сборки напрямую и через спрайт
|--js // скрипты
|  |--blocks
|  |--lib
|--pug // шаблоны
|  |--blocks
|  |--lib
|--scss // стили
|  |--blocks
|  |--lib
|--vendors // библиотеки
```

## Gulp-задачи
- `gulp clean` - очистить `./dist`
- `gulp html` - собрать `./src/pug/*.pug`
- `gulp css` - собрать `./src/scss/*.scss`
- `gulp js` - собрать `./src/js/*.js`
- `gulp img` - оптимизация изображений, а также генерация svg-спрайта
- `gulp copy` - копирование файлов `./src/favicon/**/*.*`, `./src/fonts/**/*.*`, `./src/vendors/**/*.*` в `./dist`
- `gulp watch` - отслеживание изменений и запуск соответствующих тасков для всех редактируемых исходников
- `gulp server` - сервер на директории `./dist`
- `gulp`, `gulp default` - сборка в режиме **development**.
- `gulp prod` - сборка в режиме **production** (то же, что **development** + минификация `*.css` и `*.js`)

## Дополнительно
### Установка dev-зависимостей через CLI (при инициализации проекта):
```
yarn add --dev gulp@4.0.0 babel-core babel-loader babel-preset-env bemto.pug browser-sync del emitty gulp-autoprefixer gulp-clean-css gulp-cssimport gulp-debug gulp-filter gulp-if gulp-imagemin gulp-load-plugins gulp-newer gulp-notify gulp-prettify gulp-pug gulp-pxtorem gulp-rename gulp-sass gulp-sass-glob gulp-sourcemaps gulp-svg-symbols gulp-svgmin gulp-typograf gulp-uglify imagemin-jpeg-recompress remove-svg-properties sass-inline-svg-utf8 stream-combiner2 vinyl-named webpack webpack-stream
```