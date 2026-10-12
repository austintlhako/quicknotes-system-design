# QuickNotes System Design & Implementation

A full-stack web application project demonstrating responsive frontend development with vanilla JavaScript, RESTful API integration, relational database modeling, and scalable system architecture. 

## Overview

QuickNotes is designed to be a lightweight, high-performance note-taking application. This repository contains the frontend client code, API interaction logic, and comprehensive technical documentation outlining the database schema and system architecture.

## Features

### Frontend Implementation
* **Draft Editor:** A dynamic text editor featuring real-time character and word counting, local storage persistence, and visual constraints (warnings at 180 and 200 characters).
* **Theme Management:** CSS variable-based dark/light mode toggle that remembers user preferences via LocalStorage.
* **API Integration:** Asynchronous JavaScript client (`api.js`) to handle CRUD operations (GET, POST, DELETE) against a RESTful API, complete with loading states, error handling, and DOM manipulation.
* **User Directory:** An asynchronous user fetching tool with real-time, case-insensitive front-end filtering.

### System & Architecture Documentation
* **REST API Design:** Fully documented endpoints, HTTP methods, status codes, and JSON payloads for a scalable note-taking service.
* **Relational Data Model:** SQL schema design featuring one-to-many (Users to Notes) and many-to-many (Notes to Tags) relationships, complete with foreign keys, indexing strategies, and cascading deletes.
* **System Architecture:** High-level infrastructure planning targeting 99.9% uptime and low-latency reads, utilizing load balancers, stateless API servers, and primary-replica database configurations.

## Project Structure

    ├── index.html               # Main application interface and DOM structure
    ├── style.css                # Application styling and theme variables
    ├── api.js                   # Draft editor logic, counters, and theme toggling
    └── docs/
        ├── api-design.md        # RESTful API specifications and error handling
        ├── data-model.md        # Database schema, entities, and SQL/NoSQL trade-offs
        ├── architecture.md      # Infrastructure diagrams, request flows, and scaling strategies
        └── school-design.md     # Relational mapping concepts and index reasoning

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/austintlhako/quicknotes-system-design.git](https://github.com/austintlhako/quicknotes-system-design.git)
   cd quicknotes-system-design