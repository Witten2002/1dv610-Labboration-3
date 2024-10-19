/**
 * A class to animate the diagrams.
 *
 * @author Ludwig Wittenberg <lw223cq@student.lnu.se>
 * @version 1.0.0
 */

import { diagramTypes } from './config/DiagramTypes.js'

/**
 * A class representing a diagram.
 */
class Animation {
  #element

  /**
   * Creates an instance of Animate.
   *
   * @param {object} element - The chart that will be used to render the diagram.
   */
  constructor (element) {
    this.#element = element
  }

  /**
   * Animate the diagram.
   *
   * @param {object} config - The configuration of the animation.
   */
  startAnimation (config, speed) {
    if (this.#isHorizontal(config.type)) {
      this.#animateHorizontalBar(config, speed)
    }
  }

  #isHorizontal (type) {
    return type === diagramTypes.HORIZONTAL_BAR
  }

  /**
   * Animates the each bar of the diagram.
   *
   * @param {number} finalHeight - The final height of the bar.
   * @param {number} finalY - The final y position of the bar.
   * @param {number} speed - The speed of the animation.
   */
  #animateHorizontalBar (config, speed) {
    let currentHeight = 0
    let currentY = parseInt(this.#element.getAttribute('y')) + config.finalHeight

    const increment = config.finalHeight / speed
    const yIncrement = config.finalHeight / speed

    /**
     * Animates the bars.
     */
    const animate = () => {
      if (currentHeight < config.finalHeight) {
        currentHeight += increment
        currentY -= yIncrement
        this.#element.setAttribute('height', currentHeight)
        this.#element.setAttribute('y', currentY)
        requestAnimationFrame(animate)
      } else {
        this.#element.setAttribute('height', config.finalHeight)
        this.#element.setAttribute('y', config.finalYCoordinate)
      }
    }
    requestAnimationFrame(animate)
  }
}

export { Animation }
