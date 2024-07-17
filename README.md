# Express Logging Best Practices

This project demonstrates best practices for logging using an Express application using Winston as an example.

Read the accompanying Medium article [here](https://medium.com/@fullstackmatt/log-smarter-not-harder-best-practices-for-optimal-logging-ca1864c53bc2).

## Features

- **Express**: Web framework for Node.js.
- **Winston**: Logging library for structured and flexible logging.

## Getting Started

### Prerequisites

- Node.js
- npm (Node package manager)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

### Running the Application

Start the server:

```sh
node index.js
```

### Running Tests

Run the tests with Jest:

```sh
npm test
```

## Usage

- Access the service at `http://localhost:3000/process-order/:orderId`.
- Replace `:orderId` with the order ID you want to process.

## Code Overview

- **`server.js`**: Sets up Express routes and Winston logger.
- **`index.js`**: Starts the server.
- **`server.test.js`**: Contains Jest tests for the server.

## Logging

Logs are saved in `combined.log` and output to the console.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
