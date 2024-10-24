/**
 * Test for the my-show-diagram component.
 *
 * @author Ludwig Wittenberg <lw223cq@student.lnu.se>
 * @version 1.0.0
 */

import '@testing-library/jest-dom'
import '../public/js/components/my-show-diagram/index.js'

test('Should render the component', () => {
  document.body.innerHTML = '<my-show-diagram></my-show-diagram>'

  const element = document.querySelector('my-show-diagram')

  expect(element).toBeInTheDocument()
})
