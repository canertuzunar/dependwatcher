import node from '../npm_and_yarn/packageManagerIdentifier/node';
import php from '../composer/packageManagerIdentifier/php';
import python from '../python/packageManagerIdentifier/python';

export type PackageManagerType = {
  language: string | Array<string>;
  pkgManagers: Array<string>;
  pkgManagerFiles: Array<string>;
};

const packageManagerConf: Array<PackageManagerType> = [node, php, python];

export default packageManagerConf;
