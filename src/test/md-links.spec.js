const {mdLinks, validateLinks, readDirectoryMd} = require('../index');
const path = require('path'); 

describe('mdLinks', () => {
  it('should resolve with the absolute path when the file/directory exists', () => {
    const filePath = './src/test/links.md';
    const options = {};
    return mdLinks(filePath, options).then((links) => {
      expect(Array.isArray(links)).toBe(true);
      expect(links.length).toBeGreaterThan(0);
      expect(links[0]).toHaveProperty('file', path.resolve(filePath)); 
    });
  });
  
  it('should reject with an error when the file/directory does not exist', () => {
    const filePath = 'nonexistent.md';
    const options = {};
    return expect(mdLinks(filePath, options)).rejects.toThrow(/ENOENT/);
  });

  it('should reject with an error when the file is not a Markdown file', () => {
    const filePath = './src/test/test.txt'; 
    const options = {};
    const expectedErrorMessage = 'Incompatible file: not a Markdown file.';
    return expect(mdLinks(filePath, options)).rejects.toThrow(expectedErrorMessage);
  });

  it('should resolve with an array of links when the file is a Markdown file', () => {
    const filePath = './src/test/links.md'; 
    const options = {};
    return mdLinks(filePath, options).then((links) => {
      expect(Array.isArray(links)).toBe(true);
      expect(links.length).toBeGreaterThan(0);
      expect(links[0]).toHaveProperty('href');
      expect(links[0]).toHaveProperty('text');
      expect(links[0]).toHaveProperty('file');
    });
  });

  it('should resolve with an array of links with validation when --validate option is provided', () => {
    const filePath = './src/test/links.md'; 
    const options = { validate: true };
    return mdLinks(filePath, options).then((links) => {
      expect(Array.isArray(links)).toBe(true);
      expect(links.length).toBeGreaterThan(0);
      expect(links[0]).toHaveProperty('href');
      expect(links[0]).toHaveProperty('text');
      expect(links[0]).toHaveProperty('file');
      expect(links[0]).toHaveProperty('status');
      expect(links[0]).toHaveProperty('ok');
    });
  });

  it('should reject with an error when no links are found in the file', () => {
    const filePath = './src/test/empty.md'; 
    const options = {};
    return expect(mdLinks(filePath, options)).rejects.toThrow(/No links found/);
  });
});

describe('validateLinks', () => {
  it('should resolve with an array of validated links when all links are valid', () => {
    const links = [
      { href: 'https://www.google.com/', text: 'Google', file: 'example.md' },
      { href: 'https://www.openai.com/', text: 'OpenAI', file: 'example.md' },
    ];
    return validateLinks(links).then((validatedLinks) => {
      validatedLinks.forEach((link) => {
        expect(link.status).toBe(200);
        expect(link.ok).toBe('ok');
      });
    });
  });

  it('should resolve with an array of validated links with "fail" status when at least one link is invalid', () => {
    const links = [
      { href: 'https://www.google.com/', text: 'Google', file: 'example.md' },
      { href: 'https://www.invalidurl.com/', text: 'Invalid URL', file: 'example.md' },
    ];
    return validateLinks(links).then((validatedLinks) => {
      validatedLinks.forEach((link) => {
        if (link.href === 'https://www.google.com/') {
          expect(link.status).toBe(200);
          expect(link.ok).toBe('ok');
        } else {
          expect(link.status).toBe(404);
          expect(link.ok).toBe('fail');
        }
      });
    });
  });
});

describe('readDirectoryMd', () => {
  it('should resolve with an array of file contents when given a directory with .md files', () => {
    const directoryPath = './src/test/test-dir';
    return readDirectoryMd(directoryPath).then((fileContents) => {
      expect(fileContents).toHaveLength(2);
      expect(fileContents[0]).toContain('This is a sample markdown file.');
      expect(fileContents[1]).toContain('Another markdown file content.');
    });
  });
  
  it('should resolve with an empty array when given a directory with no .md files', () => {
    const directoryPath = './src/test/empty-dir';
    return readDirectoryMd(directoryPath).then((fileContents) => {
      expect(fileContents).toHaveLength(0);
    });
  });

  it('should reject with an error when the directory does not exist', () => {
    const directoryPath = './src/test/fixtures/non_existent_directory';
    return expect(readDirectoryMd(directoryPath)).rejects.toThrow(/no such file or directory/);
  });
});

