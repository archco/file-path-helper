import { IOptions } from 'glob';

/**
 * Directory Separator
 */
export type Separator = '/'|'\\';

export interface Size {
  bytes: number;
  /**
   * e.g. '>' or '<='
   */
  operator: string;
}

export interface ParsedDate {
  date: Date;
  year: number;
  month: number;
  day: number;
  /**
   * Returns only date as string. e.g. '2019-01-01'
   */
  toDateString(): string;
}

//
// file methods
//

/**
 * Glob promise.
 *
 * @param {string} pattern
 * @param {GlobOptions} options
 * @returns {Promise<string[], Error>}
 */
export function globPromise(pattern: string, options: IOptions): Promise<string[]>;

/**
 * Replace directory separator.
 *
 * @param {string} path
 * @param {Separator} separator default: '/'
 * @returns {string}
 */
export function replaceSeparator(path: string, separator: Separator): string;

/**
 * Append last slash to directory.
 *
 * @param {string} dir
 * @param {Separator} separator default: '/'
 */
export function trimDir(dir:string, separator?: Separator): string;

/**
 * Set directory part of path.
 *
 * @param {string} path
 * @param {string} dir
 * @param {Separator} separator default: '/'
 * @returns {string}
 */
export function setDir(path: string, dir: string, separator?: Separator): string;

/**
 * Get last number from path.
 *
 * @param {string} path
 * @returns {string}
 */
export function getLastNumber(path: string): string;

/**
 * Remove last number from file name.
 *
 * @param {string} file
 * @returns {string}
 */
export function removeLastNumber(file: string): string;

/**
 * Auto increase path.
 * If the same file exists, It's returns filename what increased number.
 *
 * @param {string} path
 * @returns {Promise<string>} auto increased path.
 */
export function autoIncrease(path: string): Promise<string>;

/**
 * Resolve output file name.
 *
 * @param {string} output
 * @param {string} source
 * @returns {string}
 */
export function resolveOutputFile(output: string, source: string): string;

/**
 * Convert size in bytes.
 * @see https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
 *
 * @param {number} bytes
 * @param {number} decimals default: 2
 * @returns {string}
 */
export function bytesToSize(bytes: number, decimals?: number): string;

/**
 * Parses string that includes file size and operator.
 *
 * @param {string} size e.g '10.5mb' '>1GB' '=<10kb'
 * @returns {Size} Size
 */
export function parseSize(size: string): Size;

//
// string methods
//

/**
 * truncate string.
 *
 * @param {string} str
 * @param {number} length default: 40
 * @param {string} ellipsis default: '…'
 * @returns {string}
 */
export function truncate(str: string, length?: number, ellipsis?: string): string;

/**
 * Sanitize string for safe filename.
 * @see https://github.com/parshap/node-sanitize-filename#readme
 *
 * @param {string} str
 * @param {string} replacer default: `''`
 * @returns {string}
 */
export function sanitize(str: string, replacer?: string): string;

//
// array methods
//

/**
 * Sorting array of alphanumerical strings naturally.
 * @see https://stackoverflow.com/questions/2802341/javascript-natural-sort-of-alphanumerical-strings
 *
 * @param {string[]} arr
 * @returns {string[]}
 */
export function naturalSort(arr: string[]): string[];

/**
 * Filtering an array with Promise
 * @see https://stackoverflow.com/questions/33355528/filtering-an-array-with-a-function-that-returns-a-promise
 *
 * @template T
 * @param {T[]} arr - filtering target array.
 * @param {function(T, number, T[]): Promise<boolean>} cb - callback function for filtering. arguments is value, index, array.
 * @returns {Promise<T[]>}
 */
export function filter<T>(arr: T[], cb: (value: T, index: number, arr: T[]) => Promise<boolean>): Promise<T[]>;

/**
 * Split array into chunks
 * @see https://stackoverflow.com/questions/8495687/split-array-into-chunks#answer-8495740
 *
 * @template T
 * @param {T[]} arr
 * @param {number} size
 * @returns {T[][]}
 */
export function chunks<T>(arr: T[], size: number): T[][];

//
// date methods
//

/**
 * Parsing the value to date. it's useful handling 'date'(not hours and minutes) purpose.
 *
 * @param {string|number|Date} value
 * @returns {ParsedDate}
 */
export function parseDate(value: string|number|Date): ParsedDate;

/**
 * Get array of date strings
 *
 * @param {string} value date string. e.g. '2020-01-01~2020-01-03'
 * @returns {string[]} e.g. ['2020-01-01', '2020-01-02', '2020-01-03']
 */
export function getDates(value: string): string[];

/**
 * difference between two dates.
 * @see https://stackoverflow.com/questions/3224834/get-difference-between-2-dates-in-javascript
 *
 * @param {string|number|Date} a
 * @param {string|number|Date} b
 * @returns {number}
 */
export function diffDays(a: string|number|Date, b: string|number|Date): number;
