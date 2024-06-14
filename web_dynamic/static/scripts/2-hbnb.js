$(function () {
  const statusUrl = 'http://0.0.0.0:5001/api/v1/status/';
  $.getJSON(statusUrl, function (resp) {
    $('DIV#api_status').toggleClass('available', resp.status === 'OK');
  });

  const checked = {};
  // any existing checked amenities
  for (const amen of $('DIV.amenities INPUT:checked')) {
    checked[amen.dataset.id] = amen.dataset.name;
  }
  $('DIV.amenities H4').text(Object.values(checked).join());

  $("DIV.amenities LI INPUT[type='checkbox']").on('change', function () {
    const id = $(this).data('id');
    const name = $(this).data('name');
    if ($(this).is(':checked')) {
      checked[id] = name;
    } else {
      delete checked[id];
    }
    $('DIV.amenities H4').text(Object.values(checked).join());
  });
});
