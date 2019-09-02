const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const PackageCreator = require('../src/PackageCreator');

const { expect } = chai;
chai.use(sinonChai);

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

  describe('stubbed user prompts', () => {
    beforeEach(() => {
      packageCreator.closeFileReader();
      packageCreator.promptUser = sinon.stub();
      packageCreator.promptUser.returns(true);
    });

    describe('getPackageNameFromUser', () => {
      it('prompts with correct question', () => {
        packageCreator.getPackageNameFromUser();
        expect(packageCreator.promptUser.called).to.equal(true);
        expect(packageCreator.promptUser).to.have.been.calledWith('Package Name: ');
      });

      it('returns result of promptUser', () => {
        const res = packageCreator.getPackageNameFromUser();
        expect(res).to.equal(true);
      });
    });

    describe('getDescriptionFromUser', () => {
      it('prompts with correct question', () => {
        packageCreator.getDescriptionFromUser();
        expect(packageCreator.promptUser.called).to.equal(true);
        expect(packageCreator.promptUser).to.have.been.calledWith('Description: ');
      });

      it('returns result of promptUser', () => {
        const res = packageCreator.getDescriptionFromUser();
        expect(res).to.equal(true);
      });
    });

    describe('getAuthorFromUser', () => {
      it('prompts with correct question', () => {
        packageCreator.getAuthorFromUser();
        expect(packageCreator.promptUser.called).to.equal(true);
        expect(packageCreator.promptUser).to.have.been.calledWith('Author: ');
      });

      it('returns result of promptUser', () => {
        const res = packageCreator.getAuthorFromUser();
        expect(res).to.equal(true);
      });
    });
  });
});
