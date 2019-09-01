const { expect } = require('chai');
const sinon = require('sinon');
const PackageCreator = require('../src/PackageCreator');

describe('PackageCreator', () => {
  let packageCreator;
  beforeEach(() => {
    packageCreator = new PackageCreator();
  });

  afterEach(() => {
    packageCreator.closeFileReader();
  });

  describe('constructor', () => {
    it('should set default packageName', () => {
      expect(packageCreator.packageName).to.equal('my-react-package');
    });

    it('should set default description', () => {
      expect(packageCreator.description).to.equal('My react package');
    });

    it('should set default author', () => {
      expect(packageCreator.author).to.equal('Me');
    });

    it('should create filereader', () => {
      expect(packageCreator.rl).to.not.equal(null);
      expect(packageCreator.rl.input).to.equal(process.stdin);
      expect(packageCreator.rl.output).to.equal(process.stdout);
    });
  });

  describe('setters', () => {
    it('should set the packageName', () => {
      packageCreator.setPackageName('test-package-name');
      expect(packageCreator.packageName).to.equal('test-package-name');
    });

    it('should set the description', () => {
      packageCreator.setDescription('Test Description');
      expect(packageCreator.description).to.equal('Test Description');
    });

    it('should set the author', () => {
      packageCreator.setAuthor('Test Author');
      expect(packageCreator.author).to.equal('Test Author');
    });
  });

  describe('validation', () => {
    beforeEach(() => {
      packageCreator.closeFileReader();
      packageCreator.closeFileReader = sinon.stub();
    });

    it('should disallow package names with spaces', () => {
      const reject = sinon.stub();
      packageCreator.validatePackageName('Test Package', reject);
      expect(packageCreator.closeFileReader.called).to.equal(true);
      expect(reject.called).to.equal(true);
    });

    it('should allow package names without spaces', () => {
      const reject = sinon.stub();
      packageCreator.validatePackageName('TestPackage', reject);
      expect(packageCreator.closeFileReader.called).to.equal(false);
      expect(reject.called).to.equal(false);
    });
  });
});
