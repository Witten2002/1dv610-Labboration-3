/**
 * A class representing fake data to show on the home screen.
 *
 * @author Ludwig Wittenberg <lw223cq@student.lnu.se>
 * @version 1.0.0
 */

/**
 * A class representing fake data to show on the home screen.
 */
class FakeData {
  #fakeData
  /**
   * Creates an instance of FakeData.
   */
  constructor () {
    this.#createFakeData()
  }

  /**
   * Creates a list of fake data to display our diagrams.
   */
  #createFakeData () {
    const fakeData = [
      { label: '2019', value: 10, color: 'blue' },
      { label: '2020', value: 13, color: 'red' },
      { label: '2021', value: 18, color: 'yellow' },
      { label: '2022', value: 15, color: 'pink' },
      { label: '2023', value: 25, color: 'green' }
    ]

    this.#fakeData = fakeData
  }

  /**
   * Returns the fake data.
   *
   * @returns {Array} The fake data.
   */
  getFakeData () {
    return this.#fakeData
  }
}

export { FakeData }
