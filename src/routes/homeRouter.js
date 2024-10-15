/**
 * Server module.
 *
 * @author Ludwig Wittenberg <lw223cq@student.lnu.se>
 * @version 1.0.0
 */

import express from 'express'
import { HomeController } from '../controllers/homeController.js'

const router = express.Router()

const controller = new HomeController()

router.get('/', (req, res, next) => controller.index(req, res, next))

export { router }
