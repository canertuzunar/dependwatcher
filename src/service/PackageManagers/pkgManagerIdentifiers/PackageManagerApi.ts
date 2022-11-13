import npm from '../npm_and_yarn/packageManagerApi/npm';
import packagist from '../composer/packageManagerApi/packagist';
import pypi from '../python/packageManagerApi/pypi';

type PackageManagerApiType = {
  getLatestVersion: (packageName: string) => Promise<string | undefined>;
};

const PackageManagerApi = new Map<string, PackageManagerApiType>();

PackageManagerApi.set('npm', npm);
PackageManagerApi.set('packagist', packagist);
PackageManagerApi.set('pip', pypi);

export default PackageManagerApi;
