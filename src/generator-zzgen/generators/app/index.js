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
    this._writeDomainModel();
    this._writeRepositories();
    this._writeServices();
    this._writeUseCases();
    this._writeCore();
    this._writeHost();
    if (this.props.createSln) this._writeSolution();
  }

  _writeDomainModel() {
    var sln = this.fs.read(this.sourceRoot() + '/project.DomainModel/project.DomainModel.csproj');
    var newSln = sln.split('project.').join(this.props.appName + '.');
    this.fs.write(this.destinationPath(this.props.appName + '.DomainModel/' + this.props.appName + '.DomainModel.csproj'), newSln);
  }

  _writeRepositories() {
    var sln = this.fs.read(this.sourceRoot() + '/project.Repositories/project.Repositories.csproj');
    var newSln = sln.split('project.').join(this.props.appName + '.');
    this.fs.write(this.destinationPath(this.props.appName + '.Repositories/' + this.props.appName + '.Repositories.csproj'), newSln);
    mkdirp.sync(this.destinationPath(this.props.appName + '.Repositories/Interfaces/'));
    mkdirp.sync(this.destinationPath(this.props.appName + '.Repositories/Repositories/'));
  }

  _writeServices() {
    var sln = this.fs.read(this.sourceRoot() + '/project.Services/project.Services.csproj');
    var newSln = sln.split('project.').join(this.props.appName + '.');
    this.fs.write(this.destinationPath(this.props.appName + '.Services/' + this.props.appName + '.Services.csproj'), newSln);
    mkdirp.sync(this.destinationPath(this.props.appName + '.Services/Interfaces/'));
    mkdirp.sync(this.destinationPath(this.props.appName + '.Services/Services/'));
  }

  _writeUseCases() {
    var sln = this.fs.read(this.sourceRoot() + '/project.UseCases/project.UseCases.csproj');
    var newSln = sln.split('project.').join(this.props.appName + '.');
    this.fs.write(this.destinationPath(this.props.appName + '.UseCases/' + this.props.appName + '.UseCases.csproj'), newSln);
    mkdirp.sync(this.destinationPath(this.props.appName + '.UseCases/Interfaces/'));
    mkdirp.sync(this.destinationPath(this.props.appName + '.UseCases/UseCases/'));
  }

  _writeCore() {
    var sln = this.fs.read(this.sourceRoot() + '/project.Web.Core/project.Web.Core.csproj');
    var newSln = sln.split('project.').join(this.props.appName + '.');
    this.fs.write(this.destinationPath(this.props.appName + '.Web.Core/' + this.props.appName + '.Web.Core.csproj'), newSln);
    mkdirp.sync(this.destinationPath(this.props.appName + '.Web.Core/Authentication/'));
  }

  _writeHost(){
    var sln = this.fs.read(this.sourceRoot() + '/project.Web.Host/project.Web.Host.csproj');
    var newSln = sln.split('project.').join(this.props.appName + '.');
    this.fs.write(this.destinationPath(this.props.appName + '.Web.Host/' + this.props.appName + '.Web.Host.csproj'), newSln);
    this.fs.copy(
      this.templatePath(this.sourceRoot() + '/project.Web.Host/Controllers/'),
      this.destinationPath(this.props.appName + '.Web.Host/Controllers/')
    );
    this.fs.copy(
      this.templatePath(this.sourceRoot() + '/project.Web.Host/Models/'),
      this.destinationPath(this.props.appName + '.Web.Host/Models/')
    );
    this.fs.copy(
      this.templatePath(this.sourceRoot() + '/project.Web.Host/Properties/'),
      this.destinationPath(this.props.appName + '.Web.Host/Properties/')
    );
    this.fs.copy(
      this.templatePath(this.sourceRoot() + '/project.Web.Host/Views/'),
      this.destinationPath(this.props.appName + '.Web.Host/Views/')
    );
    this.fs.copy(
      this.templatePath(this.sourceRoot() + '/project.Web.Host/wwwroot/'),
      this.destinationPath(this.props.appName + '.Web.Host/wwwroot/')
    );
    this.fs.copy(
      this.templatePath(this.sourceRoot() + '/project.Web.Host/appsettings.Development.json'),
      this.destinationPath(this.props.appName + '.Web.Host/appsettings.Development.json')
    );
    this.fs.copy(
      this.templatePath(this.sourceRoot() + '/project.Web.Host/appsettings.json'),
      this.destinationPath(this.props.appName + '.Web.Host/appsettings.json')
    );
    this.fs.copy(
      this.templatePath(this.sourceRoot() + '/project.Web.Host/Program.cs'),
      this.destinationPath(this.props.appName + '.Web.Host/Program.cs')
    );
    this.fs.copy(
      this.templatePath(this.sourceRoot() + '/project.Web.Host/Startup.cs'),
      this.destinationPath(this.props.appName + '.Web.Host/Startup.cs')
    );
    var sln = this.fs.read(this.destinationPath(this.props.appName + '.Web.Host/Views/Shared/_Layout.cshtml'));
    var newSln = sln.split('projectName').join(this.props.appName);
    this.fs.write(this.destinationPath(this.props.appName + '.Web.Host/Views/Shared/_Layout.cshtml'), newSln);
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
