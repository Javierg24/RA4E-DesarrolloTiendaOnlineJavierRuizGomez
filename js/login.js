async function login(event) {
    event.preventDefault();  // Evitar el envío del formulario por defecto

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    let esvalido = true;

    // Validación de los datos antes de enviarlos
    if (!username || !password) {
        alert('Por favor, completa ambos campos (usuario y contraseña).');
        esvalido = false;
        return;
    }

    if (username.length < 3) {
        alert('El nombre de usuario debe tener al menos 3 caracteres.');
        esvalido = false;
        return; 
    }

    if (password.length < 3) {
        alert('La contraseña debe tener al menos 3 caracteres.');
        esvalido = false;
        return;
    }    
    
    if (esvalido) {
        // Si las validaciones pasan, enviar las credenciales al servidor
        try {
            const response = await fetch('../php/procesar.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({ username, password })
            });

            if (response.ok) {
                // Si la autenticación es exitosa
                const data = await response.json();

                // Guardar el token y la información de la tienda en localStorage
                localStorage.setItem('token', data.token);
                localStorage.setItem('infoTienda', JSON.stringify(data.infoTienda));

                // Redirigir al dashboard
                window.location.href = 'dashboard.html';
            } else {
                // Si la autenticación falla
                const errorData = await response.json();
                alert(errorData.message || 'Error en la autenticación');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            alert('Hubo un problema con la conexión al servidor.');
        }
    }
}
