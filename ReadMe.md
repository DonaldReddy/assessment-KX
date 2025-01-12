# Koinx Assessment

## Overview

Koinx is a project designed to track cryptocurrency prices. This README provides instructions on how to set up the project and details all available endpoints.
currently supports three cryptocurrencies.

- Bitcoin(bitcoin)
- Ethereum(ethereum)
- Polygon (matric-network)

## Deploy link https://assessment-kx.onrender.com

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/DonaldReddy/assessment-KX.git
   ```
2. Navigate to the project directory:
   ```sh
   cd assessment-KX
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

provide all the environmental variable mentioned in the `.env.dev` file in `.env` file.

# Need MongoDB installed locally or remotely hosted.

### Running the Project

To start the project, run:

```sh
npm start
```

## API Endpoints

```bash
GET :-  "/api/stats?coin=bitcoin"
Query Param:- coin="name"

returns the stats of the coin.
```

```bash
GET :-  "/api/deviation?coin=bitcoin"
Query Param:- coin="name"

returns the deviation of the past 100 record of the coin price.
```

# Tech Stack

```
Server:= Node.js + Express + TypeScript + Node-Cron
```

```
DataBase:= MongoDB
```
