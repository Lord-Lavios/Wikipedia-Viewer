var basicUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=';
var search = $('input').val();
var searchBefore = '';
var limit = $('#how :selected').text();
var beforeLimit = 10;
var url;

$(document).ready(function() {
	setInterval(renew, 500);
	function renew() {
		search = $('input').val();
		limit = $('#how :selected').text();
		url = basicUrl + search + '&limit=' + limit; 
		if(search !== searchBefore && search !== undefined && search !== '' || limit !== beforeLimit && search !== '' && search !== undefined) {
			searchBefore = search;
			beforeLimit = limit;
			$.ajax({
				url: url,
				dataType: 'jsonp',
				success: function (data) {
					$('ul').children().remove();
					for(var i =0;i<limit;i++) {
						$('ul').append(
							'<li>' 
							+ '<a href=' + data[3][i] + ' target="_blank">'
							+ '<h3>' + data[1][i] + '</h3>'
							+ '<p>' + data[2][i] + '</p>'
							+ '</a>' + '</li>').hide().fadeIn(900);
					}
				}
			});
		}
	}
});