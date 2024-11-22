async function login(event) {
    event.preventDefault();  // Evitar el envío del formulario por defecto

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    let esvalido = true;

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

    }
    
    
}