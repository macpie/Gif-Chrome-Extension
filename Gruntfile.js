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
            manifest: {
                src: 'manifest.json',
                dest: 'build/manifest.json'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['copy']);
};