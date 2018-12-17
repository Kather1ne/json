$(function(){
	var jqxhr = $.getJSON( "http://sknt.ru/job/frontend/data.json", function() {
	})
	.done(function(data) {
		var tarifs = data['tarifs'];
		var body = $('html, body');

		var innerhtml = "";
		var tarifsBlock = $('.tarifs');
		if (tarifsBlock.children().length % 3 == 2) {
			innerhtml += `
			<div class="tarifs__item__item item nodisplay"></div>`;
		} else if (tarifsBlock.children().length % 3 == 1) {
			innerhtml += `
			<div class="tarifs__item item nodisplay"></div>
			<div class="tarifs__item item nodisplay"></div>`;
		}

		tarifsBlock.append(innerhtml);
		


		function listShownStyle(noactiveItems, activeItem, openBlock) {
			if (window.innerWidth > 1023) {
				$(noactiveItems).removeClass('active');
				$(noactiveItems).addClass('noactive');
				$(activeItem).addClass('active');
			} else {
				body.scrollTop(0);
				$(openBlock).addClass('open');
			}

			$(openBlock + ' .block-title').click(function(){
				$(openBlock).removeClass('open');
			});
		}

		
		
		$('.tarifs__item').on('click', function() {

			$('.tarif-order').html('');
			var title = $(this).find('.title').html().replace('Тариф "','').replace('"','');
			var innerhtml = '';

			$.each(tarifs, function(index, el) {
				if (title == el['title']) {
					$.each(el['tarifs'], function(index, tarifDirection) {
						innerhtml += `
						<div class="tarif-info__item item">
						<div class="title">`+ tarifDirection['title'] + `</div>
						<div class="price">`+ (parseInt(tarifDirection['price'])/parseInt(tarifDirection['pay_period'])) + `&#8381;/мес</div>
						<div class="text">разовый платеж `+ tarifDirection['price'] + `&#8381;/мес</div>
						</div>
						`;
					
					});
					if (el['tarifs'].length % 3 == 2) {
						innerhtml += `
						<div class="tarif-info__item item nodisplay"></div>`;
					} else if (el['tarifs'].length % 3 == 1) {
						innerhtml += `
						<div class="tarif-info__item item nodisplay"></div>
						<div class="tarif-info__item item nodisplay"></div>`;
					}

					$('.tarif-info').html('<div class="block-title">Тариф "' + title + '"</div>' + innerhtml);					

					$('.tarif-info__item').click(function(){					
						
						var title = $(this).find('.title').html();
						var innerhtmlOrder = '';
						$.each(tarifs, function(index, el) {
							$.each(el['tarifs'], function(index, singleTarif){
								if (title == singleTarif['title']) {
									var date = new Date(parseInt(singleTarif['new_payday'].match(/\w+/)[0])*1000);
									innerhtmlOrder = `
									<div class="block-title">Выбор тарифа</div>
									<div class="tarif-order__item item">
									<div class="title">Тариф "`+ singleTarif['title']+ `"</div>
									<div class="price">Период оплаты `+ singleTarif['pay_period']+ ` месяцев</div>
									<div class="price">`+ (parseInt(singleTarif['price'])/parseInt(singleTarif['pay_period']))+ `&#8381;/мес</div>
									<div class="text">разовый платеж `+ singleTarif['price']+ `&#8381;/мес</div>
									<div class="text">co счета спишется `+ singleTarif['price']+ `&#8381;/мес</div>
									<div class="date">вступит в силу - сегодня </div>
									<div class="date">активно до - `+ date.toLocaleString().split(',')[0] +` </div>
									<div  class="submit-btn bottom">
									<button>Выбрать</button>
									</div>
									</div>`;
									$('.tarif-order').html(innerhtmlOrder);									
								}
							});
						});
						listShownStyle('.tarif-info__item', this, '.tarif-order');
					});
				}
			});
			listShownStyle('.tarifs__item', this, '.tarif-info');
		});	

		
	})
	.fail(function() {
		//console.log( "error" );
	});
});