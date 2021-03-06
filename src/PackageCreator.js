const readline = require('readline');
const fs = require('fs');
const { ncp } = require('ncp');
const path = require('path');
const childProcess = require('child_process');

class PackageCreator {
  constructor() {
    this.packageName = 'my-react-package';
    this.description = 'My react package';
    this.author = 'Me';
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  setPackageName(packageName) {
    this.packageName = packageName;
  }

  setDescription(description) {
    this.description = description;
  }

  setAuthor(author) {
    this.author = author;
  }

  validatePackageName(packageName, reject) {
    if (packageName.indexOf(' ') >= 0) {
      this.closeFileReader();
      reject('Package name must not include spaces');
    }
  }

  promptUser(question, handler) {
    return new Promise((resolve, reject) => {
      this.rl.question(question, (res) => {
        handler(res, resolve, reject);
      });
    });
  }

  getPackageNameFromUser() {
    return this.promptUser('Package Name: ', (res, resolve, reject) => {
      this.validatePackageName(res, reject);
      if (res) this.setPackageName(res);
      resolve();
    });
  }

  getDescriptionFromUser() {
    return this.promptUser('Description: ', (res, resolve) => {
      if (res) this.setDescription(res);
      resolve();
    });
  }

  getAuthorFromUser() {
    return this.promptUser('Author: ', (res, resolve) => {
      if (res) this.setAuthor(res);
      resolve();
    });
  }

  updatePackageJSON() {
    try {
      const jsonString = fs.readFileSync(path.join(__dirname, '../boilerplate/package.json'));
      const packageJSON = JSON.parse(jsonString);
      packageJSON.name = this.packageName;
      packageJSON.description = this.description;
      packageJSON.author = this.author;
      const packageJSONString = JSON.stringify(packageJSON, null, 2);
      fs.writeFile(`./${this.packageName}/package.json`, packageJSONString, (err) => {
        if (err) {
          console.log('Error writing file', err);
        } else {
          console.log('Installing Dependencies..');
          childProcess.execSync(`cd ${this.packageName} && npm i`, { stdio: [0, 1, 2] });
          console.log('\x1b[32mSuccess!🎉');
          console.log('Created Package:', this.packageName);
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  generateFiles() {
    console.log('Creating files');
    fs.mkdirSync(this.packageName);
    // Copy the code into it
    const that = this;
    ncp(path.join(__dirname, '../boilerplate'), `./${this.packageName}`, (err) => {
      if (err) {
        console.error(err);
      } else {
        that.updatePackageJSON();
      }
    });
  }

  closeFileReader() {
    this.rl.close();
  }

  async makePackage() {
    try {
      await this.getPackageNameFromUser();
      await this.getDescriptionFromUser();
      await this.getAuthorFromUser();
    } catch (e) {
      console.log(`\x1b[31m${e}`);
      return;
    }
    this.closeFileReader();
    this.generateFiles();
  }
}

module.exports = PackageCreator;
