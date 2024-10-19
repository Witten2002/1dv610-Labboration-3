/**
 * A module representing a horizontal bar diagram.
 *
 * @author Ludwig Wittenberg <lw223cq@student.lnu.se>
 * @version 1.0.0
 */

import { GraphDiagram } from './GraphDiagram.js'
import { diagramTypes } from './config/DiagramTypes.js'

/**
 * A class representing a bar diagram.
 */
class HorizontalBarDiagram extends GraphDiagram {
  #dataObject
  /**
   * Creates an instance of BarDiagram.
   *
   * @param {object} config - The data that will be used to render the diagram.
   */
  constructor (config) {
    super(config)
    this.#dataObject = super.getDataObject()
  }

  /**
   * Renders the diagram.
   *
   * @override
   */
  render () {
    const svg = super.getSvg()
    const barWidth = this.#dataObject.config.barWidth
    const barSpacing = this.#dataObject.config.barSpacing
    const svgHeight = super.getSvgHeight()
    const maxDataValue = super.getMaxValue()

    const xCoodinates = []

    const visualData = super.getVisualData()
    const MARGIN_TOP = 50
    const MARGIN_LEFT = 50
    const MARGIN_BOTTOM = 30

    for (let i = 0; i < visualData.length; i++) {
      const barHeigth = (visualData[i].value / maxDataValue) * (svgHeight - MARGIN_TOP)
      const xCoordinate = i * (barWidth + barSpacing) + MARGIN_LEFT
      xCoodinates.push(xCoordinate)
      const yCoordinate = svgHeight - barHeigth - MARGIN_BOTTOM

      const config = {
        xCoordinate,
        yCoordinate,
        barWidth,
        barHeigth,
        svgHeight,
        visualData: visualData[i]
      }

      const rect = this.#createBar(config)

      this.#createInteractivity(rect, config)

      svg.appendChild(rect)

      const text = this.#createLabel(config)

      svg.appendChild(text)
    }
  }

  /**
   * Creates an SVG rect element to represent a bar in the horizontal bar diagram.
   *
   * @param {object} config - The data structure.
   * @returns {SVGRectElement} The created SVG rect element representing the bar.
   */
  #createBar (config) {
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    rect.setAttribute('x', config.xCoordinate)
    rect.setAttribute('y', config.yCoordinate)
    rect.setAttribute('width', config.barWidth)
    rect.setAttribute('height', config.barHeigth)
    rect.setAttribute('fill', config.visualData.color)

    return rect
  }

  /**
   * Applies interactivity and animation settings to a given rect element.
   *
   * @param {SVGRectElement} rect - The SVG rect element to apply settings to.
   * @param {object} config - The data structure.
   */
  #createInteractivity (rect, config) {
    const interactivityAndAnimationSettings = {
      element: rect,
      finalHeight: config.barHeigth,
      finalYCoordinate: config.yCoordinate,
      visualData: config.visualData,
      type: diagramTypes.HORIZONTAL_BAR
    }
    super.applyInteractivityAndAnimation(interactivityAndAnimationSettings)
  }

  /**
   * Creates an SVG text element to display a label for a horizontal bar.
   *
   * @param {object} config - The data structure.
   */
  #createLabel (config) {
    const MARGINS_RIGHT = 2
    const MARGIN_BOTTOM = 10

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
    text.setAttribute('x', config.xCoordinate + config.barWidth / MARGINS_RIGHT)
    text.setAttribute('y', config.svgHeight - MARGIN_BOTTOM)
    text.setAttribute('fill', 'black')
    text.setAttribute('text-anchor', 'middle')
    text.setAttribute('font-size', this.#dataObject.config.fonts.xAxel)
    text.textContent = config.visualData.label

    return text
  }
}

export { HorizontalBarDiagram }
