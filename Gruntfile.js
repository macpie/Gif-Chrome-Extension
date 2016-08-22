module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            images: {
                expand: true,
                cwd: 'src/media',
                src: ['*', '!powered_by.png'],
                dest: 'build/static/media/'
            },
            background: {
                files: [{
                    src: 'background.html',
                    dest: 'build/background.html'
                }, {
                    src: 'src/background.js',
                    dest: 'build/static/js/background.js'
                }]
            },
            manifest: {
                src: 'manifest.json',
                dest: 'build/manifest.json'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['copy']);
};