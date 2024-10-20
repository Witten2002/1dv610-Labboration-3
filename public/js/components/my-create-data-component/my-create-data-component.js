/**
 * KOMMENTAR FÖR MODULEN
 *
 * @author Ludwig Wittenberg <lw223cq@student.lnu.se>
 * @version 1.0.0
 */

import { template } from './my-create-data-comonent-template.js'

customElements.define('my-create-data-component',
  /**
   * Extends the HTMLElement
   */
  class extends HTMLElement {
  #labelBox
  #valueBox
  #colorBox
  #boundLabelBox
  #boundValueBox
  #boundColorBox
    
    /**
     * Creates an instance of the custom element and attaches a shadow DOM.
     */
    constructor () {
      super();
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))

      this.#labelBox = this.shadowRoot.querySelector('#labelBox')
      this.#valueBox = this.shadowRoot.querySelector('#valueBox')
      this.#colorBox = this.shadowRoot.querySelector('#colorBox')
    }
    
    /**
     * Returns an array of attributes to be observed for changes.
     *
     * @returns {string[]} The list of attributes to be observed.
     */
    static get observedAttributes () {
      return []
    }
    
    /**
     * Called when one of the observed attributes changes.
     *
     * @param {string} name The name of the attribute that changed.
     * @param {string} oldValue The old value of the attribute.
     * @param {string} newValue The new value of the attribute.
     */
    attributeChangedCallback (name, oldValue, newValue) {
    }
    
    /**
     * Called when the element is connected to the DOM.
     */
    connectedCallback () {
      this.#labelBox.addEventListener('input', this.#boundLabelBox = (event) => {
        // checkvalue and send to another component.
      })

    }
    
    /**
     * Called when the element is disconnected from the DOM.
     */
    disconnectedCallback () {
      this.#labelBox.removeEventListener('', this.#boundLabelBox)
    }
  })