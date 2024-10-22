/**
 * KOMMENTAR FÖR MODULEN
 *
 * @author Ludwig Wittenberg <lw223cq@student.lnu.se>
 * @version 1.0.0
 */

import { template } from './my-create-diagram-template.js'
import '../my-create-data-component/index.js'
import '../my-showDiagram/index.js'
import { DIAGRAM_TYPES } from './config/DiagramTypes.js'

customElements.define('my-create-diagram',
    /**
   * Extends the HTMLElement
   */
  class extends HTMLElement {
    #customData
    #customDataElement
    #boundCustomDataElement
    #dataWrapper
    #addNewInputBtn
    #boundAddNewInputBtn
    #diagramChooser
    #boundDiagramChooser
    #myShowDiagram
    
    /**
     * Creates an instance of the custom element and attaches a shadow DOM.
     */
    constructor () {
      super();
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))

      this.#customData = []

      this.#dataWrapper = this.shadowRoot.querySelector('#dataWrapper')
      this.#addNewInputBtn = this.shadowRoot.querySelector('#addNewInputBtn')
      this.#diagramChooser = this.shadowRoot.querySelector('#diagramChooser')
      this.#myShowDiagram = this.shadowRoot.querySelector('my-show-diagram')

      this.#addNewInputBox()
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
      this.#addNewInputBtn.addEventListener('click', this.#boundAddNewInputBtn = (event) => this.#addNewInputBox())

      this.#diagramChooser.addEventListener('input',  this.#boundDiagramChooser = (event) => this.#renderDiagram(event))
    }
    
    /**
     * Called when the element is disconnected from the DOM.
     */
    disconnectedCallback () {
      this.#customDataElement.removeEventListener('', this.#boundCustomDataElement)

      this.#addNewInputBox.removeEventListener('', this.#boundAddNewInputBtn)

      this.#diagramChooser.removeEventListener('', this.#boundDiagramChooser)
    }

    #addNewInputBox () {
      const newInputElement = document.createElement('my-create-data-component')

      newInputElement.addEventListener('create:data:component:data', this.#boundCustomDataElement = (event => this.#submitData(event)))

      newInputElement.addEventListener('remove:data:component:data', this.#boundCustomDataElement = (event) => this.#removeCustomData(event.detail.data))

      this.#dataWrapper.append(newInputElement)
    }

    #submitData (event) {
      this.#customData.push(event.detail.data)

      console.log(event.detail.data)
      console.log(this.#customData)
    }

    #removeCustomData (dataToRemove) {
      const index = this.#customData.findIndex(item => 
        item.label === dataToRemove.label && 
        item.value === dataToRemove.value && 
        item.color === dataToRemove.color
      )

      this.#customData.splice(index, 1)
    }

    #renderDiagram (event) {
      // here we choose what Diagram we want to render. visa setting an attribute on the element
      this.#myShowDiagram.setAttribute('height', 400)
      this.#myShowDiagram.setAttribute('width', 500)

      this.#sendCustomDataToDiagram()
      this.#selectDiagram(event)
    }

    #sendCustomDataToDiagram () {
      const unprepairedData = {
        data: this.#customData
      }
      const prepairedInput = JSON.stringify(unprepairedData)
      console.log(prepairedInput)
      this.#myShowDiagram.setAttribute('data', prepairedInput)

    }

    #selectDiagram (event) {
      const userChoice = this.#diagramChooser.value

      if (userChoice === DIAGRAM_TYPES.HORIZONTAL_BAR) {
        this.#myShowDiagram.setAttribute('type', DIAGRAM_TYPES.HORIZONTAL_BAR)
      } else if (userChoice === DIAGRAM_TYPES.CIRCLE_DIAGRAM) {
        this.#myShowDiagram.setAttribute('type', DIAGRAM_TYPES.CIRCLE_DIAGRAM)
      } else if (userChoice === DIAGRAM_TYPES.LINE_DIAGRAM) {
        this.#myShowDiagram.setAttribute('type', DIAGRAM_TYPES.LINE_DIAGRAM)
      }
    }

  })