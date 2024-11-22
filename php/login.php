<?php
// login.php

// Función para manejar el login
function login($username, $password) {
    // Ruta al archivo de usuarios
    $jsonFile = '../json/usuarios.json';

    // Verificar si el archivo de usuarios existe
    if (file_exists($jsonFile)) {
        // Cargar los usuarios desde el archivo JSON
        $usuarios = json_decode(file_get_contents($jsonFile), true);
        $usuarioValido = false;
        $token = bin2hex(random_bytes(16)); // Generar un token aleatorio

        // Recorrer los usuarios y verificar las credenciales
        foreach ($usuarios as $usuario) {
            if ($usuario['username'] === $username && $usuario['password'] === $password) {
                $usuarioValido = true;
                break;
            }
        }

        // Si el usuario es válido, devolver el token y la información de la tienda
        if ($usuarioValido) {
            // Información de la tienda
            $infoTienda = [
                'nombre' => 'Tienda LongWay',
                'direccion' => 'Calle Ficticia 123',
                'telefono' => '123456789',
                'email' => 'contacto@longway.com'
            ];

            // Devolver respuesta JSON con el token y la información de la tienda
            echo json_encode([
                'token' => $token,
                'infoTienda' => $infoTienda
            ]);
            exit;
        } else {
            // Si las credenciales son incorrectas
            http_response_code(401);  // Unauthorized
            echo json_encode(['message' => 'Credenciales inválidas']);
            exit;
        }
    } else {
        // Si el archivo de usuarios no existe
        http_response_code(500);  // Internal Server Error
        echo json_encode(['message' => 'No se pudo leer el archivo de usuarios']);
        exit;
    }
}


?>
