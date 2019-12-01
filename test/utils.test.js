const {
  replaceSeparator,
  trimDir,
  setDir,
  getLastNumber,
  removeLastNumber,
  sortFilesByLastNumber,
  autoIncrease,
  resolveOutputFile,
} = require('../src/utils');

describe('#replaceSeparator', () => {
  it('can replace back-slash to slash.', () => {
    const file = 'C:\\dir\\subDir\\filename.txt';
    expect(replaceSeparator(file)).toEqual('C:/dir/subDir/filename.txt');
  });

  it('can also replace slash to back-slash.', () => {
    const file = 'C:/dir/filename.txt';
    expect(replaceSeparator(file, '\\')).toEqual('C:\\dir\\filename.txt');
  });
});

describe('#trimDir', () => {
  it('appends slash to last of string', () => {
    expect(trimDir('dir')).toBe('dir/');
    expect(trimDir('dir/')).toBe('dir/');
  });

  it('also works as back-slash', () => {
    expect(trimDir('dir', '\\')).toBe('dir\\');
  });

  it('should return empty if dir parameter is empty.', () => {
    expect(trimDir('', '/')).toBe('');
  });
});

describe('#setDir', () => {
  it('set directory part of path.', () => {
    const path = './example/image.jpg';
    const directory = './good/';
    expect(setDir(path, directory)).toBe('./good/image.jpg');
  });

  it('available only directory name.', () => {
    const path = './example/image.jpg';
    const directory = './good';
    expect(setDir(path, directory)).toBe('./good/image.jpg');
  });

  it('should set directory when only file as path.', () => {
    const path = 'image.jpg';
    const directory = './dir';
    expect(setDir(path, directory)).toBe('./dir/image.jpg');
  });
});

describe('#getLastNumber', () => {
  it('get last number of path.', () => {
    expect(getLastNumber('file 1.mp4')).toEqual('1');
    expect(getLastNumber('file01.mp4')).toEqual('01');
    expect(getLastNumber('file0_1.mp4')).toEqual('1');
    expect(getLastNumber('file-0150.mp4')).toEqual('0150');
  });
});

describe('#removeLastNumber', () => {
  it('removes last number on path.', () => {
    expect(removeLastNumber('dir/filename1.mp4')).toEqual('dir/filename.mp4');
    expect(removeLastNumber('dir/file 01.mp4')).toEqual('dir/file.mp4');
    expect(removeLastNumber('test_00_001.txt')).toEqual('test_00.txt');
  });

  it('does not changes if path has not last number.', () => {
    expect(removeLastNumber('dir/12_monkeys.mp4')).toEqual('dir/12_monkeys.mp4');
  });
});

describe('#sortFilesByLastNumber', () => {
  it('works.', () => {
    const files = [
      'test/video file 01.mp4',
      'test/video file 04.mp4',
      'test/video file 2.mp4',
      'test/video file_5.mp4',
      'test/video file-003.mp4',
    ];
    const sorted = sortFilesByLastNumber(files);
    expect(sorted[4]).toEqual('test/video file_5.mp4');
  });
});

describe('#autoIncrease', () => {
  it('auto increase last number if path is exists.', async () => {
    const newPath = await autoIncrease('./test/utils.test.js');
    expect(newPath).toEqual('./test/utils.test (2).js');
  });
});

describe('#resolveOutputFile', () => {
  it('can set output file name reference from source file name via {source} or {name} template.', () => {
    const source = 'dir/sourceFile123.txt';
    expect(resolveOutputFile('{source}.md', source)).toEqual('sourceFile123.md');
    expect(resolveOutputFile('{name}.md', source)).toEqual('sourceFile123.md');
  });

  it('can also works extension part via {ext} template', () => {
    const source = 'sourceFile.m4a';
    expect(resolveOutputFile('output.{ext}', source)).toEqual('output.m4a');
  });
});
