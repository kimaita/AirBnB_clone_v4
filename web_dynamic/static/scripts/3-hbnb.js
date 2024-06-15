$(function () {
  const url = 'http://0.0.0.0:5001/api/v1/places_search/';
  $.ajax({
    url: url,
    type: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify({}),
    success: function (response) {
      for (const place of response) {
        const template = `<article>
        <div class="title_box">
          <h2>${place.name}</h2>
          <div class="price_by_night">$${place.price_by_night}</div>
        </div>
        <div class="information">
          <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
          <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
          <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
        </div>
        <div class="description">
          ${place.description}
        </div>
      </article>`;
        $('section.places').append(template);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      // Handle error here
      console.error("Error:", textStatus, errorThrown);
    }
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
