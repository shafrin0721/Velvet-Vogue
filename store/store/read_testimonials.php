<?php
// read_testimonials.php
include 'connection.php'; // Include your database connection

$sql = "SELECT * FROM testimonials";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo '<div class="testimonial-card">';
        echo '<h3>' . htmlspecialchars($row["name"]) . '</h3>';
        echo '<p>' . htmlspecialchars($row["testimonial"]) . '</p>';
        
        // Display stars based on rating
        echo '<p>Rating: ';
        for ($i = 1; $i <= 5; $i++) {
            if ($i <= $row["rating"]) {
                echo '★'; // Filled star
            } else {
                echo '☆'; // Empty star
            }
        }
        echo '</p>';
        
        echo '<a href="update_testimonial.php?id=' . $row["id"] . '">Edit</a>';
        echo '<form method="post" action="delete_testimonial.php" style="display:inline;">
                <input type="hidden" name="id" value="' . $row['id'] . '">
                <input type="submit" value="Delete">
              </form>';
        echo '</div>';
    }
} else {
    echo "<p>No testimonials found.</p>";
}
