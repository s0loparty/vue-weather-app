export default function(iconCode = 113, isDay = 1) {
	const icons2 = [
		{
			codes: [113], // ясно
			dayIcon: '<i class="bi bi-brightness-high"></i>',
			nightIcon: '<i class="bi bi-moon"></i>'
		},
		{
			codes: [116], // переменная облачность
			dayIcon: '<i class="bi bi-cloud-sun"></i>',
			nightIcon: '<i class="bi bi-cloud-moon"></i>'
		},
		{
			codes: [119, 122], // облачно + пасмурно
			dayIcon: '<i class="bi bi-cloud"></i>',
			nightIcon: '<i class="bi bi-cloud"></i>'
		},
		{
			codes: [143, 248, 260], // ((Mist + Fog) туман) + Ледяной туман
			dayIcon: '<i class="bi bi-cloud-fog"></i>',
			nightIcon: '<i class="bi bi-cloud-fog"></i>'
		},
		{
			codes: [176, 293, 296], // Возможен кратковременный дождь + Местами небольшой дождь + Легкий дождь
			dayIcon: '<i class="bi bi-cloud-rain"></i>',
			nightIcon: '<i class="bi bi-cloud-rain"></i>'
		},
		{
			codes: [170, 227, 230], // Возможен пятнистый снег + Низовая метель + Метель
			dayIcon: '<i class="bi bi-snow"></i>',
			nightIcon: '<i class="bi bi-snow"></i>'
		},
		{
			codes: [182, 185, 317, 362, 365], // слякоть + Возможна местами замерзающая морось + Легкий мокрый снег + Небольшой дождь с мокрым снегом + Умеренный или сильный дождь с мокрым снегом
			dayIcon: '<i class="bi bi-cloud-sleet"></i>',
			nightIcon: '<i class="bi bi-cloud-sleet"></i>'
		},
		{
			codes: [200], // Возможны грозовые вспышки
			dayIcon: '<i class="bi bi-lightning"></i>',
			nightIcon: '<i class="bi bi-lightning"></i>'
		},
		{
			codes: [263, 266, 281, 264], // Местами слабая морось + Легкая морось + Изморозь + Сильная переохлажденная морось
			dayIcon: '<i class="bi bi-cloud-drizzle"></i>',
			nightIcon: '<i class="bi bi-cloud-drizzle"></i>'
		},
		{
			codes: [299, 302, 305, 308, 356, 359], // Временами умеренный дождь + Умеренный дождь + Временами сильный дождь + Ливень + Умеренный или сильный ливневый дождь + Проливной дождь
			dayIcon: '<i class="bi bi-cloud-rain-heavy"></i>',
			nightIcon: '<i class="bi bi-cloud-rain-heavy"></i>'
		},
		{
			codes: [311, 314, 350, 353, 374, 377], // (град) Легкий ледяной дождь + Умеренный или сильный ледяной дождь + Ледяная крупа + Небольшой дождь моросит + Легкие дожди ледяной крупы + Умеренный или сильный ливень ледяной крупы
			dayIcon: '<i class="bi bi-cloud-hail"></i>',
			nightIcon: '<i class="bi bi-cloud-hail"></i>'
		},
		{
			codes: [320, 323, 326, 368, 392], // Умеренный или сильный мокрый снег + Местами легкий снег + Слабый снег + Небольшой снегопад + Местами легкий снег с громом
			dayIcon: '<i class="bi bi-cloud-snow"></i>',
			nightIcon: '<i class="bi bi-cloud-snow"></i>'
		},
		{
			codes: [329, 332, 335, 371], // Местами умеренный снег + Умеренный снег + Местами сильный снегопад + Умеренный или сильный снегопад
			dayIcon: '<i class="bi bi-snow2"></i>',
			nightIcon: '<i class="bi bi-snow2"></i>'
		},
		{
			codes: [338, 395], // Снегопад + Умеренный или сильный снегопад с грозой
			dayIcon: '<i class="bi bi-snow3"></i>',
			nightIcon: '<i class="bi bi-snow3"></i>'
		},
		{
			codes: [386, 389], // Местами небольшой дождь с громом + Умеренный или сильный дождь с грозой
			dayIcon: '<i class="bi bi-cloud-lightning-rain"></i>',
			nightIcon: '<i class="bi bi-cloud-lightning-rain"></i>'
		}
	]

	const icon = icons2.find(item => item.codes.includes(iconCode))
	if (!icon) return '<i class="bi bi-emoji-frown"></i>'
	return isDay ? icon.dayIcon : icon.nightIcon
}
