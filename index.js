#!/usr/bin/env node
const readline = require('readline');
const fs = require('fs');
const { ncp } = require('ncp');

class PackageCreator {
  constructor() {
    this.packageName = 'my-react-package';
    this.description = 'My react package';
    this.author = 'Me';
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  setPackageName() {
    return new Promise((resolve, reject) => {
      this.rl.question('Package Name: ', (res) => {
        if (res) this.packageName = res;
        resolve();
      });
    });
  }

  setDescription() {
    return new Promise((resolve, reject) => {
      this.rl.question('Description: ', (res) => {
        if (res) this.description = res;
        resolve();
      });
    })
  }

  setAuthor() {
    return new Promise((resolve, reject) => {
      this.rl.question('Author: ', (res) => {
        if (res) this.author = res;
        resolve();
      });
    })
  }

  updatePackageJSON() {
    try {
      const jsonString = fs.readFileSync('./skeleton/package.json')
      const packageJSON = JSON.parse(jsonString)
      packageJSON.name = this.packageName;
      packageJSON.description = this.description;
      packageJSON.author = this.author;
      const packageJSONString = JSON.stringify(packageJSON, null, 2);
      fs.writeFile(`./${this.packageName}/package.json`, packageJSONString, err => {
          if (err) {
              console.log('Error writing file', err)
          } else {
              console.log('Successfully wrote file')
          }
      })
    } catch(err) {
      console.log(err)
      return
    }
  }

  generateFiles() {
    fs.mkdirSync(this.packageName);
    // Copty the code into it
    const that = this;
    ncp('./skeleton', `./${this.packageName}`, function (err) {
      if (err) {
        return console.error(err);
      }
      that.updatePackageJSON();
    });
  }

  closeFileReader() {
    this.rl.close();
  }

  async makePackage() {
    await this.setPackageName();
    await this.setDescription();
    await this.setAuthor();
    this.closeFileReader();
    this.generateFiles();
  }
};

let pc = new PackageCreator();
pc.makePackage();
