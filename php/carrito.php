<?php
// Cargar el archivo JSON con los productos oficiales del servidor

$productos = json_decode(file_get_contents('../json/tienda.json'), true);
// Obtener el carrito enviado por el cliente
$carrito = json_decode(file_get_contents('php://input'), true);

$errores = [];
$totalValidado = 0;

// Recorrer los productos del carrito enviado por el cliente
foreach ($carrito as $item) {
    // Buscar el producto en los datos oficiales
    $productoOriginal = array_filter($productos, fn($p) => $p['id'] == $item['id']);
    
    if (count($productoOriginal) > 0) {
        $productoOriginal = array_values($productoOriginal)[0];
        
        // Validar que el precio coincida
        if ($productoOriginal['precio'] != $item['precio']) {
            $errores[] = "El precio del producto '{$productoOriginal['nombre']}' no coincide.";
        } else {
            // Calcular el total validado
            $totalValidado += $productoOriginal['precio'] * $item['cantidad'];
        }
    } else {
        $errores[] = "El producto con ID {$item['id']} no existe.";
    }
}

// Devolver la respuesta al cliente
if (count($errores) > 0) {
    echo json_encode(['status' => 'error', 'errores' => $errores]);
} else {
    echo json_encode(['status' => 'success', 'total' => $totalValidado]);
}
?>
