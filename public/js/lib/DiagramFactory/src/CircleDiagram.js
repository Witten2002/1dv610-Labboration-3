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
    const DIVIDED = 2
    const PADDING = 30

    const radius = Math.min(svgWidth, svgHeight) / DIVIDED - PADDING
    const centerX = svgWidth / DIVIDED
    const centerY = svgHeight / DIVIDED

    let startAngle = 0

    for (let i = 0; i < this.#eachAngles.length; i++) {
      const RADIUS_TRIANGLE = 180
      const endAngle = startAngle + this.#eachAngles[i] * Math.PI / RADIUS_TRIANGLE

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

    const coords = {
      xCoord,
      yCoord
    }

    for (let i = 0; i < this.#visualData.length; i++) {
      const rect = this.#createRect(coords, this.#visualData[i].color)

      svg.appendChild(rect)

      const textPercent = this.#createPercentLabel(coords, this.#eachPrecents[i])

      svg.appendChild(textPercent)

      const text = this.#createTextLabel(coords, this.#visualData[i].label)

      svg.appendChild(text)

      coords.yCoord += 15
    }
  }

  /**
   * Creates an SVG rect element with the given coordinates and color.
   *
   * @param {object} coords - The coordinates.
   * @param {string} color - The fill color of the rect.
   * @returns {SVGRectElement} The created SVG rect element.
   */
  #createRect (coords, color) {
    const SIZE = 10

    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    rect.setAttribute('x', coords.xCoord)
    rect.setAttribute('y', coords.yCoord)
    rect.setAttribute('width', SIZE)
    rect.setAttribute('height', SIZE)
    rect.setAttribute('fill', color)

    return rect
  }

  /**
   * Creates an SVG text element to display the percentage label.
   *
   * @param {object} coords - The coordinates.
   * @param {number} angle - The angle representing the percentage in decimal form.
   * @returns {SVGTextElement} The created SVG text element displaying the percentage.
   */
  #createPercentLabel (coords, angle) {
    const MOVE_X = 3
    const MOVE_Y = 8

    const textPercent = document.createElementNS('http://www.w3.org/2000/svg', 'text')
    textPercent.setAttribute('x', coords.xCoord * MOVE_X)
    textPercent.setAttribute('y', coords.yCoord + MOVE_Y)
    textPercent.setAttribute('fill', 'black')
    textPercent.setAttribute('text-anchor', 'left')
    textPercent.setAttribute('font-size', this.#dataObject.config.fonts.xAxel)

    /* ------------ Calculate correct percentage ------------ */
    const percent = this.#calculatePercent(angle)
    /* ------------------------------------------------------ */
    textPercent.textContent = `${percent}%`

    return textPercent
  }


  #calculatePercent (angle) {
    const percentInDec = angle
    const HUNDREDPERCENT = 100
    const percent = Math.round((percentInDec * HUNDREDPERCENT))

    return percent
  }

  /**
   * Creates an SVG text element to display a label.
   *
   * @param {object} coords - The coordinates.
   * @param {string} label - The text content to display.
   * @returns {SVGTextElement} The created SVG text element displaying the label.
   */
  #createTextLabel (coords, label) {
    const MOVE_X = 6
    const MOVE_Y = 8

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
    text.setAttribute('x', coords.xCoord * MOVE_X)
    text.setAttribute('y', coords.yCoord + MOVE_Y)
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
