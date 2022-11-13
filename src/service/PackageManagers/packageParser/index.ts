import FileTypes from './FileTypes/filetypes';
import FileParser from './parser';
import node from '../npm_and_yarn/packageManagerConf/node';
import php from '../composer/packageManagerConf/php';
import python from '../python/packageManagerConf/python';
type PackageParseType = {
  dependenciesKey: string;
  devDependenciesKey: string;
  fileType: FileTypes;
};
const fileParserMap = new Map<string, PackageParseType>();
fileParserMap.set('node', node);
fileParserMap.set('php', php);
fileParserMap.set('python', python);
export default function packageParser(pkgProvider: string, text: string): Record<string, string> {
  const parserConfiguration = fileParserMap.get(pkgProvider);
  if (!parserConfiguration) throw new Error('Undefined File Type. Parser Not Implemented');
  const { devDependenciesKey, dependenciesKey, fileType } = parserConfiguration;
  const parser = FileParser[fileType];
  const pkgFileObj = parser(text); //define interface for json and plain text
  return {
    ...pkgFileObj[dependenciesKey],
    ...pkgFileObj[devDependenciesKey],
  };
}
