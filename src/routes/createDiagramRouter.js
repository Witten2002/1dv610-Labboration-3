/**
 * Server module.
 *
 * @author Ludwig Wittenberg <lw223cq@student.lnu.se>
 * @version 1.0.0
 */

import express from 'express'
import { CreateDiagramController } from '../controllers/creatDiagramController.js'
import { ROUTER_PATH } from '../config/Paths.js'

const router = express.Router()

const controller = new CreateDiagramController()

router.get(ROUTER_PATH.HOME, (req, res, next) => controller.index(req, res, next))

export { router }
