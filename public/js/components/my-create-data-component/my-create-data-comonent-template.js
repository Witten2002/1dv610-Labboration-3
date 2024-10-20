/**
 * KOMMENTAR FÖR MODULEN
 *
 * @author Ludwig Wittenberg <lw223cq@student.lnu.se>
 * @version 1.0.0
 */

const template = document.createElement('template')
template.innerHTML = `
<link href='https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css' rel="stylesheet">
<div class="flex flex-row justify-center items-center gap-3">
  <form class="flex flex-row gap-3">
    <input id="labelBox" type="text" placeholder="Enter a label" class="p-2 border border-gray-300 rounded">
    <input id="valueBox" type="text" placeholder="Enter a value" class="p-2 border border-gray-300 rounded">
    <select id="colorBox" class="p-2 border border-gray-300 rounded">
      <option value="" disabled selected>Select a color</option>
      <option value="red">Red</option>
      <option value="orange">Orange</option>
      <option value="yellow">Yellow</option>
      <option value="green">Green</option>
      <option value="blue">Blue</option>
      <option value="indigo">Indigo</option>
      <option value="violet">Violet</option>
      <option value="purple">Purple</option>
      <option value="pink">Pink</option>
      <option value="brown">Brown</option>
      <option value="black">Black</option>
      <option value="white">White</option>
      <option value="gray">Gray</option>
      <option value="cyan">Cyan</option>
      <option value="magenta">Magenta</option>
      <option value="lime">Lime</option>
      <option value="teal">Teal</option>
      <option value="olive">Olive</option>
      <option value="maroon">Maroon</option>
      <option value="navy">Navy</option>
    </select>
  </form>

</div>
`
export { template }
