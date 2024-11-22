<?php

session_start();

$jsonFile = '../json/usuarios.json';

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['username']) && isset($_POST['password'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];    
    
    if (file_exists($jsonFile)) {
        $usuarios = json_decode(file_get_contents($jsonFile), true);
        $usuarioValido = false;

        foreach ($usuarios as $usuario) {
            if ($usuario['username'] === $username && $usuario['password'] === $password) {
                $usuarioValido = true;
                $token = bin2hex(random_bytes(16));
                break;
            }
        }

        if ($usuarioValido) {                    
            $_SESSION['usuario'] = $username;
            header("Location: ../html/dashboard.html");
            exit;
        } else {
            die("Credenciales inválidas");                        
        }
    }
}

