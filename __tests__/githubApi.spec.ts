import * as github from '../src/service/gitProviders/gitProviderApis/github/github';

const mockData = {
  name: 'react-ghost-loader',
  version: '1.0.0',
  description: 'react app helper for loader',
  main: 'dist/GhostLoader.js',
  scripts: {
    test: 'jest --config ./jest.config.js',
    build: 'webpack --mode production',
    storybook: 'start-storybook -p 6006',
    'build-storybook': 'build-storybook',
    'publish-storybook': 'storybook-to-ghpages',
  },
  repository: {
    type: 'git',
    url: 'https://github.com/canertuzunar/react-ghost-loader.git',
  },
  keywords: ['react', 'sekelton', 'loader', 'ghost', 'preload'],
  author: 'Caner Tuzunar <tuzunarcaner@gmail.com>',
  license: 'MIT',
  peerDependencies: {
    react: '^17.0.1',
  },
  devDependencies: {
    '@babel/core': '^7.13.10',
    '@babel/preset-env': '^7.13.10',
    '@babel/preset-flow': '^7.12.13',
    '@babel/preset-react': '^7.12.13',
    '@storybook/addon-actions': '^6.1.21',
    '@storybook/addon-essentials': '^6.1.21',
    '@storybook/addon-links': '^6.1.21',
    '@storybook/react': '^6.1.21',
    '@storybook/storybook-deployer': '^2.8.7',
    '@testing-library/react': '^11.2.6',
    'babel-loader': '^8.2.2',
    'css-loader': '^5.1.2',
    jest: '^26.6.3',
    react: '^17.0.1',
    'react-dom': '^17.0.1',
    'style-loader': '^2.0.0',
    webpack: '^5.24.4',
    'webpack-cli': '^4.5.0',
  },
  dependencies: {},
};

describe('github api testes', () => {
  it('should fetch base64 file from github and parse it to utf8', async () => {
    const text = await github.findPackageManagerFile(
      'canertuzunar/react-ghost-loader',
      'package.json',
    );
    expect(JSON.parse(text as string)).toStrictEqual(mockData);
  });
  it('if there is no file it must return undefined', async () => {
    const text = await github.findPackageManagerFile('repo/name', 'package.json');
    expect(text).toBeUndefined();
  });
});
