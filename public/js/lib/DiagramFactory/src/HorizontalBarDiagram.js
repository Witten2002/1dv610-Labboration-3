/**
 * A module representing a horizontal bar diagram.
 *
 * @author Ludwig Wittenberg <lw223cq@student.lnu.se>
 * @version 1.0.0
 */

// import { GraphDiagram } from './GraphDiagram.js'
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
    for (let i = 0; i < visualData.length; i++) {
      const barHeigth = (visualData[i].value / maxDataValue) * (svgHeight - 50)
      const xCoordinate = i * (barWidth + barSpacing) + 50
      xCoodinates.push(xCoordinate)
      const yCoordinate = svgHeight - barHeigth - 30

      const rect = this.#createBar(xCoordinate, yCoordinate, barWidth, barHeigth, visualData[i].color)

      this.#createInteractivity(rect, barHeigth, yCoordinate, visualData[i])

      svg.appendChild(rect)

      const text = this.#createLabel(xCoordinate, barWidth, svgHeight, visualData[i].label)

      svg.appendChild(text)
    }
  }

  /**
   * Creates an SVG rect element to represent a bar in the horizontal bar diagram.
   *
   * @param {number} xCoordinate - The x-coordinate for the rect element.
   * @param {number} yCoordinate - The y-coordinate for the rect element.
   * @param {number} barWidth - The width of the bar.
   * @param {number} barHeigth - The height of the bar.
   * @param {string} color - The fill color of the bar.
   * @returns {SVGRectElement} The created SVG rect element representing the bar.
   */
  #createBar (xCoordinate, yCoordinate, barWidth, barHeigth, color) {
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    rect.setAttribute('x', xCoordinate)
    rect.setAttribute('y', yCoordinate)
    rect.setAttribute('width', barWidth)
    rect.setAttribute('height', barHeigth)
    rect.setAttribute('fill', color)

    return rect
  }

  /**
   * Applies interactivity and animation settings to a given rect element.
   *
   * @param {SVGRectElement} rect - The SVG rect element to apply settings to.
   * @param {number} barHeigth - The height of the bar.
   * @param {number} yCoordinate - The y-coordinate of the rect element.
   * @param {object} visualData - The visual data associated with the rect element.
   */
  #createInteractivity (rect, barHeigth, yCoordinate, visualData) {
    const interactivityAndAnimationSettings = {
      element: rect,
      finalHeight: barHeigth,
      finalYCoordinate: yCoordinate,
      visualData,
      type: diagramTypes.HORIZONTAL_BAR
    }
    super.applyInteractivityAndAnimation(interactivityAndAnimationSettings)
  }

  /**
   * Creates an SVG text element to display a label for a horizontal bar.
   *
   * @param {number} xCoordinate - The x-coordinate for the text element.
   * @param {number} barWidth - The width of the bar.
   * @param {number} svgHeight - The height of the SVG element.
   * @param {string} label - The text content to display.
   * @returns {SVGTextElement} The created SVG text element displaying the label.
   */
  #createLabel (xCoordinate, barWidth, svgHeight, label) {
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
    text.setAttribute('x', xCoordinate + barWidth / 2)
    text.setAttribute('y', svgHeight - 10)
    text.setAttribute('fill', 'black')
    text.setAttribute('text-anchor', 'middle')
    text.setAttribute('font-size', this.#dataObject.config.fonts.xAxel)
    text.textContent = label

    return text
  }
}

export { HorizontalBarDiagram }
