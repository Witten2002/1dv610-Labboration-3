/**
 * A module that fetches and stores Nvidia historical data.
 *
 * @author Ludwig Wittenberg <lw223cq@student.lnu.se>
 * @version 1.0.0
 */

/**
 * A class which fetches Nvidia historical data.
 */
class FinanceFetcher {
  #data

  /**
   * Fetches Nvidia historical data.
   *
   * @async
   * @throws {Error} If the fetch request fails.
   */
  async fetchData () {
    const response = await fetch(`https://financialmodelingprep.com/api/v3/income-statement/NVDA?apikey=${process.env.API_KEY}`)

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

export { FinanceFetcher }
