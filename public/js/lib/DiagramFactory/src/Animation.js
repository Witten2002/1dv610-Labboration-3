/**
 * A class to animate the diagrams.
 *
 * @author Ludwig Wittenberg <lw223cq@student.lnu.se>
 * @version 1.0.0
 */
import { diagramTypes } from './config/DiagramTypes.js'
import { ATTRIBUTE } from './config/Attribute.js'

/**
 * A class representing a diagram.
 */
class Animation {
  #element
  #calculatedIncresment
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
  startAnimation (config) {
    if (this.#isHorizontal(config)) {
      this.#animateHorizontalBar(config.finalHeight, config.finalYCoordinate, config.speed)
    }
  }

  /**
   * Checks if the diagram configuration is for a horizontal diagram.
   *
   * @param {object} config - The configuration object for the diagram.
   * @returns {boolean} Returns true if the diagram type is 'horizontalBar', otherwise false.
   */
  #isHorizontal (config) {
    return config.type === diagramTypes.HORIZONTAL_BAR
  }

  /**
   * Animates the each bar of the diagram.
   *
   * @param {number} finalHeight - The final height of the bar.
   * @param {number} finalYCoordinate - The final y position of the bar.
   * @param {number} speed - The speed of the animation.
   */
  #animateHorizontalBar (finalHeight, finalYCoordinate, speed) {
    this.#calculateSpeed(speed, finalHeight)
    const calcSpeed = this.#getCalculatedSpeed()

    this.#startAnimation(calcSpeed, finalHeight, finalYCoordinate)
  }

  /**
   * Will calculate the speed of the diagram.
   *
   * @param {number} speed - The speed that the diagram should use.
   * @param {number} finalHeight - The final height of the bar.
   */
  #calculateSpeed (speed, finalHeight) {
    const increment = finalHeight / speed
    const yIncrement = finalHeight / speed

    this.#calculatedIncresment = {
      increment,
      yIncrement
    }
  }

  /**
   * Returns the calculated speed increments.
   *
   * @returns {object} The calculated speed increments.
   */
  #getCalculatedSpeed () {
    return this.#calculatedIncresment
  }

  /**
   * Starts the animation for the bars.
   *
   * @param {object} calcSpeed - The speed calculation object containing increment values.
   * @param {number} finalHeight - The final height of the bar.
   * @param {number} finalYCoordinate - The final y-coordinate of the bar.
   */
  #startAnimation (calcSpeed, finalHeight, finalYCoordinate) {
    let currentHeight = 0
    let currentY = parseInt(this.#element.getAttribute(ATTRIBUTE.YAXEL)) + finalHeight

    /**
     * Animates the bars.
     */
    const animate = () => {
      if (currentHeight < finalHeight) {
        currentHeight += calcSpeed.increment
        currentY -= calcSpeed.yIncrement
        this.#element.setAttribute(ATTRIBUTE.HEIGHT, currentHeight)
        this.#element.setAttribute(ATTRIBUTE.YAXEL, currentY)
        requestAnimationFrame(animate)
      } else {
        this.#element.setAttribute(ATTRIBUTE.HEIGHT, finalHeight)
        this.#element.setAttribute(ATTRIBUTE.YAXEL, finalYCoordinate)
      }
    }
    requestAnimationFrame(animate)
  }
}

export { Animation }
