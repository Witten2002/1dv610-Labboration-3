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
  #label
  #value
  #color
  #submitBtn
  #boundSubmitBtn
  #removeBtn
  #boundremoveBtn
    
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
      this.#submitBtn = this.shadowRoot.querySelector('#submitBtn')
      this.#removeBtn = this.shadowRoot.querySelector('#deleteBtn')
    }
    
    /**
     * Called when the element is connected to the DOM.
     */
    connectedCallback () {
      this.#labelBox.addEventListener('input', this.#boundLabelBox = (event) => {
        this.#label = this.#labelBox.value
      })

      this.#valueBox.addEventListener('input', this.#boundValueBox = (event) => {
        this.#value = Number.parseInt(this.#valueBox.value)
      })

      this.#colorBox.addEventListener('input', this.#boundColorBox = (event) => {
        this.#color = this.#colorBox.value
      })

      this.#submitBtn.addEventListener('click', this.#boundSubmitBtn = (event => this.#sendForm(event)))

      this.#removeBtn.addEventListener('click', this.#boundremoveBtn = (event) => this.#sendRemoveForm(event))

    }
    
    /**
     * Called when the element is disconnected from the DOM.
     */
    disconnectedCallback () {
      this.#labelBox.removeEventListener('', this.#boundLabelBox)
      this.#valueBox.removeEventListener('', this.#boundValueBox)
      this.#colorBox.removeEventListener('', this.#boundColorBox)
      this.#submitBtn.removeEventListener('', this.#boundSubmitBtn)
      this.#removeBtn.removeEventListener('', this.#boundremoveBtn)
    }

    #sendForm (event) {
      event.preventDefault()
  
      if (this.#label && this.#value && this.#color) {
        this.dispatchEvent(new CustomEvent('create:data:component:data', {
          detail: {
            data: {
              label: this.#label,
              value: this.#value,
              color: this.#color
            }
          }
        }))
        this.#submitBtn.setAttribute('disabled', true)
        this.#removeBtn.removeAttribute('disabled')
      }
    }

    #sendRemoveForm (event) {
      event.preventDefault()

      this.dispatchEvent(new CustomEvent('remove:data:component:data', {
        detail: {
          data: {
            label: this.#label,
            value: this.#value,
            color: this.#color
          }
        }
      }))
      this.#submitBtn.removeAttribute('disabled')
      this.#removeBtn.setAttribute('disabled', true)
    }
  })