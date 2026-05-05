<?php
require_once '../config/db.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $query = "SELECT f.*, c.category_name FROM fishes f LEFT JOIN categories c ON f.category_id = c.id";
        
        // Filter by category if requested
        if (isset($_GET['category'])) {
            $query .= " WHERE f.category_id = :cat_id";
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':cat_id', $_GET['category']);
        } else {
            $stmt = $conn->prepare($query);
        }
        
        $stmt->execute();
        $fishes = $stmt->fetchAll();
        echo json_encode(["status" => "success", "fishes" => $fishes]);
        break;

    case 'POST':
        // Check if it's an update or create based on 'id' being present in $_POST
        if (isset($_POST['id'])) {
            // Update
            $id = $_POST['id'];
            $fish_name = $_POST['fish_name'];
            $category_id = $_POST['category_id'];
            $price = $_POST['price'];
            $size = $_POST['size'];
            $stock = $_POST['stock'];
            $description = $_POST['description'];

            // Handle optional image upload
            if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
                $image_name = time() . '_' . basename($_FILES['image']['name']);
                $target = '../uploads/fish_images/' . $image_name;
                move_uploaded_file($_FILES['image']['tmp_name'], $target);
                
                $stmt = $conn->prepare("UPDATE fishes SET fish_name=:name, category_id=:cat, price=:price, image=:image, size=:size, stock=:stock, description=:desc WHERE id=:id");
                $stmt->bindParam(':image', $image_name);
            } else {
                $stmt = $conn->prepare("UPDATE fishes SET fish_name=:name, category_id=:cat, price=:price, size=:size, stock=:stock, description=:desc WHERE id=:id");
            }
            
            $stmt->bindParam(':name', $fish_name);
            $stmt->bindParam(':cat', $category_id);
            $stmt->bindParam(':price', $price);
            $stmt->bindParam(':size', $size);
            $stmt->bindParam(':stock', $stock);
            $stmt->bindParam(':desc', $description);
            $stmt->bindParam(':id', $id);
            
            if ($stmt->execute()) {
                echo json_encode(["status" => "success", "message" => "Fish updated successfully."]);
            } else {
                echo json_encode(["status" => "error", "message" => "Failed to update fish."]);
            }
        } else {
            // Create
            $fish_name = $_POST['fish_name'] ?? '';
            $category_id = $_POST['category_id'] ?? '';
            $price = $_POST['price'] ?? 0;
            $size = $_POST['size'] ?? '';
            $stock = $_POST['stock'] ?? 0;
            $description = $_POST['description'] ?? '';
            
            $image_name = '';
            if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
                $image_name = time() . '_' . basename($_FILES['image']['name']);
                $target = '../uploads/fish_images/' . $image_name;
                move_uploaded_file($_FILES['image']['tmp_name'], $target);
            }

            $stmt = $conn->prepare("INSERT INTO fishes (fish_name, category_id, price, image, size, stock, description) VALUES (:name, :cat, :price, :image, :size, :stock, :desc)");
            $stmt->bindParam(':name', $fish_name);
            $stmt->bindParam(':cat', $category_id);
            $stmt->bindParam(':price', $price);
            $stmt->bindParam(':image', $image_name);
            $stmt->bindParam(':size', $size);
            $stmt->bindParam(':stock', $stock);
            $stmt->bindParam(':desc', $description);

            if ($stmt->execute()) {
                echo json_encode(["status" => "success", "message" => "Fish added successfully."]);
            } else {
                echo json_encode(["status" => "error", "message" => "Failed to add fish."]);
            }
        }
        break;

    case 'DELETE':
        // Need to read from input stream for DELETE
        $data = json_decode(file_get_contents("php://input"));
        if (isset($data->id)) {
            $stmt = $conn->prepare("DELETE FROM fishes WHERE id = :id");
            $stmt->bindParam(':id', $data->id);
            if ($stmt->execute()) {
                echo json_encode(["status" => "success", "message" => "Fish deleted."]);
            } else {
                echo json_encode(["status" => "error", "message" => "Failed to delete fish."]);
            }
        }
        break;
}
?>
