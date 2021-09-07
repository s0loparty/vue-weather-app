export default function moonPhases(phase) {
	const apiMoon = [
		'New Moon',
		'Waxing Crescent',
		'First Quarter',
		'Waxing Gibbous',
		'Full Moon',
		'Waning Gibbous',
		'Last Quarter',
		'Waning Crescent'
	]
	const ruMoon = [
		'Новолуние',
		'Молодая луна',
		'Первая четверть',
		'Прибывающая луна',
		'Полнолуние',
		'Убывающая луна',
		'Последняя четверть',
		'Старая луна'
	]

	return ruMoon[apiMoon.findIndex(item => item === phase)]
}
