function login() {
    $('#login-btn').on('click', function() {
        ajaxPromise('module/login/controller/controller_login.php?op=login', 'POST', 'JSON',{'username_login':$('#user-login').val(),'password_login':$('#password-login').val()}).then(function(data) {
            
            if (data['username_created'] == true && data['correct_password'] == true) {
                alert("Logueado Correctamente");
                localStorage.removeItem('token');
                localStorage.setItem('token', data['token']);
                window.location.href = 'index.php?page=homepage';
            }else {
                if (data['username_created'] == false) {
                    $('#error-user-login').text('El usuario introducido no se encuentra registrado');

                    if (data['correct_password'] == false) {
                        $('#error-password-login').text('La contraseña introducida no es correcta');
                    }
                }
            }
        }).catch(function() {
            window.location.href = 'index.php?page=error503';
        }); 
    });
}

function registerbtn_change() {
    $('#register-option').on('click', function() {
        window.location.href = 'index.php?page=register';
    });
}


$(document).ready(function() {
    login();
    registerbtn_change();
});