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


function buttonSearch() {
    $('#button_search').on('click', function() {
        sessionStorage.setItem('search',$('#input_search').val());
        window.location.href = 'index.php?page=shop';
    });
}

$(document).ready(function() {
    buttonSearch();
    // clearstorage();
    autoComplete();
});
