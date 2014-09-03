var fs = require('fs');

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        project: {
            app: '<%= _.slugify(appname) %>',
            assets: '',
            scss: ['<%= project.assets %>scss/app.scss']
        },
        env: {
            dev: {
                env: "dev",
                file: "config.js"
            },
            prod: {
                env: "prod",
                file: "config.js"
            }
        }
    });

    //grunt.loadNpmTask('')

    grunt.registerMultiTask('env', 'set env variable', function() {
        //console.log(this.data.env);
        var done = this.async();
        var env = this.data.env;
        var code = 'window.env="' + env + '"; \n';

        var configFile = __dirname + '/' + this.data.file;
        fs.readFile(configFile, 'utf8', function(err, data) {
            if(err) throw err;
            var position = data.indexOf('\n');

            if(position != -1) {
                data = data.substr(position + 1);
            }

            var content = code + data;

            fs.writeFile(configFile, content, 'utf8', function(err) {
                done();
            });
        });
    });
};