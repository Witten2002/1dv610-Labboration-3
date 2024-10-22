/**
 * Template for my-create-diagram we component.
 *
 * @author Ludwig Wittenberg <lw223cq@student.lnu.se>
 * @version 1.0.0
 */

import { DIAGRAM_TYPES } from './config/DiagramTypes.js'

const template = document.createElement('template')
template.innerHTML = `
<link href='https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css' rel="stylesheet">

<div id="pageOne" class="flex flex-col justify-center items-center w-full my-5">
  <div id="dataWrapper" class="h-min w-min p-3 flex flex-col gap-3">
  </div>
  <button id="addNewInputBtn" type="submit" class="p-2 bg-green-500 text-white rounded">Add new input</button>
  <form class="hidden">
    <h2 class="my-5 text-2xl italic">Choose the diagram you want to create</h2>
    <section class="flex flex-row gap-10 justify-center items-center"> 
      <select id="diagramChooser" class="p-2 border border-gray-300 rounded" required>
          <option value="" disabled selected>Select a diagram</option>
          <option value="${DIAGRAM_TYPES.HORIZONTAL_BAR}">Bar Diagram</option>
          <option value="${DIAGRAM_TYPES.LINE_DIAGRAM}">Line Diagram</option>
          <option value="${DIAGRAM_TYPES.CIRCLE_DIAGRAM}">Circle Diagram</option>
      </select>
      <button id="renderDiagramBtn" type="submit" class="p-2 bg-blue-500 text-white rounded w-20 px-3" disabled>Render</button>
    </section>
  </form>
</div>
<div id="pageTwo" class="hidden">
  <div class=" flex flex-col justify-center items-center w-full my-5">
    <button id="backBtn" type="submit" class="p-2 bg-blue-500 text-white rounded w-20 px-3">Back</button>
    <div id="placeForDiagram">
      <my-show-diagram></my-show-diagram>
    </div>
    <div class="flex flec-row justify-end items-center py-10">
      <button id="svgBtn" type="submit" class="p-2 bg-blue-500 text-white rounded w-40 px-3">Download SVG</button>
    </div>
  </div>
</div>
`

export { template }