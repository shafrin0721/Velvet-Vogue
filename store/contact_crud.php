<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "velvetvogue";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


// Basic input validation & sanitization
$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$message = trim($_POST['message'] ?? '');

if (empty($name) || empty($email) || empty($message)) {
    die("Please fill in all required fields.");
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die("Invalid email format.");
}

// Prepare and bind to avoid SQL injection
$stmt = $conn->prepare("INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $name, $email, $message);

if ($stmt->execute()) {
    // Success - you can redirect or display a message
    header("Location: /store/contact.html?success=1");
    exit();
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
