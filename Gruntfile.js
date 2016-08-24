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
        },
        exec: {
            build: {
                command: './node_modules/.bin/react-scripts build'
            }
        },
        watch: {
            scripts: {
                files: 'src/**',
                tasks: ['exec', 'copy'],
                options: {
                    interrupt: true,
                },
            },
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['copy']);
};