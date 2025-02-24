$(document).ready(function() {
    $('.add-to-cart').click(function() {
        var gameName = $(this).data('game-name');
        var gamePrice = $(this).data('game-price');

        $.ajax({
            url: '/add_to_cart',///add_to_cart
            method: 'POST',
            data: {
                gameName: gameName,
                gamePrice: gamePrice
            },
            success: function(response) {
                alert(response); // Show a success message or handle the response as needed
            },
            error: function(xhr, status, error) {
                console.log(xhr.responseText); // Log any error messages to the console
            }
        });
    });
});
