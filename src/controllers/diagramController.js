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
    const unPrePairedData = await this.#getData()

    const preparedData = await this.#prepareData(unPrePairedData)
    const sendToView = {
      data: preparedData
    }

    const viewData = JSON.stringify(sendToView)
    console.log(sendToView)

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

      // this.#prepareData(data)
    } catch (error) {
      console.error(error)
    }
  }

  async #prepareData (dataa) {
    const dataArray = []

    for (const key in dataa) {
      const data = { // change name
        label: key.toString(),
        value: this.#sum(dataa[key]),
        color: this.#getRandomColor()
      }

      dataArray.push(data)
    }
    console.log(dataArray)
    return dataArray
  }

  #sum (object) {
    let sum = 0

    const values = Object.values(object)

    for (const value of values) {
      sum += value
    }

    return sum
  }

  #getRandomColor () {
    const random = this.#getRandomNumber()

    return this.#getColor(random)
  }

  #getRandomNumber () {
    return Math.floor(Math.random() * 20)
  }

  #getColor (index) {
    const colors = [
      'red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'brown', 'gray', 'black',
      'cyan', 'magenta', 'lime', 'maroon', 'navy', 'olive', 'teal', 'violet', 'gold', 'silver'
    ]

    return colors[index]
  }
}
