
var HebAlphabetWindow = function(id, node, init_data) {



	var
		container =
			$('<div class="alphabet-container">'+
				'<div class="window-header hebalphabet-header"><span class="window-title i18n" data-i18n="[html]windows.hebalphabet.label"></span></div>'+
				'<div class="container-fluid window-main hebalphabet-main">' +
				'</div>' +
			'</div>').appendTo(node),
		html = "",

		// dom nodes
		header = container.find('.hebalphabet-header'),
		main = container.find('.window-main'),

		// settings
		hasFocus = false;
		
		$('.hebalphabet-main').append(
		// '<div class="container">'+
			'<div class="row tab first-tab">'+
				'<div class="col-md-12 down-tab">'+
					'<h1 class="text-center">Alphabet Hébraïque</h1>'+
					'<p>Vers le Vlème siècle de notre ère, les dépositaires de la tradition consistant à copier fidèlement les Ecritures hébraiqnes ont fini par être connus sons le nom de massorètes (en hébreu : Baalei Hamasorah, "Seigneurs de la tradition"). On appelle textes massorétiques les copies qu\'ils ont réalisées.</p>'+
					'<p>L\'alphabet hébraïque comprend 22 consonnes. L‘hébreu s\'écrit de droite à gauche et ne connaît pas de majuscules. Toutes ces lettres ont une valeur numérique. La signification de ces lettres est une formidable occasion d\'approfondir la connaissance de notre Seigneur Jésus.</p>'+
					'<p>Le mot hébreu pour "copiste" est Sopher. ll évoque l\'idée de compter ou de recenser. Les Massorètes repérèrent la lettre médiane du Pentateuque (les cinq premiers livres de la Bible), la section centrale de chaque livre, et ils signalèrent le	nombre d’occurrences de chaque lettre de l\'alphabet dans l\'ensemble des Ecritures hébraïques.</p>'+
					'<p>La préoccupation première des massorètes était la transmission fidèle de chaque mot, et même de chaque lettre, du texte de la Bible.</p>'+
					'<p>Ils étaient extrêmement appliqués et élaborèrent divers systèmes de vérification. Dans leur souci de ne rien oublier du texte biblique, ils comptèrent non seulement les mots, mais aussi les lettres. Ils recensèrent 815 140 caractères dans les Ecritures hébraïques.</p>'+
				'</div>'+
			'</div>'+
			'<div class="row tab other-tab">'+
				'<div class="col-md-12">'+
					'<div class="table-responsive">'+
						'<table id="tab-hebalphabet" class="table table-bordered table-hover table-striped">'+
							'<thead>'+
								'<tr>'+
									'<th>Lettre</th>'+
									'<th>Hébreu Ancien</th>'+
									'<th>Paleo</th>'+
									'<th>Noms</th>'+
									'<th>Sens</th>'+
									'<th>Valeur</th>'+
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
			url: 'content/alphabets/hebrew_alphabet.json',
			success: function(data) {

				$(data).each(function() {
					$.each(this, function(k,v) {
						console.log(v.fra_name);
						html += '<tr><td><img width="32" height="33" src="content/alphabets/images/' + this.modern_letter + '"/></td>'+
									'<td><img width="32" height="33" src="content/alphabets/images/' + this.ancient_letter + '"/></td>'+
									'<td><img width="32" height="33" src="content/alphabets/images/' + this.paleo_letter + '"/></td>'+
									'<td>' + this.fra_name + '</td>'+
									'<td>' + this.fra_meaning + '</td>'+
									'<td>' + this.numeric + '</td>'+
								'</tr>';
					});
					
				});
				$('#tab-hebalphabet tbody').append(html);
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
					'win': 'hebalphabet'
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
		className:'HebAlphabetWindow',
		param: 'hebalphabet',
		paramKeys: {
			'textid': 't',
			'parallelid': 'p'
		},
		init: {
			'textid': sofia.config.newBibleWindowVersion
		}
	});

});
