const {
  replaceSeparator,
  trimDir,
  setDir,
  getLastNumber,
  removeLastNumber,
  naturalSort,
  autoIncrease,
  resolveOutputFile,
  bytesToSize,
  parseSize,
  truncate,
  sanitize,
  filter,
  chunks,
  parseDate,
  diffDays,
  getDates,
} = require('../src/index');

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

  it('could set current dir via "" or "./"', () => {
    expect(setDir('dir/file.txt', '')).toBe('file.txt');
    expect(setDir('dir/file.txt', './')).toBe('./file.txt');
  });
});

describe('#getLastNumber', () => {
  it('get last number of path.', () => {
    expect(getLastNumber('file 1.mp4')).toEqual('1');
    expect(getLastNumber('file01.mp4')).toEqual('01');
    expect(getLastNumber('file0_1.mp4')).toEqual('1');
    expect(getLastNumber('file-0150.mp4')).toEqual('0150');
    expect(getLastNumber('file.mp4')).toEqual('');
  });

  it('should works', () => {
    expect(getLastNumber('test (1).txt')).toEqual('1');
    expect(getLastNumber('test [21].txt')).toEqual('21');
    expect(getLastNumber('2019_test_{11}.txt')).toEqual('11');
    expect(getLastNumber('2019 test.txt')).toEqual('');
  });
});

describe('#removeLastNumber', () => {
  it('removes last number on path.', () => {
    expect(removeLastNumber('dir/filename1.mp4')).toEqual('dir/filename.mp4');
    expect(removeLastNumber('dir/file 01.mp4')).toEqual('dir/file.mp4');
    expect(removeLastNumber('test_00_001.txt')).toEqual('test_00.txt');
    expect(removeLastNumber('test-01.txt')).toEqual('test.txt');
  });

  it('does not changes if path has not last number.', () => {
    expect(removeLastNumber('dir/12_monkeys.mp4')).toEqual('dir/12_monkeys.mp4');
  });

  it('should works also.', () => {
    expect(removeLastNumber('test (1).txt')).toEqual('test.txt');
    expect(removeLastNumber('test [21].txt')).toEqual('test.txt');
    expect(removeLastNumber('2019_test_{11}.txt')).toEqual('2019_test.txt');
    expect(removeLastNumber('2019 test.txt')).toEqual('2019 test.txt');
  });
});

describe('#naturalSort', () => {
  it('works.', () => {
    const files = [
      'test/video file 1.mp4',
      'test/video file 14.mp4',
      'test/video file 2.mp4',
      'test/video file 5.mp4',
      'test/video file 003.mp4',
    ];
    const sorted = [
      'test/video file 1.mp4',
      'test/video file 2.mp4',
      'test/video file 003.mp4',
      'test/video file 5.mp4',
      'test/video file 14.mp4',
    ];
    expect(naturalSort(files)).toEqual(sorted);
  });

  it('works between different file names.', () => {
    const files = [
      'other test 2.mp4',
      'test 14.mp4',
      '2 test 11.mp4',
      'test 2.mp4',
      'other test 15.mp4',
      '2 test 3.mp4',
    ];
    const sorted = [
      '2 test 3.mp4',
      '2 test 11.mp4',
      'other test 2.mp4',
      'other test 15.mp4',
      'test 2.mp4',
      'test 14.mp4',
    ];
    expect(naturalSort(files)).toEqual(sorted);
  });

  it('works also.', () => {
    const files = [
      'test_14.mp4',
      '2 test (11).mp4',
      'test_2.mp4',
      '2 test (3).mp4',
    ];
    const sorted = [
      '2 test (3).mp4',
      '2 test (11).mp4',
      'test_2.mp4',
      'test_14.mp4',
    ];
    expect(naturalSort(files)).toEqual(sorted);
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

describe('#bytesToSize', () => {
  it('works.', () => {
    expect(bytesToSize(0)).toBe('0 Bytes');
    expect(bytesToSize(2048)).toBe('2 KB');
    expect(bytesToSize(1048576)).toBe('1 MB');
  });
});

describe('#parseSize', () => {
  it('works.', () => {
    expect(parseSize('500').bytes).toBe(500);
    expect(parseSize('500bytes').bytes).toBe(500);
    expect(parseSize('2 kb').bytes).toBe(2048);
    expect(parseSize('1MB').bytes).toBe(1048576);
  });

  it('works also with operator', () => {
    const size = parseSize('>2kb');
    expect(size.bytes).toBe(2048);
    expect(size.operator).toBe('>');

    expect(parseSize('<1MB').operator).toBe('<');
    expect(parseSize('<= 1 MB').operator).toBe('<=');
    expect(parseSize('=<1MB').operator).toBe('=<');
    expect(parseSize('>=1MB').operator).toBe('>=');
    expect(parseSize('=>1MB').operator).toBe('=>');
    expect(parseSize('= 1MB').operator).toBe('=');
    expect(parseSize('1MB').operator).toBe('=');
  });

  it('works with float number.', () => {
    expect(parseSize('>= 1.5 Mb').bytes).toBe(1572864);
  });
});

describe('#sanitize', () => {
  it('sanitize string for filename.', () => {
    expect(sanitize(' he*llo?')).toBe('hello');
    expect(sanitize(' he*llo?', ' ')).toBe('he llo');
    expect(sanitize(' he*llo/_<wo:rld')).toBe('hello_world');
    expect(sanitize('https://github.com/')).toBe('github.com');
    expect(sanitize('string\btest', ' ')).toBe('string test');
  });
});

describe('#truncate', () => {
  it('truncate string', () => {
    expect(truncate('1234567890', 6)).toBe('12345…');
    expect(truncate('1234567890', 8, '...')).toBe('12345...');
    expect(truncate('a가나다라bcd', 3, '')).toBe('a가나');
  });
});

describe('#filter', () => {
  it('works.', async () => {
    const arr = [1, 2, 3, 4, 5];
    const doSomething = () => Promise.resolve();

    const res = await filter(arr, async v => {
      await doSomething();
      return (v % 2) == 1;
    });
    expect(res).toStrictEqual([1, 3, 5]);
  });

  it('index arg test', async () => {
    const arr = [1, 2, 3, 4, 5];
    const doSomething = () => Promise.resolve();

    const res = await filter(arr, async (v, i) => {
      await doSomething();
      return (i % 2) == 1;
    });
    expect(res).toStrictEqual([2, 4]);
  });
});

describe('#chunks', () => {
  it('works.', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    expect(chunks(arr, 3)).toStrictEqual([[1, 2, 3], [4, 5, 6], [7, 8, 9], [0]]);
  });

  it('if set size to 0, chunk size is arr.length', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    expect(chunks(arr, 0)).toStrictEqual([[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]]);
  });

  it('if given array is smaller than size, chunk size is arr.length', () => {
    const arr = [1, 2, 3];
    expect(chunks(arr, 10)).toStrictEqual([[1, 2, 3]]);
  });
});

describe('#parseDate', () => {
  it('works.', () => {
    const date = parseDate('2019-12-25');
    expect(date.year).toBe(2019);
    expect(date.month).toBe(12);
    expect(date.day).toBe(25);
    expect(date.date).toBeInstanceOf(Date);
    expect(date.toDateString()).toBe('2019-12-25');
  });

  it('also works.', () => {
    const date = parseDate('2019-1-5');
    expect(date.year).toBe(2019);
    expect(date.month).toBe(1);
    expect(date.day).toBe(5);
    expect(date.date).toBeInstanceOf(Date);
    expect(date.toDateString()).toBe('2019-01-05');
  });
});

describe('#diffDays', () => {
  it('works.', () => {
    const d1 = new Date('2020-01-01');
    const d2 = new Date('2020-01-10');
    expect(diffDays(d1, d2)).toBe(9);
  });

  it('also can using date as string.', () => {
    expect(diffDays('2020-02-24', '2020-03-02')).toBe(7);
  });
});

describe('#getDates', () => {
  it('works.', () => {
    expect(getDates('2020-01-01~2020-01-05')).toStrictEqual([
      '2020-01-01',
      '2020-01-02',
      '2020-01-03',
      '2020-01-04',
      '2020-01-05',
    ]);
  });
});
