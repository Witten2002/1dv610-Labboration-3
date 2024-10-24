/**
 * Server module.
 *
 * @author Ludwig Wittenberg <lw223cq@student.lnu.se>
 * @version 1.0.0
 */

import express from 'express'
import expressLayouts from 'express-ejs-layouts'
import logger from 'morgan'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { router } from './routes/router.js'
import helmet from 'helmet'

const app = express()
const dirFullName = dirname(fileURLToPath(import.meta.url))

const baseURL = process.env.BASE_URL || '/'

app.use(logger('dev'))

app.use(helmet())

app.set('view engine', 'ejs')
app.set('views', join(dirFullName, 'views'))
app.set('layout', join(dirFullName, 'views', 'layout', 'default'))
app.set('layout extractScripts', true)
app.set('layout extractStyles', true)
app.use(expressLayouts)

app.use(express.static(join(dirFullName, '..', 'public')))

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1)
}

app.use((req, res, next) => {
  res.locals.baseURL = baseURL

  next()
})

app.use('/', router)

app.use((err, req, res, next) => {
  console.error(err)

  //   404 Not Found.
  if (err.status === 404) {
    res
      .status(404)
      .sendFile(join(dirFullName, 'views', 'errors', '404.html'))
    return
  }

  // 500 Internal Server Error (in production, all other errors send this response).
  if (process.env.NODE_ENV === 'production') {
    res
      .status(500)
      .sendFile(join(dirFullName, 'views', 'errors', '500.html'))
    return
  }

  // ---------------------------------------------------
  // ⚠️ WARNING: Development Environment Only!
  //             Detailed error information is provided.
  // ---------------------------------------------------

  // Render the error page.
  res
    .status(err.status || 500)
    .render('errors/error', { error: err })
})

// Starts the HTTP server listening for connections.
const server = app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${server.address().port}`)
  console.log('Press Ctrl-C to terminate...')
})
