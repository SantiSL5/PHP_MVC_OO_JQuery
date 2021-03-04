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

function set_api() {
    var language = localStorage.getItem("lang");
    $("<div></div>").attr({ "id": "map" }).appendTo("#details");
    var script = document.createElement('script');
    script.src = "https://maps.googleapis.com/maps/api/js?key=" + API_KEY_GMAPS + "&language=" + language + "&callback=initMap";
    script.async;
    script.defer;
    document.getElementsByTagName('script')[0].parentNode.appendChild(script);
}

function rangeSlider() {
    ajaxPromise('module/shop/controller/controller_shop.php?op=rangeslider','POST','JSON').then(function(datarange){
        localStorage.setItem('minrange', Number(datarange[0]['minim']));
        localStorage.setItem('maxrange', Number(datarange[0]['maxim']));
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
        listallproducts(1);
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

function printProducts(numberofpages,limit,offset,data) {
    $('#container-products').empty();
    console.log(data);
    if (data.length==1) {
        $('<p></p>').text('No products found').appendTo('#container-products');
    }else{
        if (((offset-1)*limit)+4>data.length) {
            for (let i = ((offset-1)*limit)+1; i <= data.length-1; i++) {
                $('<div></div>').attr({'id':data[i].id,'class':'card'}).appendTo('#container-products');
                $('<img></img>').attr({'src':data[i].img}).appendTo('#'+data[i].id);
                $('<div></div>').attr({'class':'infodiv'}).appendTo('#'+data[i].id);
                $('<ul></ul>').attr({'class':'infodiv'}).appendTo('#'+data[i].id+' .infodiv');
                $('<li></li>').text(data[i].nombre).appendTo('#'+data[i].id+' .infodiv ul');
                $('<li></li>').text(data[i].plataforma).appendTo('#'+data[i].id+' .infodiv ul');
                $('<li></li>').text(data[i].clasificacion).appendTo('#'+data[i].id+' .infodiv ul');
                $('<li></li>').text(data[i].estado).appendTo('#'+data[i].id+' .infodiv ul');
                $('<div></div>').attr({'class':'divbutton'}).appendTo('#'+data[i].id);
                $('<span></span>').attr({'class':'views'}).text(data[i].views).appendTo('#'+data[i].id+' .divbutton');
                $('<img></img>').attr({'src':'/module/shop/view/img/eye.png','class':'eye'}).appendTo('#'+data[i].id+' .divbutton');
                $('<span></span>').attr({'class':'price'}).text(data[i].precio+'€').appendTo('#'+data[i].id+' .divbutton');
                $('<button></button>').attr({'id':data[i].id,'class':'showdetails'}).text('Show details').appendTo('#'+data[i].id+' .divbutton');
            }
        }else{
            for (let i = ((offset-1)*limit)+1; i <= (offset-1)*limit+limit; i++) {
                $('<div></div>').attr({'id':data[i].id,'class':'card'}).appendTo('#container-products');
                $('<img></img>').attr({'src':data[i].img}).appendTo('#'+data[i].id);
                $('<div></div>').attr({'class':'infodiv'}).appendTo('#'+data[i].id);
                $('<ul></ul>').attr({'class':'infodiv'}).appendTo('#'+data[i].id+' .infodiv');
                $('<li></li>').text(data[i].nombre).appendTo('#'+data[i].id+' .infodiv ul');
                $('<li></li>').text(data[i].plataforma).appendTo('#'+data[i].id+' .infodiv ul');
                $('<li></li>').text(data[i].clasificacion).appendTo('#'+data[i].id+' .infodiv ul');
                $('<li></li>').text(data[i].estado).appendTo('#'+data[i].id+' .infodiv ul');
                $('<div></div>').attr({'class':'divbutton'}).appendTo('#'+data[i].id);
                $('<span></span>').attr({'class':'views'}).text(data[i].views).appendTo('#'+data[i].id+' .divbutton');
                $('<img></img>').attr({'src':'/module/shop/view/img/eye.png','class':'eye'}).appendTo('#'+data[i].id+' .divbutton');
                $('<span></span>').attr({'class':'price'}).text(data[i].precio+'€').appendTo('#'+data[i].id+' .divbutton');
                $('<button></button>').attr({'id':data[i].id,'class':'showdetails'}).text('Show details').appendTo('#'+data[i].id+' .divbutton');
            }
        } 
    }
}

function loadPagination(numberofpages,limit,offset,data) {
    $('#pagination').empty();
    if (offset==1) {
        $("<button></button>").attr({ "id": "pag-back"}).text('<').prop("disabled",true).appendTo("#pagination");
    }else {
        $("<button></button>").attr({ "id": "pag-back"}).text('<').appendTo("#pagination");
    }
    
    $("<button></button>").attr({ "class": "actual-page", "data": offset }).text(offset).appendTo("#pagination");
    if (offset+3>numberofpages) {
        for (let i = 1; i <= numberofpages-offset; i++) {
            $("<button></button>").attr({ "class": "page", "data": offset+i }).text(offset+i).appendTo("#pagination");
        }
    }else if (offset+3<=numberofpages) {
        for (let i = 1; i <= 3; i++) {
            $("<button></button>").attr({ "class": "page", "data": offset+i }).text(offset+i).appendTo("#pagination");
        }
    }
    if (offset==numberofpages) {
        $("<button></button>").attr({ "id": "pag-next"}).text('>').prop("disabled",true).appendTo("#pagination");
    }else {
        $("<button></button>").attr({ "id": "pag-next"}).text('>').appendTo("#pagination");
    }

    $(document).on("click", "#pag-back" ,function(){
        if (offset!=1) {
            offset--;
            $('#container-products').empty();
            listallproducts(offset);
        }
    });

    $(document).on("click", "#pag-next" ,function(){
        if (offset!=numberofpages) {
            offset++;
            $('#container-products').empty();
            listallproducts(offset);
        }
    });

    $(document).on("click", ".page" ,function(){
        if (offset!=numberofpages) {
            $('#container-products').empty();
            listallproducts(Number(this.getAttribute("data")));
        }
    });

    printProducts(numberofpages,limit,offset,data);
}

function listallproducts(offset) {

    if (sessionStorage.getItem('search')!=null) {
        localStorage.setItem('search', sessionStorage.getItem('search'));
        sessionStorage.removeItem('search');
    }
    if (sessionStorage.getItem('genero')!=null) {
        localStorage.setItem('genero', sessionStorage.getItem('genero'));
        sessionStorage.removeItem('genero');
    }
    if (sessionStorage.getItem('plataform')!=null) {
        localStorage.setItem('plataform', sessionStorage.getItem('plataform'));
        sessionStorage.removeItem('plataform');
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
    console.log("s"+sessionStorage.getItem('search'));
    console.log("h"+localStorage.getItem('search'));

    // console.log("m"+localStorage.getItem('minrange'));
    // console.log("M"+localStorage.getItem('maxrange'));
    // console.log("p "+localStorage.getItem('plataform'));
    // console.log("a"+localStorage.getItem('age'));
    // console.log("g "+sessionStorage.getItem('genero'));

    ajaxPromise('module/shop/controller/controller_shop.php?op=listall','POST','JSON',{minrange:localStorage.getItem('minrange'),maxrange:localStorage.getItem('maxrange'),plataform:localStorage.getItem('plataform'),age:localStorage.getItem('age'),genero:localStorage.getItem('genero'),search:localStorage.getItem('search')}).then(function(data){
        numberofpages=Math.ceil((data.length-1) / 4);
        limit=4;
        loadPagination(numberofpages,limit,offset,data);
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
        listallproducts(1);
    });
}

function clearfilters() {
    $(document).on("click", "#clearfilters" ,function(){
        localStorage.setItem('minrange', Number($("#slider-range").slider( "values", 0 )));
        localStorage.setItem('maxrange', Number($("#slider-range").slider( "values", 1 )));
        localStorage.setItem('plataform', $("#plataforms").val());
        localStorage.setItem('age', $("#age").val());
        localStorage.setItem('genero', $("#genero").val());
        localStorage.removeItem('search');
        location.reload();
    });
}

function redirectDetails() {
    $(document).on("click", ".showdetails" ,function(){
        sessionStorage.setItem('currentPage', 'shop-details');
        sessionStorage.setItem('id', this.getAttribute('id'));
        location.reload();
    });
}

function cleanDetails() {
    $(document).on("click", ".cleandetails" ,function(){
        sessionStorage.setItem('currentPage', 'shop');
        location.reload();
    });

    $(document).on("click", ".nav-item" ,function(){
        sessionStorage.removeItem('currentPage');
    });
}



function initMap() {
    const shop = { lat: 38.821989, lng: -0.608746 };
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 18,
      center: shop,
    });
    const marker = new google.maps.Marker({
      position: shop,
      map: map,
    });
  }

 

function showDetails() {
    ajaxPromise('module/shop/controller/controller_shop.php?op=details&id=' + sessionStorage.getItem('id'), 'GET', 'JSON').then(function(data) {
        $('#shop').empty();
        $('<div></div>').attr({'id':'details'}).appendTo('#shop');
        $('<h1></h1>').text(data[0].nombre).appendTo('#details');
        $('<img></img>').attr({'src':data[0].img}).appendTo('#details');
        $('<div></div>').attr({'class':'infodivdetails'}).appendTo('#details');
        $('<ul></ul>').attr({'class':'infodivdetails'}).appendTo('#details .infodivdetails');
        $('<h2></h2>').text('State: '+data[0].estado).appendTo('#details .infodivdetails ul');
        $('<h2></h2>').text('Company: '+data[0].companyia).appendTo('#details .infodivdetails ul');
        $('<h2></h2>').text('Plataforma: '+data[0].plataforma).appendTo('#details .infodivdetails ul');
        $('<h2></h2>').text('Clasification: '+data[0].clasificacion).appendTo('#details .infodivdetails ul');
        $('<h2></h2>').text('Clasification: '+data[0].precio).appendTo('#details .infodivdetails ul');
        $('<span></span>').attr({'id':'spanviews'}).appendTo('#details .infodivdetails ul');
        $('<h2></h2>').attr({'class':'views'}).text(data[0].views).appendTo('#spanviews');
        $('<img></img>').attr({'src':'/module/shop/view/img/eye.png','class':'eye'}).appendTo('#spanviews');
        $('<h2></h2>').attr({'class':'price'}).text(data[0].precio+'€').appendTo('#details .infodivdetails ul');
        set_api();
        $('<button></button>').attr({'class':'cleandetails'}).text('Return').appendTo('#details');
        // $('<div><div>').attr({'class': 'top-photo'}).appendTo('.top-details');
        // $('<div></div>').attr({'class': 'container separe-menu', 'id': 'container-shop-details'}).appendTo('.content');
        
    }).catch(function() {
        window.location.href = 'index.php?page=error503'
    }); 
}

function loadContent(){
    $('#shop').empty();
    switch (sessionStorage.getItem('currentPage')) {
        case 'shop-details':
            showDetails();
            cleanDetails();
            break;
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