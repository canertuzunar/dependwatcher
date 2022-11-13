import semver from 'semver';

/**
 *
 * @param localVersion
 * @param latestVersion
 * @returns boolean
 *
 */
function versionCompare(localVersion: string, latestVersion: string): boolean {
  try {
    const semLocalVersion = semver.valid(semver.coerce(localVersion));

    const semLatestVersion = semver.valid(semver.coerce(latestVersion));

    return semver.lt(semLocalVersion!, semLatestVersion!) ? true : false;
  } catch (error) {
    return false;
  }
}

export default versionCompare;
