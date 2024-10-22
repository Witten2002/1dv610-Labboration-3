/**
 * A web component for creating Diagrams.
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
    #diagramType
    #renderDiagramBtn
    #boundRenderDiagramBtn
    #pageOne
    #pageTwo
    #backBtn
    #boundBackBtn
    #svgBtn
    #boundSvgBtn
    #form
    
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
      this.#renderDiagramBtn = this.shadowRoot.querySelector('#renderDiagramBtn')
      this.#pageOne = this.shadowRoot.querySelector('#pageOne')
      this.#pageTwo = this.shadowRoot.querySelector('#pageTwo')
      this.#backBtn = this.shadowRoot.querySelector('#backBtn')
      this.#svgBtn = this.shadowRoot.querySelector('#svgBtn')
      this.#form = this.shadowRoot.querySelector('form')

      // start with one box
      this.#addNewInputBox()
    }
    
    /**
     * Called when the element is connected to the DOM.
     */
    connectedCallback () {
      this.#addNewInputBtn.addEventListener('click', this.#boundAddNewInputBtn = (event) => this.#addNewInputBox())

      this.#diagramChooser.addEventListener('input',  this.#boundDiagramChooser = (event) => this.#chooseDiagram())

      this.#renderDiagramBtn.addEventListener('click', this.#boundDiagramChooser = (event => this.#renderDiagram(event)))

      this.#backBtn.addEventListener('click', this.#boundBackBtn = (event) => this.#backToPageOne(event))

      this.#svgBtn.addEventListener('click', this.#boundSvgBtn = (event) => this.#downloadSvg(event))
    }
    
    /**
     * Called when the element is disconnected from the DOM.
     */
    disconnectedCallback () {
      this.#customDataElement.removeEventListener('', this.#boundCustomDataElement)

      this.#addNewInputBox.removeEventListener('', this.#boundAddNewInputBtn)

      this.#diagramChooser.removeEventListener('', this.#boundDiagramChooser)

      this.#renderDiagramBtn.removeEventListener('', this.#boundRenderDiagramBtn)

      this.#backBtn.removeEventListener('', this.#boundBackBtn)

      this.#svgBtn.removeEventListener('', this.#boundSvgBtn)
    }

    /**
     * Adds a new input box by creating a new `my-create-data-component` element,
     * attaching event listeners for custom events, and appending it to the data wrapper.
     */
    #addNewInputBox () {
      const newInputElement = document.createElement('my-create-data-component')

      newInputElement.addEventListener('create:data:component:data', this.#boundCustomDataElement = (event => this.#submitData(event)))

      newInputElement.addEventListener('remove:data:component:data', this.#boundCustomDataElement = (event) => this.#removeCustomData(event))

      this.#dataWrapper.append(newInputElement)
    }

    /**
     * Handles the submission of data by adding the data to the customData array
     * and updating the form visibility based on the length of the customData array.
     *
     * @param {CustomEvent} event - The custom event containing the data to be submitted.
     */
    #submitData (event) {
      this.#customData.push(event.detail.data)

      this.#showDiagramOptions() 
    }

    /**
     * Toggles the visibility of the form based on the length of the customData array.
     * If the customData array is empty, the form is hidden. Otherwise, the form is shown.
     */
    #showDiagramOptions () {
      if (this.#customData.length <= 0) {
        this.#form.classList.add('hidden')
      } else {
        this.#form.classList.remove('hidden')
      }
    }

    /**
     * Removes the specified data from the customData array and updates the form visibility.
     *
     * @param {object} event - The data object to be removed from the customData array.
     */
    #removeCustomData (event) {
      const dataToRemove = event.detail.data
      const index = this.#findIdex(dataToRemove)

      this.#removeInputBox(event.target)

      this.#customData.splice(index, 1)

      this.#showDiagramOptions() 
    }

    /**
     * Finds the index of the specified data object in the customData array.
     *
     * @param {Object} dataToRemove - The data object to find in the customData array.
     * @returns {number} The index of the data object in the customData array, or -1 if not found.
     */
    #findIdex (dataToRemove) {
      const index = this.#customData.findIndex(item => 
        item.label === dataToRemove.label && 
        item.value === dataToRemove.value && 
        item.color === dataToRemove.color
      )

      return index
    }

    /**
     * Removes the specified element from the dataWrapper if the customData array has more than one item.
     *
     * @param {HTMLElement} element - The element to be removed from the dataWrapper.
     */
    #removeInputBox (element) {
      if (this.#customData.length > 1) {
        this.#dataWrapper.removeChild(element)
      }
    }

    /**
     * Configures the diagram by setting its height and width attributes,
     * sends custom data to the diagram, and selects the appropriate diagram type.
     */
    #chooseDiagram () {
      this.#myShowDiagram.setAttribute('height', 400)
      this.#myShowDiagram.setAttribute('width', 500)

      this.#sendCustomDataToDiagram()
      this.#selectDiagram()
    }

    /**
     * Prepares and sends custom data to the `my-show-diagram` component.
     * The data is converted to a JSON string and set as an attribute on the component.
     */
    #sendCustomDataToDiagram () {
      const unprepairedData = {
        data: this.#customData
      }
      const prepairedInput = JSON.stringify(unprepairedData)
      this.#myShowDiagram.setAttribute('data', prepairedInput)
    }

    /**
     * Selects the diagram type based on the user's choice from the diagram chooser.
     * Enables the render button if a valid diagram type is selected.
     */
    #selectDiagram () {
      const userChoice = this.#diagramChooser.value

      if (userChoice === DIAGRAM_TYPES.HORIZONTAL_BAR) {
        this.#diagramType = DIAGRAM_TYPES.HORIZONTAL_BAR
      } else if (userChoice === DIAGRAM_TYPES.CIRCLE_DIAGRAM) {
        this.#diagramType = DIAGRAM_TYPES.CIRCLE_DIAGRAM
      } else if (userChoice === DIAGRAM_TYPES.LINE_DIAGRAM) {
        this.#diagramType = DIAGRAM_TYPES.LINE_DIAGRAM
      }

      this.#renderDiagramBtn.removeAttribute('disabled')
    }

    /**
     * Renders the selected diagram by hiding the first page, showing the second page,
     * and setting the diagram type attribute on the `my-show-diagram` component.
     *
     * @param {Event} event - The event object associated with the form submission.
     */
    #renderDiagram (event) {
      event.preventDefault()

      this.#pageOne.classList.add('hidden')
      this.#pageTwo.classList.remove('hidden')
      this.#myShowDiagram.setAttribute('type', this.#diagramType)
    }

    /**
     * Renders the selected diagram by hiding the first page, showing the second page,
     * and setting the diagram type attribute on the `my-show-diagram` component.
     *
     * @param {Event} event - The event object associated with the form submission.
     */
    #backToPageOne (event) {
      event.preventDefault()

      this.#pageOne.classList.remove('hidden')
      this.#pageTwo.classList.add('hidden')
    }

    /**
     * Downloads the SVG content from the `my-show-diagram` component as an SVG file.
     * If the SVG element is not found, an alert is shown to the user.
     *
     * @param {Event} event - The event object associated with the button click.
     */
    #downloadSvg (event) {
      event.preventDefault()

      const svgElement = this.#getSvgElement()
      const svgUrl = this.#createSvgUrl(svgElement)
      const downloadLink = this.#createDownloadLink(svgUrl)

      this.#startDownload(downloadLink)
    }

    /**
     * Retrieves the SVG element from the `my-show-diagram` component's shadow DOM.
     * If the SVG element is not found, an alert is shown to the user.
     *
     * @returns {SVGElement|null} The SVG element if found, otherwise null.
     */
    #getSvgElement () {
      const parentElement = this.shadowRoot.querySelector('my-show-diagram')
      const svgElement = parentElement.shadowRoot.querySelector('svg')

      if (!svgElement) {
        alert("SVG-elementet hittades inte.");
        return;
      }

      return svgElement
    }

    /**
     * Creates a data URL for the given SVG element.
     * The SVG element is serialized to a string and then encoded as a data URL.
     *
     * @param {SVGElement} svgElement - The SVG element to be serialized and encoded.
     * @returns {string} The data URL representing the serialized SVG element.
     */
    #createSvgUrl (svgElement) {
      const svgData = new XMLSerializer().serializeToString(svgElement)

      const svgUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgData);

      return svgUrl
    }

    /**
     * Creates a download link for the given SVG URL and sets the file name for the download.
     *
     * @param {string} svgUrl - The data URL representing the serialized SVG element.
     * @returns {HTMLAnchorElement} The anchor element configured for downloading the SVG.
     */
    #createDownloadLink (svgUrl) {
      const downloadLink = document.createElement('a')
      downloadLink.setAttribute('href', svgUrl)

      this.#setFileName(downloadLink)

      return downloadLink
    }

    /**
     * Sets the file name for the download link based on the diagram type.
     *
     * @param {HTMLAnchorElement} downloadLink - The anchor element configured for downloading the SVG.
     */
    #setFileName (downloadLink) {
      const fileName = `${this.#diagramType}.svg`
      downloadLink.setAttribute('download', fileName)
    }

    #startDownload (downloadLink) {
      this.shadowRoot.append(downloadLink)

      downloadLink.click()

      this.shadowRoot.removeChild(downloadLink)
    }
  })