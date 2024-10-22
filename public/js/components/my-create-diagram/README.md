# my-create-diagram

 ``my-create-diagram`` is a custom web component designed for creating and displaying various types of diagrams. Users can input data (such as label, value, and color) and choose from multiple diagram types to visualize the data. The component supports the creation, rendering, and downloading of diagrams in SVG format.

## Features
- Add multiple input fields for data creation (label, value, color).
- Choose from multiple diagram types: Horizontal Bar, Circle, and Line diagrams.
- Render diagrams dynamically based on user input.
- Download rendered diagrams as SVG files.
- Intuitive form handling for adding and removing data.
- Works in conjunction with other components, such as my-create-data-component for data input and my-show-diagram for rendering diagrams.

## Installation
Include the ``my-create-diagram/index.js`` script in your project (html):

```html
<script src="./path/to/my-create-diagram/index.js" type="module"></script>
```
Ensure the necessary dependencies such as ``my-create-data-component`` and ``my-show-diagram`` are also included in your project.

## Usage
To use the component in your HTML file, simply add the following tag:

```html
<my-create-diagram></my-create-diagram>
```
The component will initialize a form that allows you to input multiple sets of data (label, value, and color), choose a diagram type, and render the diagram.

## Example
```html
<my-create-diagram></my-create-diagram>
```

```javascript
  document.querySelector('my-create-diagram').addEventListener('create:data:component:data', (event) => {
    console.log('Data created:', event.detail.data)
  })

  document.querySelector('my-create-diagram').addEventListener('remove:data:component:data', (event) => {
    console.log('Data removed:', event.detail.data)
  })
```

## Custom Events
- ``create:data:component:data``: Triggered when a new set of data is successfully created. The data is provided in the detail field of the event.
- ``remove:data:component:data``: Triggered when a set of data is removed. The removed data is provided in the detail field of the event.

## Diagram Types
You can choose between the following types of diagrams:

- Horizontal Bar Diagram
- Circle Diagram
- Line Diagram
## Interacting with Diagrams
Once the diagram is rendered, you can download it as an SVG by clicking the "Download as SVG" button.

## Methods
### ``#addNewInputBox()``
Adds a new input field (using ``my-create-data-component``) to the form for the user to input new data.

### ``#renderDiagram()``
Renders the selected diagram using the data provided by the user.

### ``#downloadSvg()``
Downloads the rendered diagram as an SVG file.

## Development
To develop or extend the functionality, ensure you have the required dependencies and files:

1. ``my-create-diagram.js``
2. ``my-create-data-component`` (for data input)
3. ``my-show-diagram`` (for diagram rendering)

## License
This project is licensed under the MIT License. See the LICENSE file for more details.