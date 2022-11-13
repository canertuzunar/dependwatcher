import fetch from 'isomorphic-fetch';

export default {
  /**
   * @param packageName
   * @returns string or *
   * fetch package information to package manager registry
   */
  getLatestVersion: async (packageName: string): Promise<string | undefined> => {
    /**
     * composer.json contain extension modules and php version but registry has not
     * any information or I can't find it so this condition check packageName equal
     * php or built-in module names
     */
    if (['php', 'ext-ctype', 'ext-filter', 'ext-hash', 'ext-fileinfo'].includes(packageName)) {
      return '*';
    }
    const packageInfo = await fetch(`https://repo.packagist.org/p2/${packageName}.json`);
    const packageInfoJSON = await packageInfo.json();
    const { packages } = packageInfoJSON;
    if (packages[packageName].length > 0) {
      return packages[packageName][0].version;
    }
    return '*';
  },
};
