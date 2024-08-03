const { ESLint } = require('eslint');

async function removeIgnoredFiles(files) {
  const eslint = new ESLint();

  const isIgnored = await Promise.all(
    files.map((file) => {
      return eslint.isPathIgnored(file);
    })
  );

  const filteredFiles = files.filter((_, i) => !isIgnored[i]);

  return filteredFiles.join(' ');
}

module.exports = {
  '*.ts?(x)': async (files) => {
    try {
      const needToLintfiles = await removeIgnoredFiles(files);

      return [`eslint --fix ${needToLintfiles}`];
    } catch (error) {
      console.error('error: ', error);
    }
  },
  '*.{ts?(x),cjs,json,md,html}': ['prettier --write'],
};
