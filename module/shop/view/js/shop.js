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

function rangeSlider() {
    ajaxPromise('module/shop/controller/controller_shop.php?op=rangeslider','POST','JSON').then(function(datarange){
        localStorage.setItem('minrange', Number(datarange[0]['minim']));
        localStorage.setItem('maxrange', Number(datarange[0]['maxim']));
        console.log("first");
        $( "#slider-range" ).slider({
            range: true,
            min: Number(datarange[0]['minim']),
            max: Number(datarange[0]['maxim']),
            values: [ datarange[0]['minim'], datarange[0]['maxim'] ],
            slide: function( event, ui ) {
              $( "#amount" ).val(ui.values[ 0 ] + "€ - " + ui.values[ 1 ] + "€" );
              minrange=ui.values[0];
              maxrange=ui.values[1];
            }
        });
        $( "#amount" ).val($( "#slider-range" ).slider( "values", 0 ) + "€ - " + $( "#slider-range" ).slider( "values", 1 ) + "€");
        listallproducts();
    }).catch(function(textStatus){
            console.log(textStatus);
    });
}

function loadPagelist() {
    $('<div></div>').attr({'id':'sidebar'}).appendTo('#shop');
    $('<div></div>').attr({'id':'container-products'}).appendTo('#shop');
    $('<form></form>').attr({'id':'filters_form'}).appendTo('#sidebar');
    $('<div></div>').attr({'id':'filters'}).appendTo('#filters_form');
    $('<input/>').attr({'id':'amount','type':'text'}).prop("readonly", true).appendTo('#filters');
    $('<div></div>').attr({'id':'slider-range'}).appendTo('#filters');

    $('<select></select>').attr({'id':'plataforms','name':'plataforms'}).appendTo('#filters');
    $('<option></option>').attr({'value':''}).text('--Select a plataform--').appendTo('#plataforms');
    ajaxPromise('module/shop/controller/controller_shop.php?op=plataforms','GET','JSON').then(function(data){
        for (let i = 0; i < data.length; i++) {
            $('<option></option>').attr({'value':data[i]['plataforma']}).text(data[i]['plataforma']).appendTo('#plataforms');
        }
    }).catch(function(textStatus){
        console.log(textStatus);
    });
    $('<select></select>').attr({'id':'age','name':'age'}).appendTo('#filters');
    $('<option></option>').attr({'value':''}).text('--Select a age--').appendTo('#age');
    $('<option></option>').attr({'value':'3'}).text('3').appendTo('#age');
    $('<option></option>').attr({'value':'7'}).text('7').appendTo('#age');
    $('<option></option>').attr({'value':'12'}).text('12').appendTo('#age');
    $('<option></option>').attr({'value':'16'}).text('16').appendTo('#age');
    $('<option></option>').attr({'value':'18'}).text('18').appendTo('#age');
    $('<select></select>').attr({'id':'genero','name':'genero'}).appendTo('#filters');
    $('<option></option>').attr({'value':''}).text('--Select a genre--').appendTo('#genero');
    ajaxPromise('module/shop/controller/controller_shop.php?op=categories','GET','JSON').then(function(data){
        for (let i = 0; i < data.length; i++) {
            $('<option></option>').attr({'value':data[i]['category_name']}).text(data[i]['category_name']).appendTo('#genero');
        }
    }).catch(function(textStatus){
        console.log(textStatus);
    });
    $('<div></div>').attr({'id':'filters_buttons'}).appendTo('#filters_form');
    $('<button></button>').attr({'id':'applyfilters','name':'Filter','type':'button'}).text('Filter').appendTo('#filters_buttons');
    $('<button></button>').attr({'id':'clearfilters','name':'Clear','type':'button'}).text('Clear').appendTo('#filters_buttons');
    $('<div></div>').attr({'id':'pagination'}).insertAfter("#shop");
}

function listallproducts() {
    if (sessionStorage.getItem('genero')!=null) {
        localStorage.setItem('genero', sessionStorage.getItem('genero'));
        sessionStorage.removeItem('genero');
    }
    if (localStorage.getItem('plataform')===null) {
        localStorage.setItem('plataform', $("#plataforms").val());
    }
    if (localStorage.getItem('age')===null) {
        localStorage.setItem('age', $("#age").val());
    }
    if (localStorage.getItem('genero')===null) {
        localStorage.setItem('genero', $("#genero").val());
    }
    



    console.log("m"+localStorage.getItem('minrange'));
    console.log("M"+localStorage.getItem('maxrange'));
    console.log("p "+localStorage.getItem('plataform'));
    console.log("a"+localStorage.getItem('age'));
    console.log("g "+sessionStorage.getItem('genero'));

    ajaxPromise('module/shop/controller/controller_shop.php?op=listall','POST','JSON',{minrange:localStorage.getItem('minrange'),maxrange:localStorage.getItem('maxrange'),plataform:localStorage.getItem('plataform'),age:localStorage.getItem('age'),genero:localStorage.getItem('genero')}).then(function(data){
        if (data[0]['count']==0) {
            $('<p></p>').text('No products found').appendTo('#container-products');
        }else{
            for (let i = 0; i < data.length; i++) {
                $('<div></div>').attr({'id':data[i].id,'class':'card'}).appendTo('#container-products');
                $('<img></img>').attr({'src':data[i].img}).appendTo('#'+data[i].id);
                $('<div></div>').attr({'class':'infodiv'}).appendTo('#'+data[i].id);
                $('<ul></ul>').attr({'class':'infodiv'}).appendTo('#'+data[i].id+' .infodiv');
                $('<li></li>').text(data[i].nombre).appendTo('#'+data[i].id+' .infodiv ul');
                $('<li></li>').text(data[i].plataforma).appendTo('#'+data[i].id+' .infodiv ul');
                $('<li></li>').text(data[i].clasificacion).appendTo('#'+data[i].id+' .infodiv ul');
                $('<li></li>').text(data[i].estado).appendTo('#'+data[i].id+' .infodiv ul');
                $('<div></div>').attr({'class':'divbutton'}).appendTo('#'+data[i].id);
                $('<span></span>').attr({'class':'price'}).text(data[i].precio+'€').appendTo('#'+data[i].id+' .divbutton');
                $('<button></button>').attr({'id':data[i].id,'class':'showdetails'}).text('Show details').appendTo('#'+data[i].id+' .divbutton');
            }
        }
    }).catch(function(textStatus){
            console.log(textStatus);
    });
};

function filter() {
    $(document).on("click", "#applyfilters" ,function(){
        localStorage.setItem('minrange', Number($("#slider-range").slider( "values", 0 )));
        localStorage.setItem('maxrange', Number($("#slider-range").slider( "values", 1 )));
        localStorage.setItem('plataform', $("#plataforms").val());
        localStorage.setItem('age', $("#age").val());
        localStorage.setItem('genero', $("#genero").val());
        $('#container-products').empty();
        listallproducts();
    });
}

function clearfilters() {
    $(document).on("click", "#clearfilters" ,function(){
        localStorage.setItem('minrange', Number($("#slider-range").slider( "values", 0 )));
        localStorage.setItem('maxrange', Number($("#slider-range").slider( "values", 1 )));
        localStorage.setItem('plataform', $("#plataforms").val());
        localStorage.setItem('age', $("#age").val());
        localStorage.setItem('genero', $("#genero").val());
        location.reload();
    });
}

function redirectDetails() {
    $(document).on("click", ".showdetails" ,function(){
        localStorage.setItem('currentPage', 'shop-details');
        localStorage.setItem('id', this.getAttribute('id'));
        location.reload();
    });
}

function cleanDetails() {
    $(document).on("click", ".cleandetails" ,function(){
        localStorage.setItem('currentPage', 'shop');
        location.reload();
    });

    $(document).on("click", ".nav-item" ,function(){
        localStorage.removeItem('currentPage');
    });
}

function showDetails() {
    ajaxPromise('module/shop/controller/controller_shop.php?op=details&id=' + localStorage.getItem('id'), 'GET', 'JSON').then(function(data) {
        $('#shop').empty();
        $('<div></div>').attr({'id':'details'}).appendTo('#shop');
        $('<h1></h1>').text(data[0].nombre).appendTo('#details');
        $('<img></img>').attr({'src':data[0].img}).appendTo('#details');
        $('<div></div>').attr({'class':'infodivdetails'}).appendTo('#details');
        $('<ul></ul>').attr({'class':'infodivdetails'}).appendTo('#details .infodivdetails');
        $('<li></li>').text(data[0].plataforma).appendTo('#details .infodivdetails ul');
        $('<li></li>').text(data[0].clasificacion).appendTo('#details .infodivdetails ul');
        $('<li></li>').text(data[0].genero).appendTo('#details .infodivdetails ul');
        $('<button></button>').attr({'class':'cleandetails'}).text('Return').appendTo('#details');
        // $('<div><div>').attr({'class': 'top-photo'}).appendTo('.top-details');
        // $('<div></div>').attr({'class': 'container separe-menu', 'id': 'container-shop-details'}).appendTo('.content');
        
    }).catch(function() {
        window.location.href = 'index.php?page=error503'
    }); 
}

function loadContent(){
    $('#shop').empty();
    switch (localStorage.getItem('currentPage')) {
        case 'shop-details':
            showDetails();
            cleanDetails();
            break;
        // case 'home-carousel':

        //     break
        default:
            loadPagelist();
            rangeSlider();
            redirectDetails();
            cleanDetails();
            filter();
            clearfilters();
            break;
    }
}

$(document).ready(function() {
    loadContent();
});