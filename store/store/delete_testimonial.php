<?php

$servername = "localhost";
$username = "root";
$password = "";
$db_name = "velvetvogue";


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    parse_str(file_get_contents("php://input"), $_DELETE);
    $id = $_DELETE['id'];

    $stmt = $conn->prepare("DELETE FROM testimonials WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();

    echo json_encode(['message' => 'Testimonial deleted successfully!']);
}

$conn->close();
?>