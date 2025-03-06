# E-voting-system-using-the-blockchain-technology-
This is a simulated e-voting system that ensures secure and transparent voting using blockchain principles. Users can register, log in, vote securely, and view results, while admins can monitor votes through a blockchain-style structure. The system is built using HTML, CSS, and JavaScript without a backend.
README.md  # Project Overview
```md
# E-Voting System

## Overview
This is a simulated E-Voting System that follows **blockchain principles** to ensure secure and transparent voting. The system allows users to register, log in, vote securely, and view results. Admins can monitor votes through a blockchain-style structure.

## Features
- **User Authentication**: Register and login functionality.
- **Voting System**: Users can cast votes securely.
- **Blockchain-based Voting**: Votes are stored as immutable blocks.
- **Admin Panel**: Admins can view the blockchain and election results.

## Tech Stack
- **Frontend**: HTML, CSS, JavaScript

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/e-voting-system.git
   ```
2. Navigate to the project folder:
   ```sh
   cd e-voting-system/frontend
   ```
3. Open `index.html` in a browser to run the application.

## Simulated Data & Blockchain
The system uses an in-memory structure for users and a blockchain-style ledger to store votes:
```js
let users = []; // Stores registered users {name, password, hasVoted: false}
let blockchain = []; // Stores votes as blocks
const adminCredentials = { name: "admin", password: "admin123" }; // Admin login
```

## License
This project is open-source and available under the MIT License.
```
