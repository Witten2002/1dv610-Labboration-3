/**
 * KOMMENTAR FÖR MODULEN
 *
 * @author Ludwig Wittenberg <lw223cq@student.lnu.se>
 * @version 1.0.0
 */

import { template } from './my-showDiagram-template.js'
import { DiagramFactory } from '../../lib/DiagramFactory/DiagramFactory.js'
import { DIAGRAM_TYPES } from './config/DiagramTypes.js'
import { ATTRIBUTES } from './config/Attributes.js'

/**
 * A custom HTML element for displaying a diagram.
 */
customElements.define('my-show-diagram',
  /**
   * Extends the HTMLElement
   */
  class extends HTMLElement {
    #data
    #diagramFactory
    /**
     * Creates an instance of the custom element and attaches a shadow DOM.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
    }

    /**
     * Returns an array of attributes to be observed for changes.
     *
     * @returns {string[]} The list of attributes to be observed.
     */
    static get observedAttributes () {
      return [ATTRIBUTES.DATA, ATTRIBUTES.TYPE]
    }

    /**
     * Called when one of the observed attributes changes.
     *
     * @param {string} name - The name of the attribute that changed.
     * @param {string} oldValue - The old value of the attribute.
     * @param {string} newValue - The new value of the attribute.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      
      console.log(name)
      if (name === ATTRIBUTES.DATA && oldValue !== newValue) {
        this.#data = JSON.parse(newValue)
        this.#createDiagram()
      } else if (name === ATTRIBUTES.TYPE && oldValue !== newValue) {
        this.#renderDiagram(newValue)
      }
    }

    #createDiagram () {
      this.#createConfig()
      this.#renderDiagram()
    }

    #createConfig () {
      this.#diagramFactory = new DiagramFactory({
        elementId: '#svgDiagram',
        shadowRoot: this.shadowRoot,
        height: 400,
        width: 600,
        data: this.#data.data
      })
    }

    /**
     * Will choose the correct diagram.
     * 
     * @param {string} type - What type of diagram we want to display. 
     */
    #renderDiagram (type) {
      if (type === DIAGRAM_TYPES.HORIZONTAL_BAR) {
        this.#diagramFactory.displayBarDiagram()
      } else if (type === DIAGRAM_TYPES.CIRCLE_DIAGRAM) {
        this.#diagramFactory.displayCircleDiagram()
      } else if (type === DIAGRAM_TYPES.LINE_DIAGRAM) {
        this.#diagramFactory.displayLineDiagram()
      }
    }
  }
)
