<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Always return JSON
header('Content-Type: application/json');

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "velvetvogue";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    echo json_encode(['error' => 'Database connection failed: ' . $conn->connect_error]);
    exit;
}

// Fetch testimonials
$sql = "SELECT name, rating, testimonial FROM testimonials ORDER BY id DESC";
$result = $conn->query($sql);

$testimonials = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $testimonials[] = $row;
    }
}

$conn->close();

// Output JSON
echo json_encode($testimonials);
?>
