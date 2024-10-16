/**
 * KOMMENTAR FÖR MODULEN
 *
 * @author Ludwig Wittenberg <lw223cq@student.lnu.se>
 * @version 1.0.0
 */

import { template } from './my-showDiagram-template.js'
import { DiagramFactory } from '../../lib/DiagramFactory/DiagramFactory.js'

// I dont really want to do this. ASK Daniel
const ATTRIBUTE_DATA = 'data'

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
      return [ATTRIBUTE_DATA]
    }

    /**
     * Called when one of the observed attributes changes.
     *
     * @param {string} name - The name of the attribute that changed.
     * @param {string} oldValue - The old value of the attribute.
     * @param {string} newValue - The new value of the attribute.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === ATTRIBUTE_DATA && oldValue !== newValue) {
        this.#data = JSON.parse(newValue)
        console.log(this.#data.data[0].value)
        this.#createDiagram()
      }
    }

    #createDiagram () {
      this.#createConfig()
      this.#renderDiagram()
    }

    #createConfig () {
      this.#diagramFactory = new DiagramFactory({
        elementId: '#svgDiagram',
        height: 400,
        width: 600,
        data: this.#data.data
      })

      this.#diagramFactory.displayBarDiagram()
    }

    #renderDiagram () {
      // set what diagram to render
    }
  }
)
