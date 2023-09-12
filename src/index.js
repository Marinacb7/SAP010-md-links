const fs = require('fs').promises;
const path = require('path');
const fetch = require('cross-fetch');

function mdLinks(filePath, options = { validate: false }) {
  // Verificar se a rota é relativa e converter em absoluta
  const absolutePath = path.resolve(filePath);

  return new Promise((resolve, reject) => {
    // Verificar se o arquivo/diretório existe
    fs.access(absolutePath)
      .then(() => {
        // Verificar a extensão do arquivo
        if (path.extname(absolutePath).toLowerCase() !== '.md') {
          reject(new Error('Incompatible file: not a Markdown file.'));
          return;
        }

        fs.stat(absolutePath)
          .then((stats) => {
            if (stats.isDirectory()) {
              return readDirectoryMd(absolutePath);
            } else if (stats.isFile()) {
              return fs.readFile(absolutePath, 'utf-8');
            }
          })
          .then((content) => {
            // Encontrar links no conteúdo do arquivo
            const links = [];
            const regex = /\[([^\]]+)\]\((http[s]?:\/\/[^\)]+)\)/g;
            let match = regex.exec(content);

            while (match !== null) {
              const [, text, href] = match;
              links.push({ href, text, file: absolutePath });
              match = regex.exec(content);
            }

            if (links.length === 0) {
              reject(new Error('No links found in this file.'));
            } else {
              if (options.validate) {
                validateLinks(links)
                  .then((validatedLinks) => {
                    resolve(validatedLinks);
                  })
                  .catch(reject);
              } else {
                resolve(links);
              }
            }
          })
          .catch(reject);
      })
      .catch(reject);
  });
}

function validateLinks(arrayLinks) {
  const promises = arrayLinks.map((link) => {
    return fetch(link.href)
      .then((response) => {
        link.status = response.status;
        link.ok = response.ok ? 'ok' : 'fail';
        return link;
      })
      .catch(() => {
        link.status = 404;
        link.ok = 'fail';
        return link;
      });
  });

  return Promise.all(promises);
}

function readDirectoryMd(directoryPath) {
  return fs.readdir(directoryPath)
    .then((files) => {
      const promises = files.map((file) => {
        const filePath = path.join(directoryPath, file);
        return fs.readFile(filePath, 'utf-8');
      });

      return Promise.all(promises);
    });
}


module.exports = { mdLinks, validateLinks, readDirectoryMd };
