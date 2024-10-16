/**
 * KOMMENTAR FÖR MODULEN
 *
 * @author Ludwig Wittenberg <lw223cq@student.lnu.se>
 * @version 1.0.0
 */

/**
 * A class to fetch and store COVID-19 historical data.
 */
class Covid19Statics {
  #data

  /**
   * Fetches COVID-19 historical data for the last 4 days.
   *
   * @async
   * @throws {Error} If the fetch request fails.
   */
  async fetchData () {
    const response = await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=4')

    if (!response.ok) {
      throw new Error('Failed to fetch')
    }

    const data = await response.json()
    this.#data = data
  }

  /**
   * Returns the fetched data.
   *
   * @returns {object} The fetched data.
   */
  getData () {
    return this.#data
  }
}

export { Covid19Statics }
