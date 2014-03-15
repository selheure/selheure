module.exports = (grunt) ->
  require('load-grunt-tasks')(grunt)

  grunt.initConfig {
    watch: {
      all: {
        files: [
          './partials/{,*/}*.html'
          './src/{,*/}*'
          './lib/{,*/}*.js'
        ]
        tasks: [
          'shell:kansoPush'
        ]
      }
    }
    concat: {
      dist: {
        src: [
          'temp/*/__init__.js'
          'temp/*/config.js'
          'temp/*/routes.js'
          'temp/*/*.js'
        ]
        dest: 'static/js/main.js'
      }
    }
    coffee: {
      options:
        bare: true
      dist: {
        expand: true
        cwd: 'src/'
        src: '*/*.coffee'
        dest: 'temp/'
        ext: '.js'
      },
    }
    shell:{
      options:
        stdout: true
      kansoDelete:{
        command: 'kanso deletedb http://admin:admin@127.0.0.1:5984/shelheure-base'
      }
      kansoCreate:{
        command: 'kanso createdb http://admin:admin@127.0.0.1:5984/shelheure-base'
      }
      kansoInit:{
        command: 'kanso upload ./data http://admin:admin@127.0.0.1:5984/shelheure-base'
      }
      kansoPush:{
        command: 'kanso push http://admin:admin@127.0.0.1:5984/shelheure-base'
      }
    }
    copy: {
      dist: {
        expand: true
        filter: 'isFile'
        cwd: 'src/'
        src: '*/*.js'
        dest: 'temp/'
      }
    }
    clean: {
      options:
        force: true
      dist: {
        src: [
          "temp/"
        ]
      }
    }
  }


  grunt.registerTask('default', [
    'watch'
  ])

  grunt.registerTask('compile', [
    'copy'
    'coffee'
    'concat'
    'clean'
  ])

  grunt.registerTask('init', [
    'shell:kansoDelete'
    'shell:kansoCreate'
    'shell:kansoInit'
    'shell:kansoPush'
  ])
