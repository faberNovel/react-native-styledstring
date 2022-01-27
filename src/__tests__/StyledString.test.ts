import { StyledString } from '../StyledString'

describe('StyledString', () => {
  test('Regular string', () => {
    const string = new StyledString('Basic', {})
    expect(string.getRanges()).toEqual([
      { start: 0, end: 4, replacement: { value: 'Basic' } },
    ])
  })

  test('Single arg', () => {
    const string = new StyledString('{{arg0}}', { arg0: { value: 'Foo' } })
    expect(string.getRanges()).toEqual([
      { start: 0, end: 7, replacement: { value: 'Foo' } },
    ])
  })

  test('Arg inside', () => {
    const string = new StyledString('Foo {{arg0}} bar', {
      arg0: { value: 'Baz' },
    })
    expect(string.getRanges()).toEqual([
      { start: 0, end: 3, replacement: { value: 'Foo ' } },
      { start: 4, end: 11, replacement: { value: 'Baz' } },
      { start: 12, end: 15, replacement: { value: ' bar' } },
    ])
  })

  test('Args ouside', () => {
    const string = new StyledString('{{arg0}} bar {{arg1}}', {
      arg0: { value: 'foo' },
      arg1: { value: 'baz' },
    })
    expect(string.getRanges()).toEqual([
      { start: 0, end: 7, replacement: { value: 'foo' } },
      { start: 8, end: 12, replacement: { value: ' bar ' } },
      { start: 13, end: 20, replacement: { value: 'baz' } },
    ])
  })

  test('Args inside', () => {
    const string = new StyledString('a {{arg0}} bar {{arg1}} b', {
      arg0: { value: 'foo' },
      arg1: { value: 'baz' },
    })
    expect(string.getRanges()).toEqual([
      { start: 0, end: 1, replacement: { value: 'a ' } },
      { start: 2, end: 9, replacement: { value: 'foo' } },
      { start: 10, end: 14, replacement: { value: ' bar ' } },
      { start: 15, end: 22, replacement: { value: 'baz' } },
      { start: 23, end: 24, replacement: { value: ' b' } },
    ])
  })

  test('Duplicated arg', () => {
    const string = new StyledString('{{arg0}} {{arg0}}', {
      arg0: { value: 'foo' },
    })
    expect(string.getRanges()).toEqual([
      { start: 0, end: 7, replacement: { value: 'foo' } },
      { start: 8, end: 16, replacement: { value: ' {{arg0}}' } },
    ])
  })
})
