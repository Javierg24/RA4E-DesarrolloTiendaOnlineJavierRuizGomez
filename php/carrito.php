<?php
function procesarCarrito($carritoData) {
    // Decodificar los datos del carrito
    $carrito = json_decode($carritoData, true);

    if ($carrito === null) {
        return ['status' => 'error', 'errores' => ['El carrito enviado no es válido.']];
    }

    // Cargar los productos oficiales del servidor
    $productosData = file_get_contents('../json/tienda.json');
    if ($productosData === false) {
        return ['status' => 'error', 'errores' => ['No se pudo cargar el archivo de productos.']];
    }

    $productos = json_decode($productosData, true)['productos'];
    if ($productos === null) {
        return ['status' => 'error', 'errores' => ['Error al decodificar el archivo JSON de productos.']];
    }

    $errores = [];
    $totalValidado = 0;

    // Validar el carrito
    foreach ($carrito as $item) {
        $productoOriginal = null;
        foreach ($productos as $producto) {
            if ($producto['id'] == $item['id']) {
                $productoOriginal = $producto;
                break;
            }
        }

        if ($productoOriginal) {
            if ($productoOriginal['precio'] != $item['precio']) {
                $errores[] = "El precio del producto '{$productoOriginal['nombre']}' no coincide.";
            } else {
                $totalValidado += $productoOriginal['precio'] * $item['cantidad'];
            }
        } else {
            $errores[] = "El producto con ID {$item['id']} no existe.";
        }
    }

    if (count($errores) > 0) {
        return ['status' => 'error', 'errores' => $errores];
    } else {
        return ['status' => 'success', 'total' => $totalValidado];
    }
}
?>
