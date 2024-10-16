/**
 * Server module.
 *
 * @author Ludwig Wittenberg <lw223cq@student.lnu.se>
 * @version 1.0.0
 */

import express from 'express'
import http from 'node:http'
import { router as homeRouter } from './homeRouter.js'
import { router as diagramRouter } from './diagramsRouter.js'
import { router as createDiagramRouter } from './createDiagramRouter.js'
import { ROUTER_PATH } from '../config/Paths.js'

const router = express.Router()

router.use(ROUTER_PATH.HOME, homeRouter)

router.use(ROUTER_PATH.DIAGRAMS, diagramRouter)

router.use(ROUTER_PATH.CREATE_DIAGRAM, createDiagramRouter)

// Catch 404 (ALWAYS keep this as the last route).
router.use('*', (req, res, next) => {
  const statusCode = 404
  const error = new Error(http.STATUS_CODES[statusCode])
  error.status = statusCode
  next(error)
})

export { router }
