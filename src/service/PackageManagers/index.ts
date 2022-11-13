import gitServerApiMap from '../gitProviders/gitProviderApis';
import detectProviders from '../gitProviders';
import packageParser from './packageParser';
import PackageManagerApi from './pkgManagerIdentifiers/PackageManagerApi';
import versionCompare from '../../utils/versionCompare';
import SendMail from '../MailService';
import packageManagerConf, { PackageManagerType } from './pkgManagerIdentifiers/packageManagerConf';
import { SentMessageInfo } from 'nodemailer';

/**
 *
 * @param link
 * @param email
 * @returns mail info
 */

async function runDependBot(
  link: string,
  email?: Array<string> | string,
): Promise<SentMessageInfo> {
  let outdatedPackages = '';
  let packageManagerInfo: PackageManagerType | undefined;
  let repoContent: string | undefined;
  //detect provider and repository name
  const { repoName, provider } = detectProviders(link);

  const gitProviderApi = gitServerApiMap.get(provider);
  for (const packageManagerConfiguration of packageManagerConf) {
    const file = await gitProviderApi!.findPackageManagerFile(
      repoName,
      packageManagerConfiguration.pkgManagerFiles[0],
    );
    if (file) {
      //if git provider API function get any correct data, the loop is broken and package manager configuration and file content assign the variables
      packageManagerInfo = packageManagerConfiguration;
      repoContent = file;
      break;
    }
  }
  const parsedPackage = packageParser(packageManagerInfo!.language[0], repoContent!);
  const data = Object.entries(parsedPackage);

  //seperate package name and package version of data
  for (const [packageName, version] of data) {
    const register = PackageManagerApi.get(packageManagerInfo!.pkgManagers[0]);
    const latestVersion = await register!.getLatestVersion(packageName);
    if (versionCompare(version, latestVersion!)) {
      //concat string informatoin about of outdate package
      outdatedPackages += `this package <b>${packageName}</b> is outdated = <span style="color:red;">${version}</span> => <span style="color:green;">${latestVersion}</span> </br>`;
      console.log(`this package <${packageName}> is outdated = ${version} => ${latestVersion}`);
    }
  }
  //send outdated repo information to mail or mail list
  return SendMail(repoName, outdatedPackages, email);
}

export default runDependBot;
