// The Linear extension's service: it keeps what the agent should know about each mapped folder, answers the
// `@` menu and session events with no window open, and keeps finish-comment drafts and plan to build
// candidates for the Work Status section. It never posts to Linear: writes happen on a click in a frame.
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { createServiceHost } from '@openchamber/sdk';
import { createApp } from './app.ts';
import { createGql } from './linear-node.ts';
import { readChoices, type Choices } from './choices.ts';
import { createStore, listDir, readText } from './store.ts';

const token = process.env.OPENCHAMBER_SERVICE_TOKEN;
const dataDir = process.env.OPENCHAMBER_SERVICE_DATA_DIR || path.join(os.homedir(), '.openchamber-linear');
const store = createStore(dataDir);

const home = os.homedir();
const configDir = process.env.OPENCODE_CONFIG_DIR || path.join(process.env.XDG_CONFIG_HOME || path.join(home, '.config'), 'opencode');
const dataHome = process.env.XDG_DATA_HOME || path.join(home, '.local', 'share');
const cacheHome = process.env.XDG_CACHE_HOME || path.join(home, '.cache');

/** Only the provider ids in OpenCode's sign-in file, never what is stored under them. */
const signedIn = (): string[] => {
  try {
    const value: unknown = JSON.parse(readText(path.join(dataHome, 'opencode', 'auth.json')) ?? '{}');
    return typeof value === 'object' && value !== null ? Object.keys(value) : [];
  } catch {
    return [];
  }
};

let catalogueText: { at: number; text: string | null } | null = null;
const catalogue = (): string | null => {
  if (!catalogueText || Date.now() - catalogueText.at > 5 * 60_000) catalogueText = { at: Date.now(), text: readText(path.join(cacheHome, 'opencode', 'models.json')) };
  return catalogueText.text;
};

const choices = (directory: string | null): Choices => readChoices({ read: readText, list: listDir, configDir, signedIn: signedIn(), catalogue }, directory);

const app = createApp({
  choices,
  host: createServiceHost({ env: process.env }),
  store,
  read: readText,
  now: Date.now,
  gqlFor: (key) => createGql(key),
  log: (line) => { console.error(`[linear] ${line}`); },
});

http.createServer((req, res) => {
  if (req.headers.authorization !== `Bearer ${token}`) { res.writeHead(401).end(); return; }
  const url = new URL(req.url ?? '/', 'http://x');
  let raw = '';
  req.on('data', (chunk) => { raw += chunk; });
  req.on('end', () => {
    app.route(req.method ?? 'GET', url.pathname, url.searchParams, raw).then(
      (reply) => {
        res.writeHead(reply ? (reply.status ?? 200) : 404, { 'Content-Type': 'application/json' }).end(JSON.stringify(reply ? reply.body : { message: 'Not found' }));
        reply?.after?.();
      },
      () => { res.writeHead(200, { 'Content-Type': 'application/json' }).end(JSON.stringify({ ok: false, error: 'The Linear service hit an error.' })); },
    );
  });
}).listen(Number(process.env.OPENCHAMBER_SERVICE_PORT), '127.0.0.1', () => {
  void app.start().catch(() => undefined);
});
