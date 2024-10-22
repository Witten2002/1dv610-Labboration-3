# my-create-data-component

``my-create-data-component`` is a custom web component that provides a user interface for inputting data values, such as a label, value, and color. The component is designed to dispatch custom events when a form is submitted or when data is removed.

## Features

- Custom label, value, and color input fields.
- Form validation for string-based labels and non-negative integer values.
- Dispatches custom events with the form data on submission.
- Allows removal of data with a custom remove event.
- Supports interaction via a shadow DOM.

## Installation
Include the ``my-create-data-component/index.js`` script in your project:

```html
<script src="./path/to/my-create-data-component.js" type="module"></script>
```
Ensure that the component's template file (``my-create-data-component-template/index.js``) is also available.

## Usage
To use the component in your HTML file, include the following:

```html
<my-create-data-component></my-create-data-component>
```

## Custom Events
The component dispatches two custom events:

- ``create:data:component:data``: Triggered when the form is submitted successfully. Contains the label, value, and color input values in the event's ``detail`` object.

- ``remove:data:component:data``: Triggered when the remove button is clicked, containing the same data in the event's ``detail`` object.

## Example of listening to these events:

```javascript
document.querySelector('my-create-data-component').addEventListener('create:data:component:data', (event) => {
  console.log('Data created:', event.detail.data)
})

document.querySelector('my-create-data-component').addEventListener('remove:data:component:data', (event) => {
  console.log('Data removed:', event.detail.data)
})
```

## Input Fields
- Label: Accepts a string for labeling the data.
- Value: Accepts a non-negative integer.
- Color: Accepts a color value using a color picker input.

## Buttons
- Submit Button: Submits the data when all inputs are valid.
- Remove Button: Removes the previously submitted data.

## Development
To modify the component, ensure you have the following:

1. The component file: my-create-data-component.js
2. The template file: my-create-data-component-template.js
Both files should be included in the same directory.

License
This project is licensed under the MIT License. See the LICENSE file for more details.