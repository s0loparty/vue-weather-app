export function calcDeg(deg, fullName = false) {
	if (!deg) return 'западный'

	const directions = (fullName) 
		? ["Северный","Северо-восточный","Восточный","Юго-восточный","Южный","Юго-западный","Западный","Северо-западный"] 
		: ["С","СВ","В","ЮВ","Ю","ЮЗ","З","СЗ"]
	return directions[(deg / 45) | 0]
}
