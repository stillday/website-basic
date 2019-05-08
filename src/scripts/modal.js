/*************************************************/
/* modal       	                                 */
/*************************************************/
var closeModal = function () {
  $('.js-modal-overlay').remove();
  $('.js-modal').hide();
  $('body').removeClass('modal-open');
};

$(function () {
  $('[data-modal]').each(function () {
    // add click event on the button
    $(this).on('click', function () {
      $('body').append('<div class="modal-overlay js-modal-overlay" aria-hidden="true"></div>');

      var target = $(this).data('modal');

      // disable body scrolling
      $('body').addClass('modal-open');

      $(target).show();

      $(target).on('click', function (e) {
        if (e.target === this) {
          closeModal();
        }
      });
    });
  });

  // close the modal on close click
  $('.js-close-modal').on('click', function () {
    closeModal();
  });

  // hide the modal on ESC
  $(this).keyup(function (e) {
    if (e.keyCode === 27) {
      closeModal();
    }
  });
});
