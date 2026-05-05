<?php
require_once '../config/db.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['active_only'])) {
            $stmt = $conn->prepare("SELECT * FROM background_videos WHERE is_active = 1 LIMIT 1");
            $stmt->execute();
            $video = $stmt->fetch();
            echo json_encode(["status" => "success", "video" => $video]);
        } else {
            $stmt = $conn->prepare("SELECT * FROM background_videos ORDER BY created_at DESC");
            $stmt->execute();
            $videos = $stmt->fetchAll();
            echo json_encode(["status" => "success", "videos" => $videos]);
        }
        break;

    case 'POST':
        // Handle video upload
        if (isset($_FILES['video']) && $_FILES['video']['error'] === UPLOAD_ERR_OK) {
            $video_name = $_POST['video_name'] ?? 'Untitled Video';
            $file_name = time() . '_' . basename($_FILES['video']['name']);
            $target = '../uploads/videos/' . $file_name;
            
            if (move_uploaded_file($_FILES['video']['tmp_name'], $target)) {
                $stmt = $conn->prepare("INSERT INTO background_videos (video_name, video_path) VALUES (:name, :path)");
                $stmt->bindParam(':name', $video_name);
                $stmt->bindParam(':path', $file_name);
                if ($stmt->execute()) {
                    echo json_encode(["status" => "success", "message" => "Video uploaded successfully."]);
                } else {
                    echo json_encode(["status" => "error", "message" => "Database error."]);
                }
            } else {
                echo json_encode(["status" => "error", "message" => "Failed to move uploaded file."]);
            }
        } else {
            echo json_encode(["status" => "error", "message" => "No video uploaded or upload error."]);
        }
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"));
        if (isset($data->id)) {
            // Set all to inactive first
            $conn->exec("UPDATE background_videos SET is_active = 0");
            
            // Set selected to active
            $stmt = $conn->prepare("UPDATE background_videos SET is_active = 1 WHERE id = :id");
            $stmt->bindParam(':id', $data->id);
            if ($stmt->execute()) {
                echo json_encode(["status" => "success", "message" => "Active video updated."]);
            } else {
                echo json_encode(["status" => "error", "message" => "Failed to update active video."]);
            }
        }
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"));
        if (isset($data->id)) {
            $stmt = $conn->prepare("DELETE FROM background_videos WHERE id = :id");
            $stmt->bindParam(':id', $data->id);
            if ($stmt->execute()) {
                echo json_encode(["status" => "success", "message" => "Video deleted."]);
            } else {
                echo json_encode(["status" => "error", "message" => "Failed to delete video."]);
            }
        }
        break;
}
?>
