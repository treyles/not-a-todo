$(function() {
  // DELETE request
  $('.delete-btn').click(e => {
    const id = $(e.target).attr('data-id');
    $.ajax({
      url: `/todos/${id}`,
      type: 'DELETE',
      success: () => {
        window.location.href = '/';
      },
      error: error => {
        console.log(error);
      }
    });
  });

  // PUT request
  $('.completed-btn').click(e => {
    $target = $(e.target);
    const id = $target.attr('data-id');
    $.ajax({
      url: `/todos/update/${id}`,
      type: 'PUT',
      success: () => {
        window.location.href = '/';
      },
      error: error => {
        console.log(error);
      }
    });
  });

  $('header h5').html(
    moment()
      .format('MMM D')
      .toUpperCase()
  );
  $('header h1').html(moment().format('dddd'));
});
