import fetch from 'isomorphic-fetch';

/**
 *
 * @param repoName;
 * @param fileName;
 * @returns string;
 */

export const findPackageManagerFile = async (
  repoName: string,
  fileName: string,
): Promise<string | undefined> => {
  const repoFileStructure = await fetch(
    `https://api.github.com/repos/${repoName}/contents/${fileName}`,
  );
  const repoFileStructureJSON: any = await repoFileStructure.json();
  if (repoFileStructureJSON.message) {
    console.log(repoFileStructureJSON.message);
    return undefined;
  }
  const deleteUnnecessaryNewLine = repoFileStructureJSON.content.replace('\n', '');
  const decodePackageManagerFile = Buffer.from(deleteUnnecessaryNewLine, 'base64');
  return decodePackageManagerFile.toString('utf-8');
};
