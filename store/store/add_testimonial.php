<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

function main() {
    $servername = "localhost";
    $username = "root"; // Default XAMPP username
    $password = ""; // Default XAMPP password (usually empty)
    $dbname = "velvetvogue";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        echo json_encode(['error' => 'Connection failed: ' . $conn->connect_error]);
        exit;
    }

    // Get values from POST (FormData sent via fetch)
    $name = trim($_POST['name'] ?? '');
    $rating = isset($_POST['rating']) ? (int)$_POST['rating'] : 0;
    $testimonial = trim($_POST['testimonial'] ?? '');

    // Validate input
    if ($name === '' || $testimonial === '' || $rating < 1 || $rating > 5) {
        echo json_encode(['error' => 'Invalid input data.']);
        exit;
    }

    // Debug logs (optional)
    error_log("Name: $name");
    error_log("Rating: $rating");
    error_log("Testimonial: $testimonial");

    // Check if the testimonial already exists
    $stmt = $conn->prepare("SELECT * FROM testimonials WHERE name = ? AND testimonial = ?");
    $stmt->bind_param("ss", $name, $testimonial);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo json_encode(['error' => 'This testimonial already exists.']);
        exit;
    }

    // Prepare SQL
    $stmt = $conn->prepare("INSERT INTO testimonials (name, rating, testimonial) VALUES (?, ?, ?)");
    if (!$stmt) {
        echo json_encode(['error' => 'Prepare failed: ' . $conn->error]);
        exit;
    }

    $stmt->bind_param("sis", $name, $rating, $testimonial);

    if ($stmt->execute()) {
        echo json_encode(['message' => 'Thank you! Your testimonial has been submitted.']);
    } else {
        echo json_encode(['error' => 'Execution failed: ' . $stmt->error]);
    }

    $stmt->close();
    $conn->close();
}

header('Content-Type: application/json');
main();
?>
