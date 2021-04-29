function ajaxPromise(sUrl, sType, sTData, sData = undefined) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: sUrl,
            type: sType,
            dataType: sTData,
            data: sData
        }).done((data) => {
            resolve(data);
        }).fail((jqXHR, textStatus, errorThrow) => {
            reject(errorThrow);
        }); 
    });
}

function logoutbtn_navclick(){
    $('#logoutbtn-nav').on('click', function() {
        location.reload();
        logout();
    });
}

function get_token(){
    token = localStorage.getItem('token');
    return token;
}

function check_logued(){
    token = localStorage.getItem('token');
    if (token == null) {
        window.location.href = 'index.php?page=login';
    }else{
        return true;
    }
}

function check_validtoken(check_validtoken,token){
    if (check_validtoken == true) {
        logout();
        alert("Sesión no válida, vuelva a iniciar sesión");
        location.reload();
    }else{
        localStorage.setItem('token', token);
    }
}

function logout() {
    localStorage.removeItem('token');
}


