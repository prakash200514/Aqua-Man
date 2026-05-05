<?php
require_once '../config/db.php';

$data = json_decode(file_get_contents("php://input"));

if (isset($data->name) && isset($data->email) && isset($data->password)) {
    $name = $data->name;
    $email = $data->email;
    $password = password_hash($data->password, PASSWORD_DEFAULT);
    
    try {
        $stmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (:name, :email, :password)");
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $password);
        
        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Registration successful!"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to register user."]);
        }
    } catch (PDOException $e) {
        if ($e->errorInfo[1] == 1062) {
            echo json_encode(["status" => "error", "message" => "Email already exists."]);
        } else {
            echo json_encode(["status" => "error", "message" => $e->getMessage()]);
        }
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid input."]);
}
?>
