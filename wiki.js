$(document).ready(() => {

	console.log("ready!!!");


	let endpoint = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch='

	function getRequest() {

		$("#search").keypress((e) => {
			let searchTerm = $("#search").val();
			let key = e.which;

			if (key === 13) {
				$("#results").empty();
				makeRequest();
				console.log("you have pressed the Enter key")
			}

			function makeRequest() {
				// Using jQuery
				$.ajax({
					url: endpoint + searchTerm,
					dataType: 'jsonp', //notice that we're using JSONP to avoid CORS issues...
					type: 'GET',
					headers: {
						'Api-User-Agent': 'Mozilla/5.0'
					},
					success: function (data) {
						// do something with data
						console.log(data);

						let articles = data.query.pages;
						// console.log(articles);

						for (let value of Object.values(articles)) {
							$("#results").append(`<a href="#" class="list-group-item list-group-item-action flex-column align-items-start">\
							<div class="d-flex w-100 justify-content-between">\
								<h5 class="mb-1">${value.title}</h5>\
							</div>\
							<p class="mb-1">${value.extract}</p>\
						</a>`);
							// console.log(value.title);
							// console.log(value.extract);
						}
					}
				});
			}

		})
	}

	getRequest();
});