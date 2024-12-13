<?php
// procesar.php

// Iniciar la sesión
session_start();

// Incluir los archivos necesarios
include 'login.php';
include 'carrito.php';

// Comprobar si el método de la solicitud es POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Detectar si es una solicitud de login
    if (isset($_POST['username']) && isset($_POST['password'])) {
        // Manejar el login
        login($_POST['username'], $_POST['password']);
    } 
    // Detectar si es una solicitud de carrito (JSON enviado por el cliente)
    elseif (isset($_SERVER['CONTENT_TYPE']) && strpos($_SERVER['CONTENT_TYPE'], 'application/json') !== false) {
        // Leer el cuerpo de la solicitud
        $carritoData = file_get_contents('php://input');

        // Procesar el carrito usando carrito.php
        $response = procesarCarrito($carritoData);

        // Enviar la respuesta generada por carrito.php
        header('Content-Type: application/json');
        echo json_encode($response);
    } else {
        // Solicitud no válida
        http_response_code(400);
        echo json_encode(['message' => 'Solicitud no válida']);
    }
} else {
    // Método no permitido
    http_response_code(405);
    echo json_encode(['message' => 'Método no permitido']);
    exit;
}
?>
