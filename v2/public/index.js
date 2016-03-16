$(document).ready(function(){
    // $(document.body).on('click', '.dropdown li a', function (e) {
    //     var label = $(this).text();
    //     var newClass;
    //     $(this).parents('.dropdown').find('.dropdown-toggle').html(label+'<span class="caret"></span>');
    //     if(label == "For") {
    //         newClass='btn-info';
    //     }
    //     if(label == "Against") {
    //         newClass='btn-danger';
    //     }
    //     $(this).parents('.dropdown').find('.dropdown-toggle').addClass(newClass);
    //
    // });

    // $('#forButton').on('click', function (e) {
        // $('#forButton').toggleClass('inactive');
        // $('#againstButton').removeClass('active');
        // $('#againstButton').addClass('inactive');
        // $('#forButton').addClass('active');
    // });

    $('#showForm').on('click', function (e) {
        $('#argumentForm').toggle();
        $('#showForm').toggle();
    });
    $('submitArgument').on('click', function(e) {
        $('argumentForm').toggle();
        $('showForm').toggle();
    })
});
