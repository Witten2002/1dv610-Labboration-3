/**
 * Custom web component my-create-data.
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
      this.#labelBox.addEventListener('input', this.#boundLabelBox = (event) => this.#setLabel())

      this.#valueBox.addEventListener('input', this.#boundValueBox = (event) => this.#setValue())

      this.#colorBox.addEventListener('input', this.#boundColorBox = (event) => this.#setColor())

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

    /**
     * Sets the label value from the input box and updates the UI based on the input validity.
     * If the input value is a string, the label is set, the border color is changed to green,
     * and the submit button is enabled. Otherwise, the border color is changed to red,
     * and the submit button is disabled.
     */
    #setLabel () {
      const value = this.#labelBox.value

      if (typeof value === 'string') {
        this.#label = value

        this.#labelBox.style.borderColor = 'green'
        this.#submitBtn.removeAttribute('disabled')
      } else {
        this.#labelBox.style.borderColor = 'red'
        this.#submitBtn.setAttribute('disabled', true)
      }
    }

    /**
     * Sets the value from the input box and updates the UI based on the input validity.
     * If the input value is a non-negative integer, the value is set, the border color is changed to green,
     * and the submit button is enabled. Otherwise, the border color is changed to red,
     * and the submit button is disabled.
     */
    #setValue () {
      const value = Number.parseInt(this.#valueBox.value)

      if (value >= 0) {
        this.#value = value

        this.#valueBox.style.borderColor = 'green'
        this.#submitBtn.removeAttribute('disabled')
      } else {
        this.#valueBox.style.borderColor = 'red'
        this.#submitBtn.setAttribute('disabled', true)
      }
    }

    /**
     * Sets the color value from the color box input.
     */
    #setColor () {
      this.#color = this.#colorBox.value
    }

    /**
     * Handles the form submission by dispatching a custom event with the form data,
     * disabling and hiding the submit button, and enabling and showing the remove button.
     *
     * @param {Event} event - The event object associated with the form submission.
     */
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
        this.#toggleDisability()
      }
    }

    /**
     * Handles the form submission by dispatching a custom event with the form data,
     * disabling and hiding the submit button, and enabling and showing the remove button.
     *
     * @param {Event} event - The event object associated with the form submission.
     */
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
      this.#toggleDisability()
    }

    /**
     * Toggles the visibility and state of the submit and remove buttons.
     */
    #toggleDisability () {
      this.#submitBtn.toggleAttribute('disabled')
      this.#submitBtn.classList.toggle('hidden')
      this.#removeBtn.toggleAttribute('disabled')
      this.#removeBtn.classList.toggle('hidden')
    }
  })