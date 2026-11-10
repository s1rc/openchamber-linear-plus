import http from 'node:http';
import { createServiceHost } from '@openchamber/sdk';

const host = createServiceHost({ env: process.env });
const token = process.env.OPENCHAMBER_SERVICE_TOKEN;

const route = async (path: string, _body: string): Promise<unknown | null> => {
  if (path === '/health') return {};
  void host;
  return null;
};

http.createServer((req, res) => {
  if (req.headers.authorization !== `Bearer ${token}`) { res.writeHead(401).end(); return; }
  const path = new URL(req.url ?? '/', 'http://x').pathname;
  let body = '';
  req.on('data', (chunk) => { body += chunk; });
  req.on('end', () => {
    route(path, body).then((answer) => {
      res.writeHead(answer ? 200 : 404, { 'Content-Type': 'application/json' }).end(JSON.stringify(answer ?? {}));
    }, () => { res.writeHead(500).end('{}'); });
  });
}).listen(Number(process.env.OPENCHAMBER_SERVICE_PORT), '127.0.0.1');
