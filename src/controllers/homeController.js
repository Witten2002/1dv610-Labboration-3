/**
 * Controller for home route.
 *
 * @author Ludwig Wittenberg <lw223cq@student.lnu.se>
 * @version 1.0.0
 */
import { PATH, VIEWS } from '../config/Paths.js'
import { DIAGRAM_TYPES } from '../config/DiagramTypes.js'

/**
 * Encapsulates a controller.
 */
export class HomeController {
  /**
   * Renders a view and sends the rendered HTML string as an HTTP response.
   * index GET.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  index (req, res, next) {
    const fakeData = this.#createFakeData()

    const sendToView = {
      data: fakeData
    }

    const viewData = JSON.stringify(sendToView)

    res.render(VIEWS.HOME, { PATH, DIAGRAM_TYPES, viewData })
  }

  /**
   * Creates a list of fake data to display our diagrams.
   *
   * @returns {Array} A list of fake data to show on the home screen.
   */
  #createFakeData () {
    const fakeData = [
      { label: '2019', value: 10, color: 'blue' },
      { label: '2020', value: 13, color: 'red' },
      { label: '2021', value: 18, color: 'yellow' },
      { label: '2022', value: 15, color: 'pink' },
      { label: '2023', value: 25, color: 'green' }
    ]

    return fakeData
  }
}
