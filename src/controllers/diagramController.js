/**
 * Controller for diagram route.
 *
 * @author Ludwig Wittenberg <lw223cq@student.lnu.se>
 * @version 1.0.0
 */

import { PATH, VIEWS } from '../config/Paths.js'
import { Covid19Statics } from '../models/Covid19Statics.js'

/**
 * Encapsulates a controller.
 */
export class DiagramController {
  /**
   * Renders a view and sends the rendered HTML string as an HTTP response.
   * index GET.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async horizontalBar (req, res, next) {
    const viewData = await this.#getData()
    res.render(VIEWS.HORIZONTALBAR, { PATH, viewData })
  }

  /**
   * Renders a view and sends the rendered HTML string as an HTTP response.
   * index GET.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async linediagram (req, res, next) {
    const viewData = await this.#getData()
    res.render(VIEWS.LINEDIAGRAM, { PATH, viewData })
  }

  /**
   * Renders a view and sends the rendered HTML string as an HTTP response.
   * index GET.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async circlediagram (req, res, next) {
    const viewData = await this.#getData()
    res.render(VIEWS.CIRCLEDIAGRAM, { PATH, viewData })
  }

  /**
   * Fetches data using the GetData model.
   *
   * @returns {Promise<object>} The fetched data.
   * @throws {Error} If fetching data fails.
   */
  async #getData () {
    try {
      const statics = new Covid19Statics()
      await statics.fetchData()
      return statics.getData()
    } catch (error) {
      console.error(error)
    }
  }
}
