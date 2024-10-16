/**
 * A class representing a interactivity on bars.
 *
 * @author Ludwig Wittenberg <lw223cq@student.lnu.se>
 * @version 1.0.0
 */

import { diagramElements } from './config/DiagramTypes.js'
import { ATTRIBUTE } from './config/Attribute.js'

/**
 * A class representing a interactivity.
 */
class Interactivity {
  /* ----- Private properties ----- */
  #element
  #originalHeight
  #originalWidth
  #originalX
  #originalY
  #infoBox
  #title
  #value
  #orginalRadius
  #eventTarget
  /* ----------------------------- */

  /**
   * Creates an instance of Interactivity.
   *
   * @param {object} element - The chart that will be used to render the diagram.
   */
  constructor (element) {
    this.#element = element
    // maybe need to redo this? Sträng beroende
    this.#originalHeight = parseInt(this.#element.getAttribute(ATTRIBUTE.HEIGHT))
    this.#originalWidth = parseInt(this.#element.getAttribute(ATTRIBUTE.WIDTH))

    this.#originalX = parseInt(this.#element.getAttribute(ATTRIBUTE.XAXEL))
    this.#originalY = parseInt(this.#element.getAttribute(ATTRIBUTE.YAXEL))
    this.#orginalRadius = parseInt(this.#element.getAttribute(ATTRIBUTE.RADIE))
  }

  /**
   * Makes the bars interactive.
   *
   * @param {object} dataObject - The settings for the interactivity.
   * @param {object} visualData - The index of the bars.
   * @param {string} type - The type of the diagram.
   */
  makeInteractive (dataObject, visualData, type) {
    // currently not working with circle/path diagrams
    if (dataObject.config.interactivity.expand.show && this.#isCircle(type)) {
      this.#reactToMouseOver(dataObject.config.interactivity.expand.show)
    }

    if (dataObject.config.interactivity.infoBoxWhenHover.show) {
      this.#createInfoBox()
      this.#showInfoBoxWhenHover(visualData.label, visualData.value)
    }
  }

  /**
   * Checks if the given type is not a circle.
   *
   * @param {string} type - The type to check.
   * @returns {boolean} - Returns true if the type is not a circle, otherwise false.
   */
  #isCircle (type) {
    return type !== diagramElements.CIRCLE
  }

  /**
   * The user can interactive with the diagram.
   *
   * @param {boolean} expand - If the diagram should expaned when the mouse is over them.
   */
  #reactToMouseOver (expand) {
    this.#element.addEventListener('mouseover', (event) => {
      if (expand) {
        // expand the bars when the mouse is over them and animate the change
        if (this.#isHorizontalBar(event.target.tagName)) {
          this.#makeHorizontalBarInteractivity(event)
        } else if (this.#isCircle(event.target.tagName)) {
          this.#makeCircleInteractive(event)
        }
        this.#eventTarget = event.target.tagName
      }
    })

    // reset the bars to their original size and position when the mouse is not over them
    this.#element.addEventListener('mouseout', (event) => {
      if (expand) {
        if (this.#isHorizontalBar(event.target.tagName)) {
          this.#resetHorizontalBar(event)
        } else if (this.#isCircle(event.target.tagName)) {
          this.#resetCircle(event)
        }
      }
    })
  }

  /**
   * Checks if the event target is a horizontal bar.
   *
   * @param {*} type - The event to check.
   * @returns {boolean} - Returns true if the event target is a horizontal bar, otherwise false.
   */
  #isHorizontalBar (type) {
    return type === diagramElements.HORIZONTAL_BAR
  }

  /**
   * Applies interactivity to a horizontal bar element by expanding its size on an event.
   *
   * @param {Event} event - The event object triggered by the interaction.
   */
  #makeHorizontalBarInteractivity (event) {
    event.target.style.transition = 'width 0.5s ease, height 0.5s ease, x 0.5s ease, y 0.5s ease'
    event.target.setAttribute(ATTRIBUTE.WIDTH, this.#originalWidth + 10)
    event.target.setAttribute(ATTRIBUTE.HEIGHT, this.#originalHeight + 10)
    event.target.setAttribute(ATTRIBUTE.XAXEL, this.#originalX - 5)
    event.target.setAttribute(ATTRIBUTE.YAXEL, this.#originalY - 5)
  }

  /**
   * Applies interactivity to a circle element by expanding its radius on an event.
   *
   * @param {Event} event - The event object triggered by the interaction.
   */
  #makeCircleInteractive (event) {
    event.target.style.transition = 'r 0.5s ease'
    event.target.setAttribute(ATTRIBUTE.RADIE, this.#orginalRadius + 3)
  }

  /**
   * Resets the dimensions and position of a horizontal bar element to its original state.
   *
   * @param {Event} event - The event object triggered by the interaction.
   */
  #resetHorizontalBar (event) {
    event.target.setAttribute(ATTRIBUTE.WIDTH, this.#originalWidth)
    event.target.setAttribute(ATTRIBUTE.HEIGHT, this.#originalHeight)
    event.target.setAttribute(ATTRIBUTE.XAXEL, this.#originalX)
    event.target.setAttribute(ATTRIBUTE.YAXEL, this.#originalY)
  }

  /**
   * Resets the radius of a circle element to its original state.
   *
   * @param {Event} event - The event object triggered by the interaction.
   */
  #resetCircle (event) {
    event.target.setAttribute(ATTRIBUTE.RADIE, this.#orginalRadius)
  }

  /**
   * Shows an info box when the mouse is over the bars.
   *
   * @param {object} title - The settings for the info box.
   * @param {object} value - The settings for the info box.
   */
  #showInfoBoxWhenHover (title, value) {
    this.#element.addEventListener('mouseover', (event) => {
      this.#showInfoBox(event, title, value)
    })

    this.#element.addEventListener('mousemove', (event) => {
      this.#moveInfoBox(event)
    })

    this.#element.addEventListener('mouseout', (event) => {
      this.#hideInfoBox(event)
    })
  }

  /**
   * Displays an information box with the given title and value.
   *
   * @param {Event} event - The event object triggered by the interaction.
   * @param {string} title - The title to display in the information box.
   * @param {string|number} value - The value to display in the information box.
   */
  #showInfoBox (event, title, value) {
    this.#infoBox.style.display = 'flex'
    setTimeout(() => {
      this.#infoBox.style.opacity = '1'
      this.#infoBox.style.transform = 'scale(1)'
    }, 1000)
    this.#title.textContent = title
    this.#value.textContent = value
  }

  /**
   * Moves the information box to follow the cursor position.
   *
   * @param {MouseEvent} event - The mouse event object triggered by the interaction.
   */
  #moveInfoBox (event) {
    this.#infoBox.style.top = `${event.clientY + 10}px`
    this.#infoBox.style.left = `${event.clientX + 10}px`
  }

  /**
   * Hides the information box by setting its display, opacity, and transform properties.
   *
   * @param {Event} event - The event object triggered by the interaction.
   */
  #hideInfoBox (event) {
    this.#infoBox.style.display = 'none'
    this.#infoBox.style.opacity = '0'
    this.#infoBox.style.transform = 'scale(0.95)'
  }

  /**
   * Creates the info box.
   */
  #createInfoBox () {
    this.#createInfoBoxElement()
    this.#createInfoBoxContent()

    this.#styleInfoBox()

    document.body.appendChild(this.#infoBox)
  }

  /**
   * Creates an info box element and assigns it to the instance variable `#infoBox`.
   */
  #createInfoBoxElement () {
    this.#infoBox = document.createElement('div')
  }

  /**
   * Creates an info box element and assigns it to the instance variable `#infoBox`.
   */
  #createInfoBoxContent () {
    this.#title = document.createElement('span')
    this.#title.style.fontWeight = 'bold'
    this.#title.style.fontFamily = 'Arial'
    this.#title.style.fontSize = '12px'
    this.#infoBox.appendChild(this.#title)

    this.#value = document.createElement('span')
    this.#value.style.fontFamily = 'Arial'
    this.#value.style.fontSize = '12px'
    this.#infoBox.appendChild(this.#value)
  }

  /**
   * Styles the info box element with predefined CSS properties.
   */
  #styleInfoBox () {
    this.#infoBox.style.position = 'absolute'
    this.#infoBox.style.backgroundColor = 'white'
    this.#infoBox.style.color = 'black'
    this.#infoBox.style.padding = '5px'
    this.#infoBox.style.borderRadius = '1px'
    this.#infoBox.style.border = '1px solid black'
    this.#infoBox.style.zIndex = '10'
    this.#infoBox.style.display = 'none'
    this.#infoBox.style.pointerEvents = 'none'
    this.#infoBox.style.flexDirection = 'column'
    this.#infoBox.style.justifyContent = 'space-between'
    this.#infoBox.style.alignItems = 'start'
    this.#infoBox.style.transition = 'opacity 1s ease, transform 1s ease'
    this.#infoBox.style.opacity = '0'
    this.#infoBox.style.transform = 'scale(0.95)'
  }
}

export { Interactivity }
