/**
 * KOMMENTAR FÖR MODULEN
 *
 * @author Ludwig Wittenberg <lw223cq@student.lnu.se>
 * @version 1.0.0
 */

/**
 * A class that prepares data for the diagram.
 */
class PrepairData {
  #data
  #prepairedData

  /**
   * Creates an instance of PrepairData.
   *
   * @param {Array<object>} data - The data to be set.
   */
  constructor (data) {
    this.#prepairedData = []
    this.#setData(data)
    this.#setState()
  }

  /**
   * Sets the data for the diagram.
   *
   * @param {Array<object>} data - The data to be set.
   */
  #setData (data) {
    this.#data = data
  }

  /**
   * Sets the state of the diagram.
   */
  #setState () {
    this.#prepareData()
  }

  /**
   * Prepares data for the diagram.
   *
   * @returns {Array<object>} The prepared data array for the diagram.
   */
  async #prepareData () {
    const dataArray = []
    const colors = ['red', 'blue', 'yellow', 'orange', 'green']

    for (let i = 0; i < this.#data.length; i++) {
      const diagramDataPoint = {
        label: this.#data[i].calendarYear,
        value: this.#toBillions(this.#data[i].revenue),
        color: colors[i]
      }

      dataArray.push(diagramDataPoint)
    }

    this.#prepairedData = dataArray.reverse()
  }

  /**
   * Returns the prepaired data.
   *
   * @returns {Array<object>} The prepaired
   */
  getPrepairedData () {
    return this.#prepairedData
  }

  /**
   * Will calculate the revenue into billions.
   *
   * @param {number} revenue The reveneu of the company per year.
   * @returns {number} The revenue in billions.
   */
  #toBillions (revenue) {
    const BILLION = 1000000000

    const reveneuInNewFormat = revenue / BILLION

    return reveneuInNewFormat
  }
}

export { PrepairData }
