$(document).ready(function () {
	$.ajax({
		url: "http://rekrutacja.zespol.info.pl",
		dataType: "json",
		statusCode: {
			404: function () {
				alert("Strony nie znaleziono");
			}
		},
		error: function () {
			alert("Strony nie znaleziono");
		},

		success: function (result) {
			if (result !== null && result !== undefined) {

				$(result.models).each(function () {
					$('<option id="car_id_' + this.id + '" value="' + this.id + '">' + this.name + '</option>').appendTo("#cars");
				})
				getImg("img/cars/" + result.models[0].image);
				getText(result.models[0].name, result.models[0].description);

				$("#cars").on("change", function () {
					clear();
					var val = $(this).val();
					getImg("img/cars/" + result.models[val].image);
					getText(result.models[val].name, result.models[val].description);
				})
			} else {
				$('<img src="img/cars/Brak.png" alt="Brak" />').appendTo("#img-div");
				$('<h2>Przepraszamy, brak treści na stronie, prosimy sprubować później.</h2>').appendTo("#text-div section");
			}
		}
	});

	function getImg(src) {
		$.ajax({
			url: src,
			type: "GET",
			beforeSend: function () {
				$('<img src="img/preloader.gif" id="preloader" alt="preloader" />').appendTo("#dynamic .container");

			},
			complete: function () {
				$("#preloader").remove();
			},
			error: function () {
				//file not exists
				$('<img src="img/cars/Brak.png" alt="Brak" />').appendTo("#img-div");


			},
			success: function () {
				//file exists
				$('<img src="' + src + '" alt="Skoda" />').appendTo("#img-div");

			}
		});
	}

	function getText(name, desc) {

		$('<h2>' + name + '</h2>').appendTo("#text-div section");
		$('<p>' + desc + '</p>').appendTo("#text-div section");
	}

	function clear() {
		$("#text-div section h2, #text-div section p").remove();
		$("#img-div img").remove();
	}
})