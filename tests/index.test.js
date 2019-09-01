const { expect } = require('chai');
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
});
