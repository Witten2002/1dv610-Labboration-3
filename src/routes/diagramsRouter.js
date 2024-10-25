/**
 * Server module.
 *
 * @author Ludwig Wittenberg <lw223cq@student.lnu.se>
 * @version 1.0.0
 */

import express from 'express'
import { DiagramController } from '../controllers/diagramController.js'
import { ROUTER_PATH } from '../config/Paths.js'

const router = express.Router()

const controller = new DiagramController()

router.get(ROUTER_PATH.HORIZONTALBAR, (req, res, next) => controller.horizontalBar(req, res, next))

router.get(ROUTER_PATH.LINEDIAGRAM, (req, res, next) => controller.linediagram(req, res, next))

router.get(ROUTER_PATH.CIRCLEDIAGRAM, (req, res, next) => controller.circlediagram(req, res, next))

export { router }
