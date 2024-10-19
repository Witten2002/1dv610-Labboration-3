/**
 * Line Diagram class
 *
 * @author Ludwig Wittenberg <lw223cq@student.lnu.se>
 * @version 1.0.0
 */

import { GraphDiagram } from './GraphDiagram.js'
import { diagramTypes } from './config/DiagramTypes.js'

/**
 * A class representing a line diagram.
 */
class LineDiagram extends GraphDiagram {
  #dataObject
  #visualData

  /**
   * Creates an instance of LineDiagram.
   *
   * @param {object} config - The data that will be used to render the diagram.
   */
  constructor (config) {
    super(config)
    this.#dataObject = super.getDataObject()
    this.#visualData = super.getVisualData()
  }

  /**
   * Renders the diagram.
   */
  render () {
    const svg = super.getSvg()
    const svgHeight = super.getSvgHeight()
    const visualData = super.getVisualData()

    const config = {
      svgHeight,
      visualData,
      svg
    }

    const points = this.#createPoints(config)

    const polyline = this.#createPolyline(points)

    svg.appendChild(polyline)

    this.#createSmallCircles(points, config)
  }

  /**
   * Creates an array of points for a line diagram based on the given visual data.
   *
   * @param {object} config - The data structure.
   * @returns {Array<string>} An array of points in the format "x,y" for the line diagram.
   */
  #createPoints (config) {
    let yCoordinate
    let xCoordinate
    const svgWidth = super.getSvgWidth()
    const maxDataValue = super.getMaxValue()

    const points = []

    const PADDING_X = 100
    const MARGIN_LEFT = 75
    const PADDING_Y = 50
    const MARGIN_BOTTOM = 30

    for (let i = 0; i < config.visualData.length; i++) {
      xCoordinate = (i / config.visualData.length) * (svgWidth - PADDING_X) + MARGIN_LEFT
      yCoordinate = config.svgHeight - (config.visualData[i].value / maxDataValue) * (config.svgHeight - PADDING_Y) - MARGIN_BOTTOM
      points.push(`${xCoordinate},${yCoordinate}`)
    }

    return points
  }

  /**
   * Creates an SVG polyline element with the given points and styles.
   *
   * @param {string} points - A string of points in the format "x1,y1 x2,y2 ..." for the polyline.
   * @returns {SVGPolylineElement} The created SVG polyline element.
   */
  #createPolyline (points) {
    const SIZE = '2'

    const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline')
    polyline.setAttribute('points', points)
    polyline.setAttribute('fill', 'none')
    polyline.setAttribute('stroke', this.#dataObject.visualData[0].color)
    polyline.setAttribute('stroke-width', SIZE)

    return polyline
  }

  /**
   * Creates small circles at specified points, adds labels, and applies interactivity.
   *
   * @param {Array<string>} points - An array of points in the format "x,y".
   * @param {object} config - The data structure.
   */
  #createSmallCircles (points, config) {
    for (let i = 0; i < points.length; i++) {
      const coords = points[i].split(',')
      const xCoord = coords[0]
      const yCoord = coords[1]

      this.#createLabel(xCoord, config, config.visualData[i].label,)

      const circle = this.#createCircle(xCoord, yCoord)

      config.svg.appendChild(circle)

      this.#createInteractivity(circle, config.visualData[i])
    }
  }

  /**
   * Creates an SVG text element to display a label at the specified coordinates and appends it to the given SVG element.
   *
   * @param {number} xCoord - The x-coordinate for the text element.
   * @param {object} config - The data structure.
   * @param {string} label - The text content to display.
   */
  #createLabel (xCoord, config, label) {
    const PADDING_BOTTOM = 10

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
    text.setAttribute('x', xCoord)
    text.setAttribute('y', config.svgHeight - PADDING_BOTTOM)
    text.setAttribute('fill', 'black')
    text.setAttribute('text-anchor', 'middle')
    text.setAttribute('font-size', this.#dataObject.config.fonts.xAxel)
    text.textContent = label

    config.svg.appendChild(text)
  }

  /**
   * Creates an SVG circle element at the specified coordinates.
   *
   * @param {number} xCoord - The x-coordinate for the center of the circle.
   * @param {number} yCoord - The y-coordinate for the center of the circle.
   * @returns {SVGCircleElement} The created SVG circle element.
   */
  #createCircle (xCoord, yCoord) {
    const RADIUS = 4

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    circle.setAttribute('cx', xCoord)
    circle.setAttribute('cy', yCoord)
    circle.setAttribute('r', RADIUS)
    circle.setAttribute('fill', this.#dataObject.visualData[0].color)

    return circle
  }

  /**
   * Applies interactivity and animation settings to a given circle element.
   *
   * @param {SVGCircleElement} circle - The SVG circle element to apply settings to.
   * @param {object} visualData - The visual data associated with the circle element.
   */
  #createInteractivity (circle, visualData) {
    const interactivityAndAnimationSettings = {
      element: circle,
      visualData,
      type: diagramTypes.LINE_DIAGRAM
    }
    super.applyInteractivityAndAnimation(interactivityAndAnimationSettings)
  }
}

export { LineDiagram }
