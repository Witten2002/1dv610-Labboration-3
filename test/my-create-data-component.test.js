/**
 * Test for the my-create-data-component component.
 *
 * @author Ludwig Wittenberg <lw223cq@student.lnu.se>
 * @version 1.0.0
 */

import '@testing-library/jest-dom'
import '../public/js/components/my-create-data-component/index.js'

test('Should render the component', () => {
  document.body.innerHTML = '<my-create-data-component></my-create-data-component>'

  const element = document.querySelector('my-create-data-component')

  expect(element).toBeInTheDocument()
})
