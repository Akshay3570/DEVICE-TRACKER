# Real-time Device Tracker

![Trip-Replay-2](https://github.com/user-attachments/assets/176356fa-566f-41ef-a4bb-8bd96e7c0eca)

## Overview

This project is a real-time device tracking application that uses geolocation and WebSockets to track the location of devices and display them on a map. It leverages Node.js, Express, Socket.io, and Leaflet.js to provide real-time updates and map rendering.

## Features

- Real-time device location tracking
- Interactive map with markers
- Automatic marker updates as device locations change
- Support for multiple devices

## Technologies Used

- Node.js
- Express.js
- Socket.io
- Leaflet.js
- HTML, CSS, and JavaScript
- Helmet (for setting security-related HTTP headers)

## Project Structure

```bash
.
|-- public
|   |-- css
|   |   `-- style.css
|   |-- js
|   |   `-- script.js
|   `-- index.html
|-- app.js
|-- render.yaml
|-- package.json
`-- README.md
```

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/realtime-device-tracker.git
    ```
2. Navigate to the project directory:
    ```bash
    cd realtime-device-tracker
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```

## Usage

1. Start the server:
    ```bash
    npm start
    ```
2. Open your web browser and navigate to:
    ```
    http://localhost:3000
    ```

## Push to GitHub

1. Initialize Git if needed:
    ```bash
    git init
    ```
2. Add and commit the project:
    ```bash
    git add .
    git commit -m "Prepare app for deployment"
    ```
3. Add your GitHub repository and push:
    ```bash
    git remote add origin https://github.com/yourusername/realtime-device-tracker.git
    git branch -M main
    git push -u origin main
    ```

## Deploy on Render

1. Push this project to GitHub.
2. In Render, create a new **Web Service** from your GitHub repository.
3. Use these settings if Render does not auto-detect them:
    ```bash
    Build Command: npm install
    Start Command: npm start
    ```
4. The app uses Render's `PORT` environment variable automatically.

The included `render.yaml` can also be used by Render as a blueprint.

Note: Geolocation works best on secure origins. Render provides HTTPS, so browser location access should work after deployment if the user grants permission.

## Middleware

**Helmet**: A collection of middleware functions that help secure Express apps by setting various HTTP headers. In this project, it is used to set the Content Security Policy (CSP) headers to control the sources from which various resources can be loaded.

## Tools

**Git**: Version control system used for tracking changes in the source code.


**npm**: Package manager for Node.js, used to install and manage dependencies.

# Working

## Backend

**Server Initialization**: The server is initialized using Express.js and sets up an HTTP server.


**Socket.io Integration**: Socket.io is integrated to handle real-time communication. When a client connects, a unique socket ID is generated.


**Geolocation Data Handling**: The server listens for geolocation data sent from clients. When data is received, it broadcasts the location update to all connected clients.


**Client Disconnection**: When a client disconnects, the server cleans up any associated data and informs other clients to remove the marker from the map.

## Frontend

**Geolocation Retrieval**: The browser's Geolocation API is used to continuously monitor the device's position.


**Socket.io Client**: The client-side JavaScript establishes a connection with the server using Socket.io.


**Location Emission**: The current geolocation is sent to the server at regular intervals.


**Map Rendering**: Leaflet.js is used to create an interactive map. Markers are added to the map to represent the location of each connected device.


**Real-time Updates**: As location updates are received from the server, the positions of the markers on the map are updated in real-time.


**Marker Management**: The client-side code handles the creation, updating, and removal of markers based on the data received from the server.

## Conclusion 

By combining these technologies and tools, the Real-time Device Tracker provides a robust solution for monitoring the locations of multiple devices in real-time and displaying them on an interactive map.

## Support

#### If you like this project, show your support & love!

[![buy me a coffee](https://res.cloudinary.com/customzone-app/image/upload/c_pad,w_200/v1712840190/bmc-button_wl78gx.png)](https://www.buymeacoffee.com/akashsunile)
