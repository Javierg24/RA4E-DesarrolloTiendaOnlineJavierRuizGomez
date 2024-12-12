<?php
// Cargar el archivo JSON con los productos oficiales del servidor
$productosData = file_get_contents('../json/tienda.json');
if ($productosData === false) {
    echo json_encode(['status' => 'error', 'errores' => ['No se pudo cargar el archivo de productos.']]);
    exit;
}

$productos = json_decode($productosData, true)['productos']; // Obtener el array de productos
if ($productos === null) {
    echo json_encode(['status' => 'error', 'errores' => ['Error al decodificar el archivo JSON de productos.']]);
    exit;
}

// Obtener el carrito enviado por el cliente
$carrito = json_decode(file_get_contents('php://input'), true);
if ($carrito === null) {
    echo json_encode(['status' => 'error', 'errores' => ['El carrito enviado no es válido.']]);
    exit;
}

$errores = [];
$totalValidado = 0;

// Recorrer los productos del carrito enviado por el cliente
foreach ($carrito as $item) {
    // Buscar el producto en los datos oficiales por ID
    $productoOriginal = null;
    foreach ($productos as $producto) {
        if ($producto['id'] == $item['id']) {
            $productoOriginal = $producto;
            break;
        }
    }

    if ($productoOriginal) {
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
