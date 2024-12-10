<?php
// procesar.php

// Iniciar la sesión (si es necesario)
session_start();

// Incluir el archivo login.php que contiene la lógica de autenticación
include 'login.php';


// Comprobar si el método de la solicitud es POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Llamar a la función que maneja el login
    login($_POST['username'], $_POST['password']);
} else {    
    http_response_code(405);
    echo json_encode(['message' => 'Método no permitido']);
    exit;
}
?>