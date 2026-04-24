const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');

// Tarefa para compilar o SASS e minificar o CSS
function styles() {
    return gulp.src('./src/styles/*.scss') // Busca todos os arquivos .scss
        .pipe(sass({ outputStyle: 'compressed' })) // Compila e minifica
        .pipe(gulp.dest('./dist/styles')); // Salva na pasta de destino
}

function images() {
    // Adicionei o parâmetro nodir para garantir que ele foque nos arquivos
    return gulp.src('./src/assets/images/**/*', { encoding: false })
        .pipe(gulp.dest('./dist/assets/images'));
}

// Tarefa para minificar o JavaScript
function scripts() {
    return gulp.src('./src/scripts/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/scripts'));
}

// Tarefa para copiar o HTML para a pasta dist
function html() {
    return gulp.src('./src/index.html')
        .pipe(gulp.dest('./dist'));
}

// Tarefa de observação (Watch) para desenvolvimento
exports.watch = function() {
    gulp.watch('./src/styles/*.scss', gulp.parallel(styles));
    gulp.watch('./src/scripts/*.js', gulp.parallel(scripts));
    gulp.watch('./src/index.html', gulp.parallel(html));
}

// Tarefa padrão (Executa tudo)
exports.default = gulp.parallel(styles, images, scripts, html);