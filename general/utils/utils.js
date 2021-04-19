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

function menu_login() {
    $('<ul></ul>').attr({'class':'navbar-nav justify-content-end'}).appendTo('#account-navbar');
    $('<li></li>').attr({'class':'nav-item'}).appendTo('#account-navbar ul');
    token=get_token();
    if (token === null) {
        $('<button/>').attr({'id':'registerbtn-nav','class':'btn btn-outline-success me-2'}).text('Register').appendTo('#account-navbar ul li');
        $('<button/>').attr({'id':'loginbtn-nav','class':'btn btn-outline-success me-2'}).text('Login').appendTo('#account-navbar ul li');
    } else{
        ajaxPromise('module/login/controller/controller_login.php?op=menu_info', 'POST', 'JSON',{'token':token}).then(function(data) {
            check_validtoken(data['invalid_token'],data['token']);
            $('<a></a>').attr({'id':'username_menu','class':'nav-link'}).text(data['username']).appendTo('#account-navbar ul');
            $('<img/>').attr({'id':'avatar_menu','src':data['avatar']}).appendTo('#account-navbar ul');
            $('<button/>').attr({'id':'logoutbtn-nav','class':'btn btn-outline-success me-2'}).text('Logout').appendTo('#account-navbar ul');
            logoutbtn_navclick();
        }).catch(function(jqXHR) {
            console.log(jqXHR);
            // window.location.href = 'index.php?page=error503';
        }); 

    }
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

$(document).ready(function() {
    menu_login();
});

