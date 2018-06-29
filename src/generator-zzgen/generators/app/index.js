'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
var path = require('path');
var mkdirp = require('mkdirp');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay('Mr Guzzo is a really nice guy, let him do the boring work for you!')
    );

    const prompts = [
      {
        name: 'appName',
        message: 'What\'s the name of your ASP.NET application?',
        default: 'app'
      },
      {
        type: 'confirm',
        name: 'createSln',
        message: 'Would you like a VisualStudio solution file too?',
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.sourceRoot(path.join(__dirname, '../../templates/aspnetcore'));

    this.fs.copy(
      this.templatePath(this.sourceRoot() + '/project.DomainModel/project.DomainModel.csproj'),
      this.destinationPath(this.props.appName + '.DomainModel/' + this.props.appName + '.DomainModel.csproj')
    );
    this.fs.copy(
      this.templatePath(this.sourceRoot() + '/project.Repositories/project.Repositories.csproj'),
      this.destinationPath(this.props.appName + '.Repositories/' + this.props.appName + '.Repositories.csproj')
    );
    mkdirp.sync(this.destinationPath(this.props.appName + '.Repositories/Interfaces/'));
    mkdirp.sync(this.destinationPath(this.props.appName + '.Repositories/Repositories/'));
    this.fs.copy(
      this.templatePath(this.sourceRoot() + '/project.Services/project.Services.csproj'),
      this.destinationPath(this.props.appName + '.Services/' + this.props.appName + '.Services.csproj')
    );
    mkdirp.sync(this.destinationPath(this.props.appName + '.Services/Interfaces/'));
    mkdirp.sync(this.destinationPath(this.props.appName + '.Services/Services/'));
    this.fs.copy(
      this.templatePath(this.sourceRoot() + '/project.UseCases/project.UseCases.csproj'),
      this.destinationPath(this.props.appName + '.UseCases/' + this.props.appName + '.UseCases.csproj')
    );
    mkdirp.sync(this.destinationPath(this.props.appName + '.UseCases/Interfaces/'));
    mkdirp.sync(this.destinationPath(this.props.appName + '.UseCases/UseCases/'));
    this.fs.copy(
      this.templatePath(this.sourceRoot() + '/project.Web.Core/project.Web.Core.csproj'),
      this.destinationPath(this.props.appName + '.Web.Core/' + this.props.appName + '.Web.Core.csproj')
    );
    mkdirp.sync(this.destinationPath(this.props.appName + '.Web.Core/Authentication/'));
    this.fs.copy(
      this.templatePath(this.sourceRoot() + '/project.Web.Host/project.Web.Host.csproj'),
      this.destinationPath(this.props.appName + '.Web.Host/' + this.props.appName + '.Web.Host.csproj')
    );
    if (this.props.createSln) this._writeSolution();
  }

  _writeSolution() {
    var sln = this.fs.read(this.sourceRoot() + '/project.sln');
    var newSln = sln.split('project.').join(this.props.appName + '.');
    this.fs.write(this.destinationPath(this.props.appName + '.sln'), newSln);
  }

  install() {
    //this.installDependencies();
  }
};
