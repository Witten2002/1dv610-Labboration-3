/**
 * Server module.
 *
 * @author Ludwig Wittenberg <lw223cq@student.lnu.se>
 * @version 1.0.0
 */

import express from 'express'
import { HomeController } from '../controllers/homeController.js'
import { ROUTER_PATH } from '../config/Paths.js'

const router = express.Router()

const controller = new HomeController()

router.get(ROUTER_PATH.HOME, (req, res, next) => controller.index(req, res, next))

export { router }
