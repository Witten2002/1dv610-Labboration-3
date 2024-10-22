# Priems Conditori Application

Welcome to the Priem's Conditori Application README file! This comprehensive guide provides an overview of the application, its features, and how to utilize it effectively. Whether you're a bakery owner, an administrator, or a customer, this README will help you understand and navigate the Priem's Conditori Application.

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Getting Started](#getting-started)
4. [Admin Guide](#admin-guide)
5. [Customer Guide](#customer-guide)
6. [Technology Stack and Architecture](#technology-stack-and-architecture)

## Introduction

Priems Conditori Application is a versatile web-based platform tailored specifically for a local bakery in Nybro. It's designed to simplify product management, event coordination, and customer engagement. With intuitive interfaces and powerful features, it empowers bakery owners to showcase their products, promote events, and enhance customer experience.

## Features

### 1. Product Management
- **Add Products:** Easily upload images, provide titles, descriptions, and select product types.
- **Edit and Remove Products:** Update product details or remove listings as needed.

### 2. Event Coordination
- **Schedule Events:** Plan upcoming events such as Mother's Day, Midsummer, and special offers.
- **Set Event Dates:** Choose event dates and specify any associated promotions.

### 3. Admin Dashboard
- **Monitor Performance:** Track sales trends, analyze inventory levels, and view user engagement metrics.
- **Manage Listings:** Efficiently handle product and event listings, ensuring accuracy and relevance.

### 4. Customer Experience
- **Browse Products:** Customers can easily browse through available products with detailed descriptions and images.
- **Stay Informed:** Receive updates on upcoming events and special offers to stay engaged with the bakery.

## Getting Started

To access the Priem's Conditori Application:

1. Visit the application's website: [https://priemsconditori.se](https://priemsconditori.se).
2. If you're an administrator, log in to the admin dashboard using your credentials. Visit [Admin Dashboard](https://priemsconditori.se/admin) and enter your login credentials.
3. If you're a customer, simply browse the website to explore products and events.

![Customer](readme/img/image.png)

## Admin Guide

As an administrator, you have access to additional features for managing the bakery's offerings:

- **Adding Products:** Navigate to the admin dashboard to add new products with images, titles, descriptions, and types.
- **Scheduling Events:** Plan upcoming events by specifying dates and any associated promotions.

![Admin](readme/img/imageAdmin.png)

## Customer Guide

Customers can utilize the Priem's Conditori Application to:

- **Explore Products:** Browse through a wide range of bakery products with detailed descriptions and images.
- **Stay Updated:** Keep track of upcoming events and special offers to make the most of their bakery experience.

## Technology Stack and Architecture

### Frontend:
- **Tailwind CSS:** A utility-first CSS framework used for styling components and UI elements, providing rapid development and easy customization of styles.
- **JavaScript:** The primary programming language for frontend interactivity and dynamic content generation.
- **Flowbite Components:** Pre-designed components and layouts from Flowbite are utilized to enhance the visual aesthetics and user experience of the frontend.

### Backend:
- **Node.js and Express.js:** The backend of the application is built using Node.js as the runtime environment and Express.js as the web application framework. This combination offers flexibility and control over server-side logic and routing.
- **Server-Side Rendering (SSR):** The application employs server-side rendering to generate HTML pages dynamically on the server before sending them to the client. This approach enhances performance and SEO by delivering fully rendered pages to the user's browser.
- **MongoDB:** A NoSQL database used for storing product and upcoming event data. MongoDB's flexibility and scalability make it ideal for managing diverse data types and dynamic schemas.
- **Firebase:** Firebase is utilized for user authentication, providing secure login functionality. Additionally, Firebase handles analytics tracking and picture storage, offering a comprehensive solution for user management and data storage needs.

### Architecture:
- The application follows a client-server architecture, with frontend and backend components separated for modularity and scalability.
- Frontend components are built using Tailwind CSS, JavaScript, and Flowbite components, providing a responsive and visually appealing user interface.
- Backend functionality, including data storage and user authentication, is implemented using Node.js and Express.js, with MongoDB and Firebase serving as the primary data storage and user management systems, respectively.
- Server-side rendering is employed to generate HTML pages dynamically on the server, enhancing performance and SEO by delivering fully rendered pages to the client's browser.

![Architecture](readme/img/Priems-SystemDesign.png)