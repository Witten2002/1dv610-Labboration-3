/**
 * A class representing a diagram.
 *
 * @author Ludwig Wittenberg <lw223cq@student.lnu.se>
 * @version 1.0.0
 */
import { DataObject } from './DataObject.js'
import { Interactivity } from './Interactivity.js'
import { Animation } from './Animation.js'
/**
 * A class representing a diagram.
 */
class Diagram {
  #dataObject
  #svg
  #svgHeight
  #svgWidth
  /**
   * Creates an instance of Diagram.
   *
   * @param {object} config - The config that will be used to render the diagram.
   */
  constructor (config) {
    this.#setDataObject(config)
    this.#setSvg(this.#dataObject.getDataObject().config.svg)
    this.#setsvgHeight(this.#dataObject.getDataObject().config.height)
    this.#setsvgWidth(this.#dataObject.getDataObject().config.width)
  }

  /**
   * Sets the svg element.
   *
   * @param {object} svg - The svg element.
   */
  #setSvg (svg) {
    this.#svg = svg
  }

  /**
   * Sets the heigt of the element.
   *
   * @param {number} height - Svg Element.
   */
  #setsvgHeight (height) {
    this.#svgHeight = height
    this.#svg.setAttribute('height', this.#svgHeight)
  }

  /**
   * Gets the height of the SVG element.
   *
   * @returns {number} The height of the SVG element.
   */
  getSvgHeight () {
    return this.#svgHeight
  }

  /**
   * Sets the width of the element.
   *
   * @param {number} width - Svg Element.
   */
  #setsvgWidth (width) {
    this.#svgWidth = width
    this.#svg.setAttribute('width', this.#svgWidth)
  }

  /**
   * Gets the width of the SVG element.
   *
   * @returns {number} The height of the SVG element.
   */
  getSvgWidth () {
    return this.#svgWidth
  }

  /**
   * Returns the svg element.
   *
   * @returns {object} - The svg element.
   */
  getSvg () {
    return this.#svg
  }

  /**
   * Sets the data object.
   *
   * @param {object} config - The data that will be used to render the diagram.
   */
  #setDataObject (config) {
    this.#dataObject = new DataObject(config)
  }

  /**
   * Returns the data.
   *
   * @returns {object} - The data.
   */
  getVisualData () {
    return this.#dataObject.getVisualData()
  }

  /**
   * Returns the data objects.
   *
   * @returns {object} - The data objects.
   */
  getDataObject () {
    return this.#dataObject.getDataObject()
  }

  /**
   * Creates the axels for the diagram.
   *
   * @param {object} config - The config.
   */
  applyInteractivityAndAnimation (config) {
    const objectData = this.getDataObject()

    if (objectData.config.interactivity) {
      const interactive = new Interactivity(config.element)
      interactive.makeInteractive(objectData, config)
    }

    if (objectData.config.animation) {
      const animate = new Animation(config.element)

      const speed = objectData.config.animation.speed

      animate.startAnimation(config, speed)
    }
  }

  /**
   * Renders the diagram. This method must be implemented by a subclass. This is becasuse we want it to act like a abstract class.
   */
  render () {
    throw new Error('The method render must be implemented')
  }
}

export { Diagram }
