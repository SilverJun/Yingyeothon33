// import { Database } from "bun:sqlite";

// all of these do the same thing
// const db = new Database("mydb.sqlite", { create: true });

import * as Settings from "./settings.json";
import { z } from "zod";

const urlCheck = z.string().url();

let currentURL = new URL(Settings.initialURL ?? "https://www.yyt.life");
const aboutURL = new URL(Settings.aboutURL ?? "https://silverjun.notion.site/YYT-33-9d4a1ea02d5a48eab1a5d9453c6d0fa4?pvs=4");

const server = Bun.serve({
    port: 3000,
    async fetch(request) {
        const url = new URL(request.url);
        const bodyText = await request.text();
        const body = bodyText ? JSON.parse(bodyText) : {};

        console.log(new Date(), ">>", url.pathname, request.method, body);

        if (url.pathname == '/') {
            return new Response('Redirection...', {
                status: 302,
                headers: {
                    Location: currentURL.toString(),
                },
            });
        } else if (url.pathname.startsWith('/api/')) {
            const api = url.pathname.replace('/api/', '');

            switch (api) {
                case 'current': {
                    if (request.method === 'POST') {
                        const result = urlCheck.safeParse(body.request_url);
                        if (result.success) {
                            currentURL = new URL(body.request_url);
                            return new Response(JSON.stringify({
                                code: 0,
                                message: 'success',
                            }));
                        } else {
                            return new Response(JSON.stringify({
                                code: -1,
                                message: 'Invalid URL',
                                ...result
                            }));
                        }
                    } else if (request.method === 'GET') {
                        return new Response(JSON.stringify({
                            current_url: currentURL.toString(),
                            code: 0,
                            message: 'success',
                        }));
                    }
                }
            }
            return new Response(JSON.stringify({
                code: -1,
                message: "404 API Not Found",
            }), { status: 404 });
        } else if (url.pathname == '/about') {
            return new Response('Redirection...', {
                status: 302,
                headers: {
                    Location: aboutURL.toString(),
                },
            });
        } else {
            return new Response(JSON.stringify({
                code: -1,
                message: "404 Not Found",
            }), { status: 404 });
        }
    },
});

console.log(`Listening on localhost:${server.port}`);
