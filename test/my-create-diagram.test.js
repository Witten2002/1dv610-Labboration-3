/**
 * Test for the my-create-diagram component.
 *
 * @author Ludwig Wittenberg <lw223cq@student.lnu.se>
 * @version 1.0.0
 */

import '@testing-library/jest-dom'
import '../public/js/components//my-create-diagram/index.js'

test('Should render the component', () => {
  document.body.innerHTML = '<my-create-diagram></my-create-diagram>'

  const element = document.querySelector('my-create-diagram')

  expect(element).toBeInTheDocument()
})
