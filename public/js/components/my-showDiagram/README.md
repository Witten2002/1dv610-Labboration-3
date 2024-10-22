# my-show-diagram

my-show-diagram is a custom web component designed for displaying various types of diagrams based on provided data. It uses the DiagramFactory to render interactive and animated diagrams, such as horizontal bar diagrams, circle diagrams, and line diagrams.

## Features
- Supports rendering of different diagram types: Horizontal Bar, Circle, and Line diagrams.
- Configurable dimensions (height and width).
- Interactive features like expansion and information boxes when hovering over elements.
- Animated diagram rendering with adjustable speed.
- Utilizes a shadow DOM to encapsulate styles and functionality.

## Installation
Include the ``my-show-diagram/index.js`` script in your project:

```html
<script src="./path/to/my-show-diagram/index.js" type="module"></script>
```
Make sure that the necessary dependencies, such as the ``DiagramFactory``, are available in your project.
it should be placed in tha folder ``public/lib`` and this webcomponent in `public/js/components`

## Usage
To use the component in your HTML file, add the following:

```html
<my-show-diagram></my-show-diagram>
```

## Attributes
The component observes the following attributes, which can be set to control its behavior:

- ``height``: The height of the diagram (in pixels).
- ``width``: The width of the diagram (in pixels).
- ``data``: JSON-formatted string representing the data to be visualized.
- ``type``: The type of diagram to display. Accepts values such as horizontalBar, circleDiagram, or lineDiagram.

## Example
```html
<my-show-diagram height="400" width="500" type="horizontalBar" data='{"data":[{"label":"A","value":30,"color":"red"}]}'></my-show-diagram>
```

## JavaScript Example
You can dynamically set the attributes and render the diagram using JavaScript:

```javascript
const diagramElement = document.querySelector('my-show-diagram')
diagramElement.setAttribute('height', '400')
diagramElement.setAttribute('width', '500')
diagramElement.setAttribute('data', JSON.stringify({
  data: [
    { label: 'A', value: 30, color: 'red' },
    { label: 'B', value: 50, color: 'blue' }
  ]
}))
diagramElement.setAttribute('type', 'circleDiagram')
```

## Custom Diagram Rendering
The ``my-show-diagram`` component utilizes a factory pattern for creating diagrams. Based on the type selected, it will render the appropriate diagram using the following:

- Horizontal Bar Diagram: Renders a bar diagram with horizontal bars.
- Circle Diagram: Renders a circular diagram (such as a pie chart).
- Line Diagram: Renders a line diagram to visualize data points over time or categories.

## Development
The component is built using the ``DiagramFactory``, which handles the rendering logic. The component attaches a shadow DOM, ensuring encapsulated styles and functionality. To modify or extend the component, you can work directly with the following files:

``my-show-diagram.js``: The main component file.
``DiagramFactory``: The diagram rendering logic.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.