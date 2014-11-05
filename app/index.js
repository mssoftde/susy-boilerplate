'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var SuzyBoilerplateGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the dandy SuzyBoilerplate generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'srcDir',
      message: 'Please specify the source directory',
      default: 'app/src'
    }, {
      type: 'input',
      name: 'distDir',
      message: 'Please specify the distribution directory',
      default: 'app/dist'
    }
    ];

    this.prompt(prompts, function (props) {
      this.srcDir = props.srcDir;
      this.sassDir = this.srcDir + '/sass';
      this.sassConfigs = this.sassDir + '/config';
      this.sassPartials = this.sassDir + '/partials';
      this.cssDevDir = this.srcDir +'/css';
      this.scriptDir = this.srcDir + '/js';
      this.htmlDir = this.srcDir + '/html';

      this.distDir = props.distDir;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      //create directory structure
      this.dest.mkdir(this.srcDir);
      this.dest.mkdir(this.scriptDir);
      this.dest.mkdir(this.cssDevDir);
      this.dest.mkdir(this.sassDir);
      this.dest.mkdir(this.sassConfigs);
      this.dest.mkdir(this.sassPartials);
      this.dest.mkdir(this.htmlDir);

      this.src.copy('_package.json', 'package.json');
      this.src.copy('_bower.json', 'bower.json');
      this.src.copy('_Gemfile', 'Gemfile');
      this.template('_Gruntfile.js', 'Gruntfile.js');

      this.src.copy('_base.scss', this.sassDir + '/base.scss');
      this.src.copy('_susy_config.scss', this.sassConfigs + '/_susy_config.scss');
      this.src.copy('_imports.scss', this.sassConfigs + '/_imports.scss');
    },

    projectfiles: function () {
      this.src.copy('editorconfig', '.editorconfig');
      this.src.copy('jshintrc', '.jshintrc');
    }
  },

  end: function () {
    this.installDependencies();
  }
});

module.exports = SuzyBoilerplateGenerator;
