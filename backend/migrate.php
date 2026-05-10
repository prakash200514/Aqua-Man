<?php
$conn = new PDO('mysql:host=localhost;dbname=aquariyum', 'root', 'password');
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

try {
    $conn->exec('ALTER TABLE orders ADD COLUMN shipping_address TEXT NULL');
    echo "shipping_address column added\n";
} catch (Exception $e) {
    echo "shipping_address: " . $e->getMessage() . "\n";
}

try {
    $conn->exec('ALTER TABLE orders ADD COLUMN delivery_date DATE NULL');
    echo "delivery_date column added\n";
} catch (Exception $e) {
    echo "delivery_date: " . $e->getMessage() . "\n";
}

echo "Done\n";
