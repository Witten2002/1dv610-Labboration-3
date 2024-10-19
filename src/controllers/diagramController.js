/**
 * Controller for diagram route.
 *
 * @author Ludwig Wittenberg <lw223cq@student.lnu.se>
 * @version 1.0.0
 */

import { PATH, VIEWS } from '../config/Paths.js'
import { FinanceFetcher } from '../models/FinanceFetcher.js'

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
    const unPrePairedData = await this.#getData()

    const preparedData = await this.#prepareData(unPrePairedData)
    const sendToView = {
      data: preparedData
    }

    const viewData = JSON.stringify(sendToView)

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
      const nvidiaStatics = new FinanceFetcher()
      await nvidiaStatics.fetchData()
      return nvidiaStatics.getData()
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Prepares data for the diagram.
   *
   * @param {Array<object>} data - The raw data to be prepared.
   * @returns {Array<object>} The prepared data array for the diagram.
   */
  async #prepareData (data) {
    const dataArray = []
    const colors = ['red', 'blue', 'yellow', 'orange', 'green']

    for (let i = 0; i < data.length; i++) {
      const diagramDataPoint = {
        label: data[i].calendarYear,
        value: this.#toBillions(data[i].revenue),
        color: colors[i]
      }

      dataArray.push(diagramDataPoint)
    }

    return dataArray.reverse()
  }

  /**
   * Will calculate the revenue into billions.
   *
   * @param {number} revenue The reveneu of the company per year.
   * @returns {number} The revenue in billions.
   */
  #toBillions (revenue) {
    const BILLION = 1000000000

    const reveneuInNewFormat = revenue / BILLION

    return reveneuInNewFormat
  }
}
