/**
 * Module for the CarsController.
 *
 * @author Ludwig Wittenberg
 * @version 3.0.0
 */

import express from 'express'
import { CarsController } from '../controllers/CarsController.js'

export const router = express.Router()

const controller = new CarsController()

// Map HTTP verbs and route paths to controller actions.
router.get('/', (req, res, next) => controller.index(req, res, next))

router.get('/mclaren', (req, res, next) => controller.mclaren(req, res, next))
