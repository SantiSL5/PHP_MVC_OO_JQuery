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
        for (let i = 0; i < data.length; i++) {
            $('<div></div>').attr({'id':data[i]['plataforma']+"div",'class':'plataformdiv'}).appendTo('#secundary-carousel');
            $('<img>').attr({'src':data[i]['img']}).appendTo('#'+data[i]['plataforma']+"div");
            $('<h1></h1>').text(data[i]['plataforma']).appendTo('#'+data[i]['plataforma']+"div");
            $('<button></button>').attr({'id':data[i]['plataforma'],'class':'plataform'}).text(data[i]['plataforma']).appendTo('#'+data[i]['plataforma']+"div");
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
        // console.log(sessionStorage.getItem('genero'));
        window.location.href = 'index.php?page=shop';
    });
}

function plataformClick() {
    $(document).on("click", ".plataform" ,function(){
        id=this.getAttribute('id');
        sessionStorage.setItem('plataform', id);
        // console.log(sessionStorage.getItem('plataform'));
        window.location.href = 'index.php?page=shop';
    });
}

function show_related(limit) {
    limit = limit + 3;

    $.ajax({
        type: "GET",
        url: "https://www.googleapis.com/books/v1/volumes",
        data: { "q": "games" },
        dataType: "JSON"
    }).done(function(response) {
        var item;
        var more = true;
        if (limit >= response.items.length) {
            limit = response.items.length;
            more = true;
        }
        for (row = 0; row < limit; row++) {
            item = response.items[row];
            if (item !== null) {
                $("<div></div>").attr({ "id": item.id, "class": "prod_content" }).appendTo("#relateddiv")
                    .html('<div class="img-prod"><img src="' + item.volumeInfo.imageLinks.thumbnail + '" alt="Generic placeholder image"></div>' +
                        '<h4>' + item.volumeInfo.title + '</h4>' +
                        '<p><a class="btn btn-default" href="' + item.volumeInfo.previewLink + '" role="button" target="_blank">Ver &raquo;</a></p>');
            }
        }

        if (more) {
            showMore(limit);
        }


    }).fail(function(response) {
        console.log(response);
    });
}

function showMore(limit) {
    $("#show_more").on("click", function() {
        $('.loader_bg').fadeToggle();
        show_related(limit);
        setTimeout(function() {
            $('.loader_bg').fadeToggle();
        }, 1000);
    });
}

function loadHome() {
    $('<div></div>').attr({'id':'main-carousel','class':'owl-carousel'}).appendTo('#home');
    $('<div></div>').attr({'id':'plataformtextdiv'}).appendTo('#home');
    $('<h1></h1>').text('Plataforms').appendTo('#plataformtextdiv');
    $('<div></div>').attr({'id':'secundary-carousel','class':'owl-carousel'}).appendTo('#home');
    $('<div></div>').attr({'id':'relatedtextdiv'}).appendTo('#home');
    $('<h1></h1>').text('Related products').appendTo('#relatedtextdiv');
    $('<div></div>').attr({'id':'relateddiv'}).appendTo('#home');
    $('<div></div>').attr({'id':'buttonshowmorediv'}).appendTo('#home');
    $("<button>Show more...</button>").attr({ "id": "show_more" }).text('Show more...').appendTo("#buttonshowmorediv");

    loadMainCarousel();
    loadSecundaryCarousel();
    plataformClick();
    categoryClick();
    show_related(3);
}

$(document).ready(function() {
    loadHome();
});
