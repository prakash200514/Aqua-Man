<?php
require_once '../config/db.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $stmt = $conn->prepare("SELECT * FROM categories ORDER BY category_name ASC");
        $stmt->execute();
        $categories = $stmt->fetchAll();
        echo json_encode(["status" => "success", "categories" => $categories]);
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        if (isset($data->category_name)) {
            $stmt = $conn->prepare("INSERT INTO categories (category_name) VALUES (:category_name)");
            $stmt->bindParam(':category_name', $data->category_name);
            if ($stmt->execute()) {
                echo json_encode(["status" => "success", "message" => "Category added."]);
            } else {
                echo json_encode(["status" => "error", "message" => "Failed to add category."]);
            }
        }
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"));
        if (isset($data->id)) {
            $stmt = $conn->prepare("DELETE FROM categories WHERE id = :id");
            $stmt->bindParam(':id', $data->id);
            if ($stmt->execute()) {
                echo json_encode(["status" => "success", "message" => "Category deleted."]);
            } else {
                echo json_encode(["status" => "error", "message" => "Failed to delete category."]);
            }
        }
        break;
}
?>
