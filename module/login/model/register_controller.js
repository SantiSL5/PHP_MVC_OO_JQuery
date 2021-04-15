function validate_register() {
    var emailre = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
    var passwordre =/(?=.*\d.*)(?=.*[A-Z].*)(?=.*[a-z].*).{8,}/;
    validate=true;
    if ($('#user-register').val().length === 0) {
        $('#error-user-register').text('Introduce un usuario');
        validate=false;
    }else if ($('#user-register').val().length <= 3) {
        alert($('#user-register').val().length);
        $('#error-user-register').text('El usuario tiene que tener 3 o más carácteres');
        validate=false;
    }else {
        $('#error-user-register').text('');
    }

    if ($('#email-register').val().length === 0) {
        $('#error-email-register').text('Introduce un email');
        validate=false;
    }else if (!emailre.test($('#email-register').val())) {
        $('#error-email-register').text('Introduce un email válido');
        validate=false;
    }else {
        $('#error-user-register').text('');
    }

    if ($('#password-register').val().length === 0) {
        $('#error-password-register').text('Introduce una contraseña');
        validate=false;
    }else if (!passwordre.test($('#password-register').val())) {
        $('#error-password-register').text('La contraseña debe tener por lo menos 8 cáracteres,1 letra minúscula, 1 letra mayúscula y 1 número');
        validate=false;
    }else{
        $('#error-password-register').text('');
    }

    if (!($('#password-register').val()==$('#confpassword-register').val())) {
        $('#error-confpassword-register').text('Las contraseñas deben ser iguales'); 
        validate=false;
    } else {
        $('#error-confpassword-register').text(''); 
    }

    return validate;
}

function register() {
    $('#register-btn').on('click', function() {
        if (validate_register()==true) {
            ajaxPromise('module/login/controller/controller_login.php?op=register', 'POST', 'JSON',{'username':$('#user-register').val(),'email':$('#email-register').val(),'password':$('#password-register').val()}).then(function(data) {
                if (data[0] == true) {
                    alert("Registrado Correctamente");
                    window.location.href = 'index.php?page=login'
                }else if (data[0] == false) {
                    if (data['username'] == false) {
                        $('#error-user-register').text('El usuario introducido ya existe');
                    }
                    if (data['email'] == false) {
                        $('#error-email-register').text('El email introducido ya existe');
                    }
                    if (data['username'] == true) {
                        $('#error-user-register').text('');
                    }
                    if (data['email'] == true) {
                        $('#error-email-register').text('');
                    }
                }
            }).catch(function() {
                window.location.href = 'index.php?page=error503';
            }); 
        }
    });
}

function loginbtn_change() {
    $('#login-option').on('click', function() {
        window.location.href = 'index.php?page=login';
    });
}

$(document).ready(function() {
    register();
    loginbtn_change()
});