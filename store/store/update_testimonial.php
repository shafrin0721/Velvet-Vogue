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

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'];
    $name = $_POST['name'];
    $rating = $_POST['rating'];
    $testimonial = $_POST['testimonial'];

    if (empty($id) || empty($name) || empty($testimonial) || !is_numeric($rating)) {
        echo json_encode(['error' => 'Invalid input data.']);
        exit;
    }

    $stmt = $conn->prepare("UPDATE testimonials SET name = ?, rating = ?, testimonial = ? WHERE id = ?");
    $stmt->bind_param("sisi", $name, $rating, $testimonial, $id);
    $stmt->execute();

    echo json_encode(['message' => 'Testimonial updated successfully!']);
}


$conn->close();
?>
