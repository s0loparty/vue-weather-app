import axios from "axios"

export default {
	mutations: {
		buildData(state, data) {
			console.log('buildData:', data);
			const currentHour = new Date().getHours()
			state.appCurrentWeather = {
				sunrise: data.astro.sunrise,
				sunset: data.astro.sunset,
				humidity: data.day.avghumidity,
				windDeg: data.hour[currentHour].wind_degree,
				windDir: data.hour[currentHour].wind_dir,
				iconCode: +data.hour[currentHour].condition.icon.split('/').pop().replace('.png', ''),
				units: {
					c: {
						temp: Math.round(data.hour[currentHour].temp_c),
						vision: data.hour[currentHour].vis_km,
						max_wind: (data.hour[currentHour].wind_kph * 1000) / 3600, // км в час -> м/c
						pressure: Math.floor((data.hour[currentHour].pressure_mb * 3) / 4)
					},
					f: {
						temp: Math.round(data.hour[currentHour].temp_f),
						vision: data.hour[currentHour].vis_miles,
						max_wind: data.hour[currentHour].wind_mph,
						pressure: data.hour[currentHour].pressure_mb
					}
				},
				condition: {
					text: data.hour[currentHour].condition.text,
					icon: data.hour[currentHour].condition.icon,
					code: data.hour[currentHour].condition.code
				},
				chanceRain: data.hour[currentHour].chance_of_rain,
				chanceSnow: data.hour[currentHour].chance_of_snow,
				isDay: +data.hour[currentHour].is_day,
			}
		}
	},
	getters: {
		currentWeather(state) {
			return state.appCurrentWeather
		}
	},
	actions: {
		async getWeather({ commit, dispatch, getters }, city) {
			try {
				const api = getters.api
				const paramCity = !city ? `&q=${getters.currentCity}` : `&q=${city}`
				const { data } = await axios.get(`${api.basePath + api.methods.forecast.path + api.key + paramCity}`)

				commit('buildData', data.forecast.forecastday[0])
			} catch (error) {
				console.log(error.message)

				const defaultCity = getters.cityList[0]
				
				commit('setAlert', {
					title: city, 
					text: `Такой город не найден! <br> Показываем погоду в <b>${defaultCity}</b>`, 
					type: 'danger'
				})
				commit('setCurrentCity', defaultCity)
				dispatch('getWeather', defaultCity)
			}
		}
	},
}
