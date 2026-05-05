<?php
require_once '../config/db.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['user_id'])) {
            $user_id = $_GET['user_id'];
            $stmt = $conn->prepare("SELECT c.id as cart_id, c.quantity, f.* FROM cart c JOIN fishes f ON c.fish_id = f.id WHERE c.user_id = :user_id");
            $stmt->bindParam(':user_id', $user_id);
            $stmt->execute();
            $cart_items = $stmt->fetchAll();
            echo json_encode(["status" => "success", "cart" => $cart_items]);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        if (isset($data->user_id) && isset($data->fish_id)) {
            // Check if already in cart
            $stmt = $conn->prepare("SELECT id, quantity FROM cart WHERE user_id = :u_id AND fish_id = :f_id");
            $stmt->bindParam(':u_id', $data->user_id);
            $stmt->bindParam(':f_id', $data->fish_id);
            $stmt->execute();
            
            if ($stmt->rowCount() > 0) {
                // Update quantity
                $row = $stmt->fetch();
                $new_qty = $row['quantity'] + ($data->quantity ?? 1);
                $update = $conn->prepare("UPDATE cart SET quantity = :qty WHERE id = :id");
                $update->bindParam(':qty', $new_qty);
                $update->bindParam(':id', $row['id']);
                $update->execute();
            } else {
                // Insert new
                $qty = $data->quantity ?? 1;
                $insert = $conn->prepare("INSERT INTO cart (user_id, fish_id, quantity) VALUES (:u_id, :f_id, :qty)");
                $insert->bindParam(':u_id', $data->user_id);
                $insert->bindParam(':f_id', $data->fish_id);
                $insert->bindParam(':qty', $qty);
                $insert->execute();
            }
            echo json_encode(["status" => "success", "message" => "Added to cart."]);
        }
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"));
        if (isset($data->cart_id) && isset($data->quantity)) {
            $stmt = $conn->prepare("UPDATE cart SET quantity = :qty WHERE id = :id");
            $stmt->bindParam(':qty', $data->quantity);
            $stmt->bindParam(':id', $data->cart_id);
            if ($stmt->execute()) {
                echo json_encode(["status" => "success", "message" => "Cart updated."]);
            }
        }
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"));
        if (isset($data->cart_id)) {
            $stmt = $conn->prepare("DELETE FROM cart WHERE id = :id");
            $stmt->bindParam(':id', $data->cart_id);
            if ($stmt->execute()) {
                echo json_encode(["status" => "success", "message" => "Item removed."]);
            }
        }
        break;
}
?>
