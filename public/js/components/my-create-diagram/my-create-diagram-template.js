/**
 * KOMMENTAR FÖR MODULEN
 *
 * @author Ludwig Wittenberg <lw223cq@student.lnu.se>
 * @version 1.0.0
 */

import { DIAGRAM_TYPES } from './config/DiagramTypes.js'

const template = document.createElement('template')
template.innerHTML = `
<link href='https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css' rel="stylesheet">

<div class="flex flex-col justify-center items-center w-full my-5">
  <div id="dataWrapper" class="h-min w-min p-3 flex flex-col gap-3">
  </div>
  <button id="addNewInputBtn" type="submit" class="p-2 bg-green-500 text-white rounded">Add new input</button>
  <h2 class="my-5 text-2xl italic">Choose the diagram you want to create</h2>
  <form>
  <select id="diagramChooser" class="p-2 border border-gray-300 rounded" required>
      <option value="" disabled selected>Select a diagram</option>
      <option value="${DIAGRAM_TYPES.HORIZONTAL_BAR}">Bar Diagram</option>
      <option value="${DIAGRAM_TYPES.LINE_DIAGRAM}">Line Diagram</option>
      <option value="${DIAGRAM_TYPES.CIRCLE_DIAGRAM}">Circle Diagram</option>
    </select>
  </form>
  <my-show-diagram></my-show-diagram>
</div>
`

export { template }