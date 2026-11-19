// The service's files. Everything lives under OPENCHAMBER_SERVICE_DATA_DIR and nowhere else: a write inside
// the package would reload the extension.
import fs from 'node:fs';
import path from 'node:path';

export type Store = {
  load: <T,>(name: string, fallback: T) => T;
  save: (name: string, value: unknown) => void;
  /** Appends one line to a log file. Never throws. */
  append: (name: string, line: string) => void;
  exists: (name: string) => boolean;
};

export const createStore = (dir: string): Store => {
  const file = (name: string) => path.join(dir, name);
  return {
    load: <T,>(name: string, fallback: T): T => {
      try {
        return JSON.parse(fs.readFileSync(file(name), 'utf8')) as T;
      } catch {
        return fallback;
      }
    },
    save: (name, value) => {
      try {
        fs.mkdirSync(dir, { recursive: true });
        const target = file(name);
        const temp = `${target}.${process.pid}.tmp`;
        fs.writeFileSync(temp, JSON.stringify(value), { mode: 0o600 });
        fs.renameSync(temp, target);
      } catch {
        // The next change writes again; the answer to the caller does not depend on the disk.
      }
    },
    append: (name, line) => {
      try {
        fs.mkdirSync(dir, { recursive: true });
        fs.appendFileSync(file(name), `${line}\n`, { mode: 0o600 });
      } catch {
        // A log line is never worth a failure.
      }
    },
    exists: (name) => fs.existsSync(file(name)),
  };
};

/** A file read as text, or null when it is missing or a directory. */
export const readText = (target: string): string | null => {
  try {
    return fs.readFileSync(target, 'utf8');
  } catch {
    return null;
  }
};

/** File names in a folder, empty when it is missing. */
export const listDir = (directory: string): string[] => {
  try {
    return fs.readdirSync(directory);
  } catch {
    return [];
  }
};
