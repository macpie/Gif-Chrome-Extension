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
        compress: {
            package: {
                options: {
                    archive: 'packages/<%= pkg.name %>-<%= pkg.version %>.zip'
                },
                files: [{
                    expand: false,
                    src: ['build/**'],
                    dest: '/'
                }]
            }
        },
        'json-replace': {
            options: {
                space: '  '
            },
            version: {
                options: {
                    replace: {
                        version: '<%= pkg.version %>'
                    }
                },
                files: [{
                    src: 'package.json',
                    dest: 'package.json'
                }, {
                    src: 'manifest.json',
                    dest: 'manifest.json'
                }]
            },
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
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-json-replace');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('build-extension', '', function(version) {
        if (version) {
            grunt.config.set('pkg.version', version);
            grunt.task.run('json-replace:version');
        } else {
            grunt.log.writeln('WARNING: did not update version!');
        }
        grunt.task.run([
            'exec:build',
            'copy',
            'compress'
        ]);
    });

    grunt.registerTask('default', ['copy']);
};