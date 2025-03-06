// Simulated Data
let users = []; // Stores registered users {name, password, hasVoted: false}
let blockchain = []; // Stores votes as blocks

const adminCredentials = { name: "admin", password: "admin123" }; // Admin credentials

// Register Functionality
function register() {
    const name = document.getElementById("loginName").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (!name || !password) {
        alert("Name and password cannot be empty!");
        return;
    }

    if (users.some(user => user.name === name)) {
        alert("User already registered!");
        return;
    }

    users.push({ name, password, hasVoted: false });
    alert("Registration successful! You can now log in.");
    clearLoginInputs();
}

// Login Functionality
function login() {
    const name = document.getElementById("loginName").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (!name || !password) {
        alert("Name and password cannot be empty!");
        return;
    }

    if (name === adminCredentials.name && password === adminCredentials.password) {
        // Admin login
        alert("Admin login successful!");
        showBlockchain();
        return;
    }

    const user = users.find(user => user.name === name && user.password === password);
    if (!user) {
        alert("Invalid credentials!");
        return;
    }

    if (user.hasVoted) {
        alert("You have already voted and cannot vote again.");
        return;
    }

    alert("Login successful!");
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("votingPage").style.display = "block";
    document.getElementById("welcome").innerText = `Welcome, ${name}`;
    clearLoginInputs();
}

// Logout Functionality
function logout() {
    document.getElementById("votingPage").style.display = "none";
    document.getElementById("resultsPage").style.display = "none";
    document.getElementById("blockchainPage").style.display = "none";
    document.getElementById("loginPage").style.display = "block";
}

// Voting Functionality
function castVote() {
    const name = document.getElementById("welcome").innerText.split(", ")[1];
    const candidate = document.getElementById("candidate").value;

    const user = users.find(user => user.name === name);
    if (!user) {
        alert("User not found!");
        logout();
        return;
    }

    if (user.hasVoted) {
        alert("You have already voted and cannot vote again.");
        logout();
        return;
    }

    user.hasVoted = true; // Mark the user as having voted
    createBlock(name, candidate);
    alert("Vote cast successfully!");
    logout(); // Redirect to login page after voting
}

// Blockchain Creation
function createBlock(voterName, candidate) {
    const previousHash = blockchain.length ? blockchain[blockchain.length - 1].hash : "0000";
    const block = {
        index: blockchain.length + 1,
        voter: voterName,
        candidate: candidate,
        previousHash: previousHash,
        hash: generateHash(voterName, candidate, previousHash),
    };
    blockchain.push(block);
}

// Simple Hash Function
function generateHash(voter, candidate, previousHash) {
    return (voter + candidate + previousHash).split("").reduce((acc, char) => acc + char.charCodeAt(0), 0).toString(16);
}

// Show Blockchain for Admin
function showBlockchain() {
    const blockchainDisplay = document.getElementById("blockchainDisplay");
    blockchainDisplay.innerHTML = blockchain
        .map(block => `
            <div>
                <p><b>Block Index:</b> ${block.index}</p>
                <p><b>Voter:</b> ${block.voter}</p>
                <p><b>Candidate:</b> ${block.candidate}</p>
                <p><b>Previous Hash:</b> ${block.previousHash}</p>
                <p><b>Hash:</b> ${block.hash}</p>
                <hr>
            </div>
        `)
        .join("");

    document.getElementById("loginPage").style.display = "none";
    document.getElementById("blockchainPage").style.display = "block";
}

// Results Functionality
function showResults() {
    const results = blockchain.reduce((acc, block) => {
        acc[block.candidate] = (acc[block.candidate] || 0) + 1;
        return acc;
    }, {});

    const resultDisplay = document.getElementById("resultDisplay");
    resultDisplay.innerHTML = Object.entries(results)
        .map(([candidate, votes]) => `<p>${candidate}: ${votes} votes</p>`)
        .join("");

    document.getElementById("loginPage").style.display = "none";
    document.getElementById("votingPage").style.display = "none";
    document.getElementById("resultsPage").style.display = "block";
}

function clearLoginInputs() {
    document.getElementById("loginName").value = "";
    document.getElementById("loginPassword").value = "";
}
// Back to Login Page
function backToLogin() {
    document.getElementById("resultsPage").style.display = "none";
    document.getElementById("loginPage").style.display = "block";
}

