<?php
// Check if form was submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // Check if correct password was entered
  if ($_POST['password'] !== 'ALBERTSUCKS') {
    echo "Invalid password.";
  } else {
    $images = [];
    // Check if files were uploaded without errors
    if (isset($_FILES['images']) && !empty($_FILES['images']['name'][0])) {
      foreach ($_FILES['images']['tmp_name'] as $key => $tmp_name) {
        $fileName = $_FILES['images']['name'][$key];
        $fileTmpName = $tmp_name;
        $fileExt = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
        $allowedExt = ['jpg', 'jpeg', 'png', 'gif'];
        // Check if file extension is allowed
        if (in_array($fileExt, $allowedExt)) {
          $filePath = 'uploads/' . $fileName;
          // Move the uploaded file to the uploads folder
          if (move_uploaded_file($fileTmpName, $filePath)) {
            $images[] = $filePath;
          } else {
            echo "
Unable to upload file.

";
          }
        } else {
          echo "
Only JPG, JPEG, PNG, and GIF files are allowed.

";
        }
      }
    } else {
      echo "
No files were uploaded.

";
    }
    echo json_encode($images);
  }
}
?>
