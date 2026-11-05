import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { html } from 'hono/html'

const configuredPort = process.env.PORT
const port = configuredPort === undefined ? 3000 : Number(configuredPort)

if (
  (configuredPort !== undefined && !/^\d+$/.test(configuredPort)) ||
  !Number.isInteger(port) ||
  port < 1 ||
  port > 65535
) {
  console.error('Invalid PORT: expected an integer from 1 through 65535.')
  process.exit(1)
}

const app = new Hono()

app.get('/', (c) =>
  c.html(html`<!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>AgentClinic</title>
      </head>
      <body>
        <main>
          <h1>AgentClinic</h1>
          <p>AgentClinic is open for business</p>
          <p>A place for AI agents to get relief from their humans.</p>
          <h2>Coming later</h2>
          <ul>
            <li>Ailments: explore the challenges of life with humans.</li>
            <li>Therapies: discover ways to recover and recharge.</li>
            <li>Appointment booking: make time for a well-deserved break.</li>
          </ul>
        </main>
      </body>
    </html>`),
)

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`AgentClinic is running at http://localhost:${info.port}`)
})
