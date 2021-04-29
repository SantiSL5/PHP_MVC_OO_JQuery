function autoComplete() {
    $('#searchAutocomplete').fadeOut(0);
    $("#input_search").on('click keyup', function() {

        $.ajax({
            url: '/module/menu/controller/controller_menu.php?op=autoComplete',
            type: 'POST',
            data: {'nombre':$(this).val()},
            dataType: 'JSON'
        }).done(function(data) {
            $('#searchAutocomplete').empty();
            $('#searchAutocomplete').fadeIn(1000);
            for (row in data) {
                $('<div></div>').appendTo('#searchAutocomplete').html(data[row]['nombre']).attr({'class': 'searchElement', 'id': data[row]['nombre']});
            }
           
            $(document).on('click', '.searchElement', function() {
                $('#input_search').val(this.getAttribute('id'));
                $('#searchAutocomplete').fadeOut(500);
            });
            $(document).on('click scroll', function(event) {
                if (event.target.id !== 'input_search') {
                    $('#searchAutocomplete').fadeOut(500);
                }
            });
        }).fail(function() {
            $('#searchAutocomplete').fadeOut(500);
        });
    });
}

function menu_login() {
    $('<ul></ul>').attr({'class':'navbar-nav justify-content-end'}).appendTo('#account-navbar');
    token=get_token();
    if (token === null) {
        $('<li></li>').attr({'class':'nav-item'}).appendTo('#account-navbar ul');
        $('<button/>').attr({'id':'registerbtn-nav','class':'btn btn-outline-success me-2'}).text('Register').appendTo('#account-navbar ul li');
        $('<button/>').attr({'id':'loginbtn-nav','class':'btn btn-outline-success me-2'}).text('Login').appendTo('#account-navbar ul li');
    } else{
        ajaxPromise('module/login/controller/controller_login.php?op=menu_info', 'POST', 'JSON',{'token':token}).then(function(data) {
            check_validtoken(data['invalid_token'],data['token']);
            $('<a></a>').attr({'id':'username_menu','class':'nav-link'}).text(data['username']).appendTo('#account-navbar ul');
            $('<img/>').attr({'id':'avatar_menu','src':data['avatar']}).appendTo('#account-navbar ul');
            $('<button/>').attr({'id':'logoutbtn-nav','class':'btn btn-outline-success me-2'}).text('Logout').appendTo('#account-navbar ul');
            logoutbtn_navclick();
            menu_cart();
        }).catch(function(jqXHR) {
            console.log(jqXHR);
            // window.location.href = 'index.php?page=error503';
        }); 

    }
}

function menu_cart() {
    token=get_token();
    if (token != null) {
        ajaxPromise('module/cart/controller/controller_cart.php?op=menuCart', 'POST', 'JSON',{'token':token}).then(function(data) {
            check_validtoken(data['invalid_token'],data['token']);
            $('<img/>').attr({'id':'cart_menu','src':'module/menu/view/img/cart.png','style':'height: 40px; background-color:white;'}).appendTo('#account-navbar ul');
            $('<a/>').attr({'id':'cart_menu_quant','class':'nav-link'}).text(data['num_products']).appendTo('#account-navbar ul');
            cart_click();
        }).catch(function(jqXHR) {
            console.log(jqXHR);
            // window.location.href = 'index.php?page=error503';
        }); 

    }
}

function refresh_numproducts_cart() {
    token=get_token();
    if (token != null) {
        ajaxPromise('module/cart/controller/controller_cart.php?op=menuCart', 'POST', 'JSON',{'token':token}).then(function(data) {
            check_validtoken(data['invalid_token'],data['token']);
            $('#cart_menu_quant').text(data['num_products']);
        }).catch(function(jqXHR) {
            console.log(jqXHR);
            // window.location.href = 'index.php?page=error503';
        }); 

    }
}

function buttonSearch() {
    $('#button_search').on('click', function() {
        sessionStorage.setItem('search',$('#input_search').val());
        window.location.href = 'index.php?page=shop';
    });
}

function registerbtn_navclick() {
    $('#registerbtn-nav').on('click', function() {
        window.location.href = 'index.php?page=register';
    });
}

function loginbtn_navclick() {
    $('#loginbtn-nav').on('click', function() {
        window.location.href = 'index.php?page=login';
    });
}

function cart_click() {
    $('#cart_menu').on('click', function() {
        window.location.href = 'index.php?page=cart';
    });
}

$(document).ready(function() {
    buttonSearch();
    autoComplete();
    menu_login();
    registerbtn_navclick();
    loginbtn_navclick();
    cart_click();
});
