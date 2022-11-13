import github from './identifier/github';

type ProviderType = Record<string, string>;

const confs = { github };

function detectProviders(adress: string): ProviderType {
  for (const [provider, conf] of Object.entries(confs)) {
    const regex = new RegExp(conf.httpRegex);
    const matches = regex.exec(adress);
    if (matches) {
      const repoName = matches[1];
      return { provider, repoName };
    }
  }
  throw new Error(`invalid adress: ${adress}`);
}

export default detectProviders;
