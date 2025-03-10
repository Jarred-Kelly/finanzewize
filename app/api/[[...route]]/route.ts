import { handle } from 'hono/vercel';
import { Hono }   from 'hono';

import transactions from './transactions';
import categories   from './categories';
import accounts     from './accounts';
import summary      from './summary';

export const runtime = 'edge'

const app = new Hono().basePath('/api');

const routes = app
    .route("/summary", summary)
    .route("/accounts", accounts)
    .route("/categories", categories)
    .route("/transactions", transactions)


export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)

export type AppType = typeof routes;