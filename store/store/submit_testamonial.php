<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$serve$servername = "localhost";
$username = "root";
$password = "";
$dbname = "velvetvogue";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get data from POST
    $name = $_POST['name'] ?? '';
    $rating = $_POST['rating'] ?? 0;
    $testimonial = $_POST['testimonial'] ?? '';

    // Validate input
    if (empty($name) || empty($testimonial) || $rating < 1 || $rating > 5) {
        echo json_encode(['error' => 'Please fill out all fields correctly.']);
        exit;
    }

    // Prepare the SQL statement
    $stmt = $conn->prepare("INSERT INTO testimonials (name, rating, testimonial) VALUES (?, ?, ?)");
    if ($stmt === false) {
        die("Prepare failed: " . $conn->error);
    }

    $stmt->bind_param("sis", $name, $rating, $testimonial);

    if ($stmt->execute()) {
        echo json_encode(['message' => 'Thank you! Your testimonial has been submitted.']);
    } else {
        echo json_encode(['error' => 'Error: ' . $stmt->error]);
    }

    $stmt->close();
}

$conn->close();
?>
