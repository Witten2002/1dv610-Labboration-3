# DiagramFactory

## Introduction

DiagramFactory is a web-based application that allows users to create, edit, and share diagrams. It provides a user-friendly interface for designing various types of diagrams, such as Bar, Line and Circle diagrams. With a wide range of tools and customization options, users can easily create professional-looking diagrams for personal or professional use. We show some examples of our diagrams on the page **Diagrams** where you can read some information about Nvidia and see their revenue the past years. You can also create your own diagrams by clicking on the **Create Diagram** page.

## Features

- Create different types of diagrams (e.g Bar, Line, Circle)
- Customize the appearance of diagrams with colors and labels
- Save created diagrams to your computer as an SVG file
- Simple and intuitive user interface

## Usage
1. Visit the website: Navigate to the website and follow the on screen instructions to create a new diagram.
2. Customize your data: Input your data and adjust the settings to create the desired visualization.
3. Create diagrams: Click "Create Diagram" to generate a chart based on the data you provide.
4. Save diagrams: Download the diagram as an SVG file directly to your computer.

## Screenshots

<img src="./readmeIMG/home.png" alt="Example Diagram" width="600" height="300">
<img src="./readmeIMG/creatediagram.png" alt="Example Diagram" width="600" height="300">
<img src="./readmeIMG/createBardiagram.png" alt="Example Diagram" width="600" height="300">
<img src="./readmeIMG/download.png" alt="Example Diagram" width="600" height="300">

## Technical Information
- Technologies: HTML, CSS, JavaScript (express, SSR)
- Diagram Creation: The diagrams are dynamically generated using SVG elements and offer both static and interactive visualizations.

## Known Issues
- The saved diagrams dont have the ability to be interactive and animated when downloaded as an SVG file.
- The application is not optimized for mobile devices and may not display correctly on smaller screens.

## Installation on server
#### Requirements:
- Node.js [GUIDE](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04)
- Nginx [GUIDE](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04)
- Pm2 [GUIDE](https://www.digitalocean.com/community/tutorials/how-to-use-pm2-to-setup-a-node-js-production-environment-on-an-ubuntu-vps)
- API KEY from [Financemodelingprep](https://site.financialmodelingprep.com/developer/docs)

#### Place the Files:
1. Navigate to /var/www/
2. Create a new map.
3. Place the project files in the new map.

#### Environment variables:
- Create a file called `ecosystem.config.js` in the root directory with the following content.
- Add the variables:
  - **PORT**: With the correct port number
  - **BASE_URL**: With the correct base url
  - **API_KEY**: Api key for the api **Financemodelingprep**

##### Example:
```javascript
module.exports = {
  apps: [{
    name: "DiagramFactory",
    script: "./src/server.js",
    env: {
      PORT: 3000,
      BASE_URL: "http://example.com",
      API_KEY: "your_api_key_here"
    }
  }]
}
```

#### Nginx:
Create a new path in the Nginx configuration file. With the same port as the port in the environment variables.

#### Start the application:
1. Navigate to the root directory of the project.
2. Run the command `npm install`
3. Run the command `pm2 start ecosystem.config.js`

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.