import detectProviders from '../src/service/gitProviders/index';

describe('provider and repo identifier', () => {
  it('should return provider and repo name', () => {
    const link = 'https://github.com/canertuzunar/dependbot';
    const correctResult = {
      provider: 'github',
      repoName: 'canertuzunar/dependbot',
    };
    const result = detectProviders(link);
    expect(result).toStrictEqual(correctResult);
  });
});
