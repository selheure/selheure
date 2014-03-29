module.exports = (grunt) ->
  require('load-grunt-tasks')(grunt)

  grunt.initConfig {
    watch: {
      options:
        livereload: true
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
        options:
          process: (content, src) ->
            src = src.split('/') # Split on slash
            src = src[src.length-1] # Get file name
            if (src[0].toUpperCase() == src[0] || src == 'config.js' || src == 'routes.js')
              return content
            else
              return ''
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
        command: 'kanso deletedb http://admin:admin@127.0.0.1:5984/selheure-base'
      }
      kansoCreate:{
        command: 'kanso createdb http://admin:admin@127.0.0.1:5984/selheure-base'
      }
      kansoInit:{
        command: 'kanso upload ./data http://admin:admin@127.0.0.1:5984/selheure-base'
      }
      kansoPush:{
        command: 'kanso push http://admin:admin@127.0.0.1:5984/selheure-base'
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
