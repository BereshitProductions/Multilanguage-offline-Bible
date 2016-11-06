
var GrAlphabetWindow = function(id, node, init_data) {



	var
		container =
			$('<div class="alphabet-container">'+
				'<div class="window-header gralphabet-header"><span class="window-title i18n" data-i18n="[html]windows.gralphabet.label"></span></div>'+
				'<div class="window-main gralphabet-main">' +
				'</div>' +
			'</div>').appendTo(node),
		html = "",

		// dom nodes
		header = container.find('.gralphabet-header'),
		main = container.find('.window-main'),

		// settings
		hasFocus = false;
		
		$('.gralphabet-main').append(
		// '<div class="container">'+
			'<div class="row tab first-tab">'+
				'<div class="col-md-12 down-tab">'+
					'<h1 class="text-center">Alphabet Grec</h1>'+
				'</div>'+
			'</div>'+
			'<div class="row tab other-tab">'+
				'<div class="col-md-12">'+
					'<div class="table-responsive">'+
						'<table id="tab-gralphabet" class="table table-bordered table-hover table-condensed">'+
							'<thead>'+
								'<tr>'+
									'<th>Majuscule</th>'+
									'<th>Minuscule</th>'+
									'<th>Nom</th>'+
									'<th>Nom Grec</th>'+
									'<th>Translittération</th>'+
								'</tr>'+
							'</thead>'+
							'<tbody>'+
							'</tbody>'+
						'</table>'+
					'</div>'+
				'</div>'+
			'</div>'
		// '</div>'
		);


	// START UP

	function init() {

		// console.log('dicoindow init',init_data);

		if (init_data == null) {
			return;
		}

		sofia.ajax({
			dataType: 'json',
			url: 'content/alphabets/greek_alphabet.json',
			success: function(data) {

				$(data).each(function() {
					$.each(this, function(k,v) {
						console.log(v.fra_name);
						html += '<tr><td>' + this.capital + '</td>'+
									'<td>' + this.lower + '</td>'+
									'<td>' + this.name + '</td>'+
									'<td>' + this.greek_name + '</td>'+
									'<td>' + this.xlit + '</td>'+
								'</tr>';
					});
					
				});
				$('#tab-gralphabet tbody').append(html);
			}
		});
	}

	// function startup() {


		// if (textsInitialized && parallelsData != null) {
			// load !
			// loadParallelData();
		// }
	// }

	init();


	function close() {

		ext.clearListeners();
	}

	function size(width, height) {
		// do notheirng?
		main.outerHeight(height - header.outerHeight())
			.outerWidth(width);

	}

	var ext = {
		size: size,
		getData: function() {
			return {

				params: {
					'win': 'gralphabet'
				}

			}
		},
		close: close
	};
	ext = $.extend(true, ext, EventEmitter)

	return ext;
};

sofia.initMethods.push(function() {

	sofia.windowTypes.push( {
		className:'GrAlphabetWindow',
		param: 'gralphabet',
		paramKeys: {
			'textid': 't',
			'parallelid': 'p'
		},
		init: {
			'textid': sofia.config.newBibleWindowVersion
		}
	});

});
