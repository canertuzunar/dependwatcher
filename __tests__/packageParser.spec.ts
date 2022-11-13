import parser from '../src/service/PackageManagers/packageParser/index';

describe("package manager's file parser", () => {
  it('must successfuly parse package.json', () => {
    const unparsedPackageJSON = `
    {
  "name": "dependbot",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "npx tsc && node dist/app.js",
    "test": "jest --runInBand",
    "lint:tsc": "tsc",
    "lint:eslint": "eslint 'src/**/*.ts'",
    "lint": "yarn lint:tsc && yarn lint:eslint",
    "format": "prettier --write 'src/**/*.ts' && yarn lint:eslint --fix"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@bull-board/express": "^3.9.0",
    "axios": "^0.25.0",
    "body-parser": "^1.19.1",
    "bull": "^4.2.1",
    "dotenv": "^14.2.0",
    "express": "^4.17.2",
    "isomorphic-fetch": "^3.0.0",
    "moment": "^2.29.1",
    "node-fetch": "2",
    "nodemailer": "^6.7.2",
    "pt2json": "^2.0.0",
    "semver": "^7.3.5"
  },
  "devDependencies": {
    "@types/body-parser": "^1.19.2",
    "@types/bull": "^3.15.7",
    "@types/express": "^4.17.13",
    "@types/isomorphic-fetch": "^0.0.35",
    "@types/jest": "^26.0.3",
    "@types/node": "^17.0.8",
    "@types/node-fetch": "^3.0.3",
    "@types/nodemailer": "^6.4.4",
    "@types/semver": "^7.3.9",
    "@typescript-eslint/eslint-plugin": "^5.0.0",
    "@typescript-eslint/parser": "^5.0.0",
    "eslint": "^8.7.0",
    "eslint-config-prettier": "^8.3.0",
    "eslint-plugin-eslint-comments": "^3.2.0",
    "eslint-plugin-import": "^2.25.4",
    "eslint-plugin-jsx-a11y": "^6.3.1",
    "eslint-plugin-prettier": "^4.0.0",
    "jest": "^27.4.7",
    "prettier": "^2.5.1",
    "ts-jest": "^26.1.1",
    "ts-node": "^10.4.0",
    "typescript": "^4.5.4"
  }
}`;

    const resultPackageFile = {
      '@types/body-parser': '^1.19.2',
      '@types/bull': '^3.15.7',
      '@types/express': '^4.17.13',
      '@types/isomorphic-fetch': '^0.0.35',
      '@types/jest': '^26.0.3',
      '@types/node': '^17.0.8',
      '@types/node-fetch': '^3.0.3',
      '@types/nodemailer': '^6.4.4',
      '@types/semver': '^7.3.9',
      '@typescript-eslint/eslint-plugin': '^5.0.0',
      '@typescript-eslint/parser': '^5.0.0',
      eslint: '^8.7.0',
      'eslint-config-prettier': '^8.3.0',
      'eslint-plugin-eslint-comments': '^3.2.0',
      'eslint-plugin-import': '^2.25.4',
      'eslint-plugin-jsx-a11y': '^6.3.1',
      'eslint-plugin-prettier': '^4.0.0',
      jest: '^27.4.7',
      prettier: '^2.5.1',
      'ts-jest': '^26.1.1',
      'ts-node': '^10.4.0',
      typescript: '^4.5.4',
      '@bull-board/express': '^3.9.0',
      axios: '^0.25.0',
      'body-parser': '^1.19.1',
      bull: '^4.2.1',
      dotenv: '^14.2.0',
      express: '^4.17.2',
      'isomorphic-fetch': '^3.0.0',
      moment: '^2.29.1',
      'node-fetch': '2',
      nodemailer: '^6.7.2',
      pt2json: '^2.0.0',
      semver: '^7.3.5',
    };
    const parsedPackageFile = parser('node', unparsedPackageJSON);

    expect(resultPackageFile).toStrictEqual(parsedPackageFile);
  });
});