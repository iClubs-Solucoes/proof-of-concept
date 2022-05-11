const { promises: fs } = require('fs');
const sam = require('./params.json');

const ACCOUNT_ID = '';

function returnType(key, value, father) {
  if (key === 'parameter_overrides' || key === 'tags') {
    let str = `${key} = "`;
    for (_ in value) {
      str += `${_}=\\"${value[_]}\\" `;
    }
    return { string: `${str}"\n`, child: null };
  }

  if (key === 'image_repositories') {
    let str = 'image_repositories = [';
    for (x of value) {
      str += value[x] + ',';
    }
    if (value.length > 0) str = str.slice(0, -1);
    str += ']\n';
    return { string: str, child: null };
  }

  if (typeof value !== 'object') {
    let str = `${key} = ${value}\n`;
    if (typeof value === 'string') {
      str = `${key} = "${value}"\n`;
    }
    return { string: str, child: null };
  } else {
    if (father) {
      return { string: `[${father}.${key}]\n`, child: value, father: `${father}.${key}` };
    }
    return { string: `[${key}]\n`, child: value, father: key };
  }
}

function percorre(object, father) {
  const array = [];
  for (key in object) {
    array.push(returnType(key, object[key], father));
  }
  return array;
}

function percorreChild(object, str, father) {
  const secundary = percorre(object, father);
  for (l of secundary) {
    str += l.string;
    if (l.child) {
      str = percorreChild(l.child, str, l.father);
    }
  }
  return str;
}

function createStringFile() {
  let str = '';
  array = percorre(sam);
  for (line of array) {
    str += line.string;
    if (line.child) {
      str = percorreChild(line.child, str, line.father);
    }
  }
  return str;
}

async function write(str, file) {
  await fs.writeFile(file, str, { encoding: 'utf8' });
}

const PATH = '{PATH}';

function dockerPipe() {
  const _REGION = `${sam.default.deploy.parameters.region}`;
  const _ECR_URI = `${ACCOUNT_ID}.dkr.ecr.${_REGION}.amazonaws.com`;
  const _REPOSITORY_NAME = `${sam.default.deploy.parameters.parameter_overrides.ECRRepositoryName}`;
  const _IMAGE_TAG = 'latest';
  const _IMAGE = `${_ECR_URI}/${_REPOSITORY_NAME}:${_IMAGE_TAG}`;

  str = `docker build -t ${_IMAGE} .

aws ecr get-login-password --region ${_REGION} | docker login --username AWS --password-stdin ${_ECR_URI}

docker push ${_IMAGE}`;
  return str;
}

(async function main() {
  string = createStringFile();
  await write(string, `${PATH}/samconfig.toml`);
  await write(dockerPipe(), `${PATH}/docker_pipe.sh`);
})();
