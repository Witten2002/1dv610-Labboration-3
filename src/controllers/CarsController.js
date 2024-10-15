/**
 * Module for the CarsController.
 *
 * @author Ludwig Wittenberg
 * @version 3.0.0
 */

/**
 * Encapsulates a controller.
 */
export class CarsController {
  /**
   * Displays a list of cars.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async index (req, res, next) {
    try {
      res.render('cars/index')
    } catch (error) {
      next(error)
    }
  }

  /**
   * Displays a list of cars.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async mclaren (req, res, next) {
    try {
      const viewData = [
        { name: 'Mclaren', model: 'P1' },
        { model: 'Senna' },
        { name: 'Mercedes' }
      ]

      res.render('cars/mclaren', { viewData })
    } catch (error) {
      next(error)
    }
  }
}
