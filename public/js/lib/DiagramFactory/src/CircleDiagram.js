/**
 * The class for creating Circle Diagrams.
 *
 * @author Ludwig Wittenberg <lw223cq@student.lnu.se>
 * @version 1.0.0
 */
import { Diagram } from './Diagram.js'
import { diagramTypes } from './config/DiagramTypes.js'

/**
 * The CircleDiagram class
 */
class CircleDiagram extends Diagram {
  #dataObject
  #visualData
  #eachPrecents
  #eachAngles
  /**
   * The constructor.
   *
   * @param {object} config - The config object
   */
  constructor (config) {
    super(config)
    this.#dataObject = super.getDataObject()
    this.#visualData = super.getVisualData()

    this.#eachPrecents = []
    this.#eachAngles = []
  }

  /**
   * The render method that creates the Diagram.
   */
  render () {
    const sum = this.#calculateSum()
    this.#calculateEachPercent(sum)
    this.#calculateEachAngle()

    const svg = super.getSvg()
    const svgHeight = super.getSvgHeight()
    const svgWidth = super.getSvgWidth()

    this.#createEachPath(svgWidth, svgHeight, svg)

    this.#showLabels(svg)
  }

  /**
   * Creates and appends SVG path elements representing sections of a circle diagram.
   * !!! COPILOT HELPT ME WITH THE CALCULATIONS !!!
   *
   * @param {number} svgWidth - The width of the SVG element.
   * @param {number} svgHeight - The height of the SVG element.
   * @param {SVGSVGElement} svg - The SVG element to append the path elements to.
   */
  #createEachPath (svgWidth, svgHeight, svg) {
    const radius = Math.min(svgWidth, svgHeight) / 2 - 50
    const centerX = svgWidth / 2
    const centerY = svgHeight / 2

    let startAngle = 0

    for (let i = 0; i < this.#eachAngles.length; i++) {
      const endAngle = startAngle + this.#eachAngles[i] * Math.PI / 180

      /* ---------------- Each Section Coords ---------------- */
      const x1 = centerX + radius * Math.cos(startAngle)
      const y1 = centerY + radius * Math.sin(startAngle)
      const x2 = centerX + radius * Math.cos(endAngle)
      const y2 = centerY + radius * Math.sin(endAngle)
      /* ----------------------------------------------------- */

      // Determine if the arc should be the larger (1) or smaller (0) arc
      const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0

      // path config
      const pathData = [
        `M ${centerX} ${centerY}`,
        `L ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        'Z'
      ].join(' ')

      const path = this.#createPath(pathData, this.#visualData[i].color)

      this.#createInteractivity(path, i)

      svg.appendChild(path)

      startAngle = endAngle
    }
  }

  /**
   * Creates an SVG path element with the given path data and color.
   *
   * @param {string} pathData - The path data for the SVG path element.
   * @param {string} color - The fill color for the SVG path element.
   * @returns {SVGPathElement} The created SVG path element.
   */
  #createPath (pathData, color) {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    path.setAttribute('d', pathData)
    path.setAttribute('fill', color)

    return path
  }

  /**
   * Applies interactivity and animation settings to a given path element.
   *
   * @param {SVGPathElement} path - The SVG path element to apply settings to.
   * @param {number} index - The index of the visual data associated with the path.
   */
  #createInteractivity (path, index) {
    const interactivityAndAnimationSettings = {
      element: path,
      visualData: this.#visualData[index],
      type: diagramTypes.CIRCLE_DIAGRAM
    }
    super.applyInteractivityAndAnimation(interactivityAndAnimationSettings)
  }

  /**
   * Creating a infobox.
   *
   * @param {object} svg - the DOM element.
   */
  #showLabels (svg) {
    const xCoord = 10
    let yCoord = 10

    for (let i = 0; i < this.#visualData.length; i++) {
      const rect = this.#createRect(xCoord, yCoord, this.#visualData[i].color)

      svg.appendChild(rect)

      const textPercent = this.#createPercentLabel(xCoord, yCoord, this.#eachPrecents[i])

      svg.appendChild(textPercent)

      const text = this.#createTextLabel(xCoord, yCoord, this.#visualData[i].label)

      svg.appendChild(text)

      yCoord += 15
    }
  }

  /**
   * Creates an SVG rect element with the given coordinates and color.
   *
   * @param {number} xCoord - The x-coordinate of the rect.
   * @param {number} yCoord - The y-coordinate of the rect.
   * @param {string} color - The fill color of the rect.
   * @returns {SVGRectElement} The created SVG rect element.
   */
  #createRect (xCoord, yCoord, color) {
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    rect.setAttribute('x', xCoord)
    rect.setAttribute('y', yCoord)
    rect.setAttribute('width', 10)
    rect.setAttribute('height', 10)
    rect.setAttribute('fill', color)

    return rect
  }

  /**
   * Creates an SVG text element to display the percentage label.
   *
   * @param {number} xCoord - The x-coordinate for the text element.
   * @param {number} yCoord - The y-coordinate for the text element.
   * @param {number} angle - The angle representing the percentage in decimal form.
   * @returns {SVGTextElement} The created SVG text element displaying the percentage.
   */
  #createPercentLabel (xCoord, yCoord, angle) {
    const textPercent = document.createElementNS('http://www.w3.org/2000/svg', 'text')
    textPercent.setAttribute('x', xCoord * 3)
    textPercent.setAttribute('y', yCoord + 8)
    textPercent.setAttribute('fill', 'black')
    textPercent.setAttribute('text-anchor', 'left')
    textPercent.setAttribute('font-size', this.#dataObject.config.fonts.xAxel)

    /* ------------ Calculate correct percentage ------------ */
    const percentInDec = angle
    const percent = Math.round((percentInDec * 100))
    /* ------------------------------------------------------ */
    textPercent.textContent = `${percent}%`

    return textPercent
  }

  /**
   * Creates an SVG text element to display a label.
   *
   * @param {number} xCoord - The x-coordinate for the text element.
   * @param {number} yCoord - The y-coordinate for the text element.
   * @param {string} label - The text content to display.
   * @returns {SVGTextElement} The created SVG text element displaying the label.
   */
  #createTextLabel (xCoord, yCoord, label) {
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
    text.setAttribute('x', xCoord * 6)
    text.setAttribute('y', yCoord + 8)
    text.setAttribute('fill', 'black')
    text.setAttribute('text-anchor', 'left')
    text.setAttribute('font-size', this.#dataObject.config.fonts.xAxel)
    text.textContent = label

    return text
  }

  /**
   * Calculates the total sum.
   *
   * @returns {number} The total sum.
   */
  #calculateSum () {
    let sum = 0

    for (const data of this.#visualData) {
      sum += data.value
    }

    return sum
  }

  /**
   * Calculates each angle.
   */
  #calculateEachAngle () {
    const TOTAL_ANGEL = 360

    for (const percent of this.#eachPrecents) {
      const angle = TOTAL_ANGEL * percent
      this.#eachAngles.push(angle)
    }
  }

  /**
   * Calculate each percent.
   *
   * @param {number} sum - Total value.
   */
  #calculateEachPercent (sum) {
    for (const data of this.#visualData) {
      const percent = data.value / sum
      this.#eachPrecents.push(percent)
    }
  }
}

export { CircleDiagram }
