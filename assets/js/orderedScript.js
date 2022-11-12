
const storageArray = JSON.parse(localStorage.getItem("orderList"));

if (storageArray) {
    let totalPrice = 0;
    for (item of storageArray) {
        const liEl = $('<li>').addClass('title is-6 my-3').text(`${item.name} (${item.units}) -- $${item.price}`);

        $('#finishedOrderList').append(liEl);

        totalPrice += item.price;
    }
    $('#totalPrice').text(`$${totalPrice}`);
} else {
    $('#orderConfirmation').empty();

    const msgEl = $('<p>').text('No order!');
    const backLink = $('<a>').attr('href', '../../index.html').text('Back to Menu');

    $('#orderConfirmation').append(msgEl, backLink);
}

$('button').on('click', function(event) {
    localStorage.clear();
    window.location.href = '../../index.html';
});

// $(window).on('beforeunload', function(event) {
//     localStorage.clear();
//     window.location.href = '../../index.html';
// });