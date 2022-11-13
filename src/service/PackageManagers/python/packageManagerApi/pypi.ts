/**
 * @param packageName
 * @returns string or undefined
 * pypi => python package repository
 * has json api and has field for latest version => {"version": x.x.x}
 * pypi docs => https://warehouse.pypa.io/
 * pypi api docs => https://warehouse.pypa.io/api-reference/json.html#project
 * pypi registry endpoint => https://pypi.org/pypi/<packageName>/json
 */
import fetch from 'isomorphic-fetch';

export default {
  getLatestVersion: async (packageName: string): Promise<string | undefined> => {
    const packageInfo = await fetch(`https://pypi.org/pypi/${packageName}/json`);
    const packageInfoJSON = await packageInfo.json();
    const latestVersion = packageInfoJSON.info.version;
    return latestVersion;
  },
};
