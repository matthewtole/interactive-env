const fs = require('fs');

const { loadFile, saveVariables } = require('./index');

describe('loadFile', () => {
  test('loads file from folder', () => {
    expect(loadFile('./test/good.env')).toEqual({
      FOO: 'bar',
      BAR: '',
    });
  });

  test('returns empty object on non existent file', () => {
    expect(loadFile('./test/nope.env')).toEqual({});
  });

  test('returns empty object on invalid file', () => {
    expect(loadFile('./LICENCE')).toEqual({});
  });
});

describe('saveVariables', () => {
  test('writes environment variables to file', () => {
    const filename = './test.env';
    const env = {
      FOO: 'bar',
    };
    saveVariables(env, filename);
    expect(loadFile(filename)).toEqual(env);
    fs.unlinkSync(filename);
  });
});
