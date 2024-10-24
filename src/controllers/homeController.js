/**
 * Controller for home route.
 *
 * @author Ludwig Wittenberg <lw223cq@student.lnu.se>
 * @version 1.0.0
 */
import { PATH, VIEWS } from '../config/Paths.js'
import { DIAGRAM_TYPES } from '../config/DiagramTypes.js'
import { FakeData } from '../models/FakeData.js'

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
    const fakeData = new FakeData()

    const sendToView = {
      data: fakeData.getFakeData()
    }

    const viewData = JSON.stringify(sendToView)

    res.render(VIEWS.HOME, { PATH, DIAGRAM_TYPES, viewData })
  }
}
