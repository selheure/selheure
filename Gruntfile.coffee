module.exports = (grunt) ->
  require('load-grunt-tasks')(grunt)

  grunt.initConfig {
    watch: {
      all: {
        files: [
          './partials/{,*/}*.html'
          './coffee/{,*/}*.coffee'
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
          'src/{,*/}*.js'
        ]
        dest: 'static/js/main.js'
      }
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
  }

  grunt.registerTask('default', [
    'watch'
  ])

  grunt.registerTask('init', [
    'shell:kansoDelete'
    'shell:kansoCreate'
    'shell:kansoInit'
    'shell:kansoPush'
  ])
