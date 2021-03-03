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

function showMainCarousel() {
    $('#main-carousel').owlCarousel({
        loop:true,
        margin:10,
        nav:true,
        autoplay:true,
        pagination: true,
        autoplayTimeout:5000,
        smartSpeed :900,
        navigationText: [
            "<i class='fa fa-chevron-left'></i>",
            "<i class='fa fa-chevron-right'></i>"
        ],
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    })
}

function showSecundaryCarousel() {
    $('#secundary-carousel').owlCarousel({
        loop:true,
        margin:10,
        nav:true,
        autoplay:true,
        autoplayTimeout:5000,
        smartSpeed :900,
        pagination: true,
        navigationText: [
            "<i class='fa fa-chevron-left'></i>",
            "<i class='fa fa-chevron-right'></i>"
        ],
        responsive:{
            0:{
                items:3
            },
            600:{
                items:3
            },
            1000:{
                items:3
            }
        }
    })  
}

function loadMainCarousel() {
    ajaxPromise('module/home/controller/controller_home.php?op=carousel','GET','JSON').then(function(data){
        $('<div></div>').attr({'id':'main-carousel','class':'owl-carousel'}).appendTo('#home');
        for (let i = 0; i < data.length; i++) {
            $('<div></div>').attr({'id':data[i]['category_name']+"div"}).appendTo('#main-carousel');
            $('<img>').attr({'src':data[i]['img']}).appendTo('#'+data[i]['category_name']+"div");
            $('<button></button>').attr({'id':data[i]['category_name'],'class':'category'}).text(data[i]['category_name']).appendTo('#'+data[i]['category_name']+"div");
        }
        showMainCarousel();
    }).catch(function(textStatus){
            console.log(textStatus);
    });
};

function loadSecundaryCarousel() {
    ajaxPromise('module/home/controller/controller_home.php?op=plataforms','GET','JSON').then(function(data){
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            $('<div></div>').attr({'id':data[i]['plataforma'],'class':'plataform'}).appendTo('#secundary-carousel');
            $('<img>').attr({'src':data[i]['img']}).appendTo('#'+data[i]['plataforma']);
            $('<h1></h1>').text(data[i]['plataforma']).appendTo('#'+data[i]['plataforma']);
        }
        showSecundaryCarousel();
    }).catch(function(textStatus){
        console.log(textStatus);
    });
};

function categoryClick() {
    $(document).on("click", ".category" ,function(){
        id=this.getAttribute('id');
        sessionStorage.setItem('genero', id);
        console.log(sessionStorage.getItem('genero'));
        window.location.href = 'index.php?page=shop';
    });
}

function plataformClick() {
    $(document).on("click", ".plataform" ,function(){
        localStorage.setItem('plataform', this.getAttribute('id'));
    });
}

function loadHome() {
    $('<div></div>').attr({'id':'main-carousel','class':'owl-carousel'}).appendTo('#home');
    $('<div></div>').attr({'id':'secundary-carousel','class':'owl-carousel'}).appendTo('#home');

    loadMainCarousel();
    loadSecundaryCarousel();
    plataformClick();
    categoryClick();
}

$(document).ready(function() {
    loadHome();
});

// function loadCarousel() {
//     $.ajax({
//         type: 'GET',
//         dataType: 'JSON',
//         url: 'module/home/controller/controller_home.php?op=carousel',
//     }).done(function(jsondata) {
//         var content = "";
//         $('<div></div>').attr({'id':'main-carousel-boot5','class':'carousel slide','data-bs-ride':'carousel'}).appendTo('#home');
//         $('<div></div>').attr({'id':'main-carousel-inner','class':'carousel inner'}).appendTo('#main-carousel-boot5');

//         for (let i = 0; i < jsondata.length; i++) {
//             $('<div></div>').attr({'id':jsondata[i]['category_name'],'class':'carousel-item'}).appendTo('#main-carousel-inner');
//             $('<img>').attr({'class':'d-block w-100','src':jsondata[i]['img']}).appendTo('#'+jsondata[i]['category_name']);
            
//         }

        
//         $('<a></a>').attr({'id':'main-prev','class':'carousel-control-prev','role':'button','data-bs-ride':'prev'}).appendTo('#main-carousel-boot5');
//         $('<span></span>').attr({'class':'carousel-control-prev-icon','aria-hidden':'true'}).appendTo('#main-prev');
//         $('<span></span>').attr({'class':'visually-hidden'}).text("Previous").appendTo('#main-prev');

//         $('<a></a>').attr({'id':'main-next','class':'carousel-control-prev','role':'button','data-bs-ride':'next'}).appendTo('#main-carousel-boot5');
//         $('<span></span>').attr({'class':'carousel-control-next-icon','aria-hidden':'true'}).appendTo('#main-prev');
//         $('<span></span>').attr({'class':'visually-hidden'}).text("Next").appendTo('#main-prev');

//         // showCarousel();
//     }).fail(function (jqXHR, textStatus, errorThrown) {
//         console.log(textStatus);
//     });
// };