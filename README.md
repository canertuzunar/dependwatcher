# Dependbot

Dependbot, sisteme girilen github depolarının bağımlılıklarının güncelliğini kontrol eder ve güncel olmayan bağımlılıkların listesini verilen mail listesine mail atar.

## İçindekiler

1. [Desteklenen Servisler ve Paket Yöneticileri](#)
   1. [Desktelenen Git Servis Sağlayıcıları](#desktelenen-git-servis-sağlayıcıları)
   2. [Desktelenen Paket Yöneticileri](#desktelenen-paket-yöneticileri)
2. [Git Servis Sağlayıcıları](#git-servis-sağlayıcıları)
   1. [Github](#github)
3. [Paket Yöneticileri](#paket-yöneticileri)
   1. [Npm](#npm)
   2. [Packagist](#packagist)
   3. [Pip](#pip)
4. [Karşılaştığım sorunlar](#karşılaştığım-sorunlar)
5. [Kullanım](#kullanım)
6. [Yeni Paket Yöneticilerine veya Git Servis Sağlayıcılarına Destek Vermek](#yeni-paket-yöneticilerine-veya-git-servis-sağlayıcılarına-destek-vermek)
   1. [Sisteme Git Sağlayıcısı Ekleme](#sisteme-git-sağlayıcısı-ekleme#)
   2. [Sisteme Git Sağlayıcısı Ekleme](#sisteme-git-sağlayıcısı-ekleme)
7. [Kaynakça](#kaynakça)

## Desktelenen Servisler ve Paket Yöneticileri

### <ins>Desktelenen Git Servis Sağlayıcıları</ins>

<img src="./img/GitHub_Logo.png" width="200" heigth="100">

### <ins>Desktelenen Paket Yöneticileri</ins>

<img src="./img/npm.png" width="200" heigth="100">
<img src="./img/pip.png" width="200" heigth="100">
<img src="./img/packagist.png" width="200" heigth="100">

## Git Servis Sağlayıcıları

---

### <ins>Github</ins>

> projenin bilgilerini çekmek için -> api.github.com/repos/**_username_**/**_reponame_**

> spesifik bir dosyanin bilgileri ve base64 formatında kodlanmış halde içeriği -> api.github.com/repos/**_username_**/**_reponame_**/contents/**_managerfile_**

## Paket Yöneticileri

---

#### <ins>Npm</ins>

> paket bilgilerine ulaşmak için -> registry.npmjs.com/**_packageName_**

Dönen objenin içerisinde `dist-tags` içerisinde `latest` alanı altında paketin yayınlanan en son versiyon bilgisi tutuluyor

#### <ins>Packagist</ins>

> paket bilgilerine ulaşmak için -> repo.packagist.org/p2/**_packageName_**.json

Dönen objenin içerisinde `packagest.**_packageName_**[0].version` alanı altında paketin yayınlanan en son versiyon bilgisi tutuluyor.

#### <ins>Pip</ins>

> paket bilgilerine ulaşmak için -> pypi.org/pypi/**_packageName_**/json

Dönen objenin içerisinde `info.version` alanı altında paketin yayınlanan en son versiyon bilgisi tutuluyor

## Karşılaştığım Sorunlar

_Bu yaşadığım sorunlar benim diller ve paket yöneticileri üzerine bilgim olmadığından kaynaklanıyor olabilir fakat sistemin farklı paket yöneticilerine genişletilmesinde bir sorun yok_

**Composer**
Composer dosyasının içinde php ve eklentilerin versiyonları var fakat bunların versiyoları registry üstünde tutulmuyor ve 404 dönüyor bu yüzden sistem hata veriyor bu benim php ve composer üstünde bilgim olmamasından kaynaklanıyor olabilir ben alternatif çözüm olarak yakaladığım eklentileri taramayacak şekilde koşullar koydum

**Sorunsuz Çalışan Örnek Repositoryler:**

- https://github.com/WebDevEtc/BlogEtc
- https://github.com/lufficc/Xblog
- https://github.com/borgert-inc/borgert-cms
- https://github.com/Trimidea/inews
- https://github.com/arnaud-lb/MtHaml

**Pip**
requirements.txt dosyasında paketlerinin sürümlerini belirtmeme veya yanlış versiyonlama(3.04.2 minor versiyonda başında 0 konması) kullanma gibi durumlar var ve paket yöneticisi sanırım bunu denetlemiyor bu yüzden sistem semantic versiyonlamada bir sorun yaşarsa paketi veya paketleri denetlemiyor

**Sorunsuz Çalışan Örnek Repositoryler:**

- https://github.com/zhanghe06/python
- https://github.com/stormsha/blog
- https://github.com/getnikola/nikola
- https://github.com/dylanninin/blog

## Kullanım

Projeyi çalıştırmak için

```bash
docker-compose up --build -d
```

Docker üzerinde çalışmaya başlayan projemize port 5000 üzerinden ulaşılabilir durumda

| endpoint             | body                                                                                                                     | Usage                                                          |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------- |
| /dependbot           | ` {repoAdress: "https://github.com/<user-name>/<repo-name>", mailList:["mailexample@mail.com", mailexample2@gmail.com]}` | güncelliğini yitirmiş paketler ile ilgili anlık mail gönderir  |
| /subscribe/dependbot | ` {repoAdress: "https://github.com/<user-name>/<repo-name>", mailList:["mailexample@mail.com", mailexample2@gmail.com]}` | güncelliğini yitirmiş paketler ile ilgili günlük mail gönderir |

## Yeni Paket Yöneticilerine veya Git Servis Sağlayıcılarına Destek Vermek

### Sisteme Paket Yöneticisi Ekleme

**Cargo**
Rust paket yöneticisi cargo'yu eklemek istersek `src/service/PackageManagers` altına `cargo` klasörü oluşturalım alt klasör olarak `packageManagerApi, packageManagerConf, packageManagerIdentifier, ParserFunction` oluşturalım

```javascript
//packageManagerApi/cargo.ts
import fetch from 'isomorphic-fetch';

export default {
  /**
   * @param packageName
   * @returns string or *
   * fetch package information to package manager registry
   */
  getLatestVersion: async (packageName: string): Promise<string | undefined> => {
    // fetch function to crates.io registry api
  },
};
```

```javascript
//packageManagerConf/rust.ts
import FileTypes from '../../packageParser/FileTypes/filetypes';

export default {
  dependenciesKey: 'dependencies',
  devDependenciesKey: 'dev-dependencies',
  fileType: FileTypes.toml,
};
```

```javascript
//packageManagerIdentifier/rust.ts
export default {
  language: ['rust'],
  pkgManagers: ['cargo'],
  pkgManagerFiles: ['cargo.toml'],
};
```

```javascript
//ParserFunction/tomlParser.ts
/**
 * @param text
 * @returns object
 */
export default function tomlParser(text: string): {
    // toml parser function
}
```

Şuan cargo paket yöneticisinin registrysi olan crates.io ile rust repositorylerinin bağımlılığını kontrol edecek tüm fonksiyonlarımız ve tanımlamalarımız hazır geriye sadece bunları sisteme girmek kalıyor.

```javascript
// ./src/service/PackageManagers/packageParser/FileTypes/filetypes.ts
enum FileTypes {
  json = 'json',
  txt = 'txt',
  toml = 'toml' // toml dosya uzantısı
}

export default FileTypes;
```

```javascript
// ./src/service/PackageManagers/packageParser/FileTypes/parser.ts
import requirenmentParser from '../python/ParserFunction/requirenmentsParser';
import tomlParser from '../cargo/ParserFunction/tomlParser';
export default {
  json: JSON.parse,
  txt: requirenmentParser,
  toml: tomlParser, // parser fonksiyonunu export objesine ekleyelim
};
```

```javascript
// ./src/service/PackageManagers/packageParser/FileTypes/index.ts
import rust from '../rust/packageManagerConf/rust';
...
fileParserMap.set("cargo", rust)
...
```

```javascript
// ./src/service/pkgManagerIdentifiers/PackageManagerApi.ts
import cargo from '../cargo/packageManagerApi/cargo'
...
PackageManagerApi.set('npm', npm);
PackageManagerApi.set('packagist', packagist);
PackageManagerApi.set('pip', pypi);
PackageManagerApi.set('cargo', cargo);//cargo paket yöneticisinin API adreslerini API mapine ekledik
...
```

```javascript
// ./src/service/pkgManagerIdentifiers/PackageManagerConf.ts
...
import rust from '../cargo/packageManagerIdentifier/cargo';

//Cargo paket yöneticisi konfigürasyonunu paket yöneticisi dizisine ekledik
const packageManagerConf: Array<PackageManagerType> = [node, php, python, rust];

export default packageManagerConf;
...
```

Böylece Cargo paket yöneticisi sisteme tamamen entegre edildi.

### Sisteme Git Sağlayıcısı Ekleme

**GitLab**

GitLab ayni GitHub gibi ayni url şeklini kullanıyor /repoOwner/repoName bu yuzden GitHub için kullanılan regex kullanılabilir sadece ilgili hashmap'e kayıt etmek gerekiyor

```javascript
//./src/service/gitProviders/gitProviderApis/gitlab/gitlab.ts
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
  ...
  // GitLab API fonksiyonu
  ...
};
```

```javascript
//./src/service/gitProviders/gitProviderApis/index.ts
import * as gitlab from './gitlab/gitlab';
...

gitServerApiMap.set('gitlab', gitlab); // gitlab apisini hashmap'e kaydediyoruz

...
```

```javascript
import github from './identifier/github';
import gitlab from './identifier/gitlab';

type ProviderType = Record<string, string>;

const confs = { github, gitlab }; // konfigurasyona gitlab regexini ekledik

...
```

## Kaynakça

- [GitHub API](https://docs.github.com/en/rest)
- [Packagist API](https://packagist.org/apidoc)
- [Pip/Pypi](https://warehouse.pypa.io/api-reference/json.html#project)
- [Npm](https://docs.npmjs.com/cli/v8/using-npm/registry)
- [Bull](https://github.com/OptimalBits/bull)
