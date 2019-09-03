# create-npm-react-package
[![Actions Status](https://github.com/maxwfreu/create-npm-react-package/workflows/Tests/badge.svg)](https://github.com/maxwfreu/create-npm-react-package/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/d84f9935c0ab2c7a3bf5/maintainability)](https://codeclimate.com/github/maxwfreu/create-npm-react-package/maintainability)

Easily create react packages to be distributed via NPM.

This package will set you up with a simple starter for your new react component package.

![CLI preview](https://github.com/maxwfreu/create-npm-react-package/blob/master/images/create-npm-react-package.gif?raw=true "CLI preview")

### Installation
```
npm i -g create-npm-react-package
```

### Usage
```
create-npm-react-package
```

### Development
```
cd my-package
npm run start
```
The demo page will be available at localhost:3001

### Deployment
Login to npm with
```
npm login
```

Then, build and publish your package:
```
npm run deploy
```
