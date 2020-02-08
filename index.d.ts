import { IOptions } from 'glob';

export type Separator = '/'|'\\';

export interface Size {
  bytes: number;
  operator: string;
}

export interface ParsedDate {
  date: Date;
  year: number;
  month: number;
  day: number;
  toDateString: function(): string;
}

//
// file methods
//

export function globPromise(pattern: string, options: IOptions): Promise<string[]>;

export function replaceSeparator(path: string, separator: Separator): string;

export function trimDir(dir:string, separator?: Separator): string;

export function setDir(path: string, dir: string, separator?: Separator): string;

export function getLastNumber(path: string): string;

export function removeLastNumber(file: string): string;

export async function autoIncrease(path: string): Promise<string>;

export function resolveOutputFile(output: string, source: string): string;

export function bytesToSize(bytes: number, decimals?: number): string;

export function parseSize(size: string): Size;

//
// string methods
//

export function truncate(str: string, length?: number, ellipsis?: string): string;

export function sanitize(str: string, replacer?: string): string;

//
// array methods
//

export function naturalSort(arr: string[]): string[];

export async function filter<T>(arr: T[], cb: function(T, number, T[]): Promise<boolean>): Promise<T[]>;

export function chunks<T>(arr: T[], size: number): T[][];

//
// date methods
//

export function parseDate(value: string|number|Date): ParsedDate;

export function getDates(value: string): string[];

export function diffDays(a: string|number|Date, b: string|number|Date): number;
