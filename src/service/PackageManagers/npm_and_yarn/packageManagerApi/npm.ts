import fetch from 'isomorphic-fetch';

/**
 * @param packageName
 * @returns string or undefined
 * npm is flagged latest version of package
 * npm have two objects for version information => versions, dist-tags
 * dist-tags contain latest distribution version so i dont need compare and
 * find greatest or latest version
 */

export default {
  getLatestVersion: async (packageName: string): Promise<string | undefined> => {
    const packageInfo = await fetch(`https://registry.npmjs.com/${packageName}`);
    const packageInfoJSON = await packageInfo.json();
    const latestVersion = packageInfoJSON['dist-tags'].latest;
    return latestVersion;
  },
};
