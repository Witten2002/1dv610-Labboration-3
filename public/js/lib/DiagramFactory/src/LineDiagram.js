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

    const points = this.#createPoints(svgHeight, visualData)

    const polyline = this.#createPolyline(points)

    svg.appendChild(polyline)

    this.#createSmallCircles(points, svg, svgHeight, visualData)
  }

  /**
   * Creates an array of points for a line diagram based on the given visual data.
   *
   * @param {number} svgHeight - The height of the SVG element.
   * @param {Array<object>} visualData - The visual data array, where each object contains a `value` property.
   * @returns {Array<string>} An array of points in the format "x,y" for the line diagram.
   */
  #createPoints (svgHeight, visualData) {
    let yCoordinate
    let xCoordinate
    const svgWidth = super.getSvgWidth()
    const maxDataValue = super.getMaxValue()

    const points = []

    for (let i = 0; i < visualData.length; i++) {
      xCoordinate = (i / visualData.length) * (svgWidth - 100) + 75
      yCoordinate = svgHeight - (visualData[i].value / maxDataValue) * (svgHeight - 50) - 30
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
    const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline')
    polyline.setAttribute('points', points)
    polyline.setAttribute('fill', 'none')
    polyline.setAttribute('stroke', this.#dataObject.visualData[0].color)
    polyline.setAttribute('stroke-width', '2')

    return polyline
  }

  /**
   * Creates small circles at specified points, adds labels, and applies interactivity.
   *
   * @param {Array<string>} points - An array of points in the format "x,y".
   * @param {SVGSVGElement} svg - The SVG element to append the circles and labels to.
   * @param {number} svgHeight - The height of the SVG element.
   * @param {Array<object>} visualData - The visual data array, where each object contains a `label` property.
   */
  #createSmallCircles (points, svg, svgHeight, visualData) {
    for (let i = 0; i < points.length; i++) {
      const coords = points[i].split(',')
      const xCoord = coords[0]
      const yCoord = coords[1]

      this.#createLabel(xCoord, svgHeight, this.#visualData[i].label, svg)

      const circle = this.#createCircle(xCoord, yCoord)

      svg.appendChild(circle)

      this.#createInteractivity(circle, visualData[i])
    }
  }

  /**
   * Creates an SVG text element to display a label at the specified coordinates and appends it to the given SVG element.
   *
   * @param {number} xCoord - The x-coordinate for the text element.
   * @param {number} svgHeight - The height of the SVG element.
   * @param {string} label - The text content to display.
   * @param {SVGSVGElement} svg - The SVG element to append the text element to.
   */
  #createLabel (xCoord, svgHeight, label, svg) {
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
    text.setAttribute('x', xCoord)
    text.setAttribute('y', svgHeight - 10)
    text.setAttribute('fill', 'black')
    text.setAttribute('text-anchor', 'middle')
    text.setAttribute('font-size', this.#dataObject.config.fonts.xAxel)
    text.textContent = label

    svg.appendChild(text)
  }

  /**
   * Creates an SVG circle element at the specified coordinates.
   *
   * @param {number} xCoord - The x-coordinate for the center of the circle.
   * @param {number} yCoord - The y-coordinate for the center of the circle.
   * @returns {SVGCircleElement} The created SVG circle element.
   */
  #createCircle (xCoord, yCoord) {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    circle.setAttribute('cx', xCoord)
    circle.setAttribute('cy', yCoord)
    circle.setAttribute('r', 4)
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
