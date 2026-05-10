<?php
require_once '../config/db.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['user_id'])) {
            $user_id = $_GET['user_id'];
            $stmt = $conn->prepare("SELECT * FROM orders WHERE user_id = :user_id ORDER BY created_at DESC");
            $stmt->bindParam(':user_id', $user_id);
        } else {
            // Admin getting all orders
            $stmt = $conn->prepare("SELECT o.*, u.name as user_name, u.email FROM orders o JOIN users u ON o.user_id = u.id ORDER BY o.created_at DESC");
        }
        $stmt->execute();
        $orders = $stmt->fetchAll();

        // Fetch order items for each order
        foreach ($orders as &$order) {
            $item_stmt = $conn->prepare("SELECT oi.*, f.fish_name, f.image FROM order_items oi JOIN fishes f ON oi.fish_id = f.id WHERE oi.order_id = :o_id");
            $item_stmt->bindParam(':o_id', $order['id']);
            $item_stmt->execute();
            $order['items'] = $item_stmt->fetchAll();
        }

        echo json_encode(["status" => "success", "orders" => $orders]);
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        if (isset($data->user_id) && isset($data->total_amount)) {
            $conn->beginTransaction();
            try {
                // Calculate purchase and delivery dates
                $purchase_date = date('Y-m-d H:i:s');
                $delivery_date = date('Y-m-d', strtotime('+5 days'));

                // Insert order with shipping address
                $shipping = isset($data->shipping_address) ? $data->shipping_address : '';
                $stmt = $conn->prepare(
                    "INSERT INTO orders (user_id, total_amount, shipping_address, delivery_date, created_at)
                     VALUES (:u_id, :total, :shipping, :delivery, :created)"
                );
                $stmt->bindParam(':u_id',      $data->user_id);
                $stmt->bindParam(':total',     $data->total_amount);
                $stmt->bindParam(':shipping',  $shipping);
                $stmt->bindParam(':delivery',  $delivery_date);
                $stmt->bindParam(':created',   $purchase_date);
                $stmt->execute();
                $order_id = $conn->lastInsertId();

                // Get cart items and insert into order_items
                $cart_stmt = $conn->prepare(
                    "SELECT c.fish_id, c.quantity, f.price, f.fish_name, f.image
                     FROM cart c JOIN fishes f ON c.fish_id = f.id
                     WHERE c.user_id = :u_id"
                );
                $cart_stmt->bindParam(':u_id', $data->user_id);
                $cart_stmt->execute();
                $items = $cart_stmt->fetchAll();

                $item_insert = $conn->prepare(
                    "INSERT INTO order_items (order_id, fish_id, quantity, price)
                     VALUES (:o_id, :f_id, :qty, :price)"
                );
                foreach ($items as $item) {
                    $item_insert->execute([
                        ':o_id'  => $order_id,
                        ':f_id'  => $item['fish_id'],
                        ':qty'   => $item['quantity'],
                        ':price' => $item['price']
                    ]);
                }

                // Clear cart
                $clear_cart = $conn->prepare("DELETE FROM cart WHERE user_id = :u_id");
                $clear_cart->bindParam(':u_id', $data->user_id);
                $clear_cart->execute();

                $conn->commit();

                // Return full receipt data
                echo json_encode([
                    "status"        => "success",
                    "message"       => "Order placed successfully.",
                    "order_id"      => $order_id,
                    "purchase_date" => $purchase_date,
                    "delivery_date" => $delivery_date,
                    "total_amount"  => $data->total_amount,
                    "shipping_address" => $shipping,
                    "items"         => $items
                ]);
            } catch (Exception $e) {
                $conn->rollBack();
                echo json_encode(["status" => "error", "message" => "Failed to place order: " . $e->getMessage()]);
            }
        }
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"));
        if (isset($data->order_id) && isset($data->status)) {
            $stmt = $conn->prepare("UPDATE orders SET status = :status WHERE id = :id");
            $stmt->bindParam(':status', $data->status);
            $stmt->bindParam(':id',     $data->order_id);
            if ($stmt->execute()) {
                echo json_encode(["status" => "success", "message" => "Order status updated."]);
            } else {
                echo json_encode(["status" => "error", "message" => "Failed to update status."]);
            }
        }
        break;
}
?>
