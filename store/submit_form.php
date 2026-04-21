<?php
// Start output buffering
ob_start();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Sanitize input
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $message = htmlspecialchars(trim($_POST['message']));

    // Optional: Save to file (simulated storage)
    $log = "Name: $name\nEmail: $email\nMessage: $message\n---\n";
    file_put_contents("messages.txt", $log, FILE_APPEND);

    // Redirect back with a success message
    header("Location: contact.html?success=1");
    exit();
} else {
    // Redirect if accessed directly
    header("Location: contact.html");
    exit();
}
?>
