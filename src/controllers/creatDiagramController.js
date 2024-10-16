/**
 * Controller for createDiagram route.
 *
 * @author Ludwig Wittenberg <lw223cq@student.lnu.se>
 * @version 1.0.0
 */
import { PATH, VIEWS } from '../config/Paths.js'

/**
 * Encapsulates a controller.
 */
export class CreateDiagramController {
  /**
   * Renders a view and sends the rendered HTML string as an HTTP response.
   * index GET.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  index (req, res, next) {
    res.render(VIEWS.CREATE_DIAGRAM, { PATH })
  }
}
