import * as github from './github/github';

type GitServerApiType = {
  findPackageManagerFile: (repoName: string, fileName: string) => Promise<string | undefined>;
};

const gitServerApiMap = new Map<string, GitServerApiType>();
gitServerApiMap.set('github', github);

export default gitServerApiMap;
