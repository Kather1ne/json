<!DOCTYPE html>
<html lang="ru">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="style.css">
	<title>Тарифы компании</title>
</head>
<body>

	<?php

	$url = 'http://sknt.ru/job/frontend/data.json';
	$json = file_get_contents($url);
	$content = json_decode($json);
	$result = $content -> result;
	$tarifsAll = $content -> tarifs;
	if ($result == ok) {

		echo '<div class="content"><div class="tarifs block">';
		foreach ($tarifsAll as $key => $value) {
			$title = $value -> title;
			$link = $value -> link;
			$speed = $value -> speed;
			$options = $value -> free_options;
			echo '<div class="tarifs__item item">';
			echo '<div class="title">Тариф "'.$title.'"</div>';
			echo '<div class="speed ';

			preg_match('/[А-Яа-я]+/', $title, $string);
			switch ($string[0]) {
				case 'Земля':
					echo 'earth';
					break;
				case 'Вода':
					echo 'water';
					break;
				case 'Огонь':
					echo 'fire';
					break;
				
				default:
					echo 'fire';
					break;
			}
			
			echo'">'.$speed.' Mбит/с</div>';
			$subtarif = $value -> tarifs;
			$max = 0;
			$min = 5000;
			foreach ($subtarif as $subtarifItem) {
				$price = $subtarifItem -> price;
				$max = ($max > $price) ? $max :  $price;
				$min = ($min < $price) ? $min :  $price;
			}
			echo '<div class="price">'.($max/12).'-'.$min.'&#8381;/мес</div>';

			if ($options != null) foreach ($options as $key1 => $value1) {
				echo '<div class="text">'.$value1.'</div>';
			}
			echo '<div class="link bottom"><a href="'.$link.'" >Узнать подробнее на www.sknt.ru</a></div>';
			echo '</div>';
		}

		echo '</div>';
	}
	?>
	<div class="tarif-info block"></div>
	<div class="tarif-order block"></div>
</div>
<script
src="https://code.jquery.com/jquery-3.3.1.min.js"
integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
crossorigin="anonymous"></script>
<script src="script.js"></script>
</body>
</html>

