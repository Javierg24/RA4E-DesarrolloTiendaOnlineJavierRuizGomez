<?php

// Función para cargar la información de la tienda
function obtenerInfoTienda() {
    $jsonFileTienda = '../json/tienda.json';
    if (file_exists($jsonFileTienda)) {
        return json_decode(file_get_contents($jsonFileTienda), true);
    } else {
        return null;
    }
}

// Función para manejar el login
function login($username, $password) {
    $jsonFile = '../json/usuarios.json';

    if (file_exists($jsonFile)) {
        $usuarios = json_decode(file_get_contents($jsonFile), true);
        $usuarioValido = false;
        $token = bin2hex(random_bytes(16)); // Generar un token aleatorio

        foreach ($usuarios as $usuario) {
            if ($usuario['username'] === $username && $usuario['password'] === $password) {
                $usuarioValido = true;
                break;
            }
        }

        if ($usuarioValido) {
            // Cargar información de la tienda
            $infoTienda = obtenerInfoTienda();
            if ($infoTienda) {
                echo json_encode([
                    'token' => $token,
                    'infoTienda' => $infoTienda,
                ]);
                exit;
            } else {
                http_response_code(500);
                echo json_encode(['message' => 'No se pudo cargar la información de la tienda']);
                exit;
            }
        } else {
            http_response_code(401);
            echo json_encode(['message' => 'Credenciales inválidas']);
            exit;
        }
    } else {
        http_response_code(500);
        echo json_encode(['message' => 'No se pudo leer el archivo de usuarios']);
        exit;
    }
}
?>
