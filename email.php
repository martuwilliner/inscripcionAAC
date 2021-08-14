<?php 

// send email
header("Content-Type: application/json; charset=utf-8");

$salida = [
    'success' => true,
    'msg' => 'El comentario se grabó exitosamente.'
];

echo json_encode($salida);


?>