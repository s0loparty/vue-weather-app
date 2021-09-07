import axios from "axios"

export default {
	state: {
		appCurrentWeatherList: []
	},
	mutations: {
		buildDataList(state, payload) {
			console.log('buildDataList:', payload)
			const current = payload.current
			const forecast = payload.forecast.forecastday

			const currentHour = new Date().getHours()
			const newWeather = []

			forecast.forEach(item => {
				newWeather.push({
					isOpen: false,
					moon: {
						phase: item.astro.moon_phase,
						moonrise: item.astro.moonrise,
						moonset: item.astro.moonset,
					},
					sun: {
						sunrise: item.astro.sunrise,
						sunset: item.astro.sunset,
					},
					date: item.date,
					date_timestamp: item.date_epoch,
					day: {
						text: item.day.condition.text,
						iconCode: +item.day.condition.icon.split('/').pop().replace('.png', ''),
						avghumidity: item.day.avghumidity,
						chance_rain: item.day.daily_chance_of_rain,
						chance_snow: item.day.daily_chance_of_snow,
						totalprecip: item.day.totalprecip_mm, // осадки
						units: {
							c: {
								avgtemp: Math.round(item.day.avgtemp_c),
								maxtemp: Math.round(item.day.maxtemp_c),
								mintemp: Math.round(item.day.mintemp_c),
								maxwind: item.day.maxwind_kph,
							},
							f: {
								avgtemp: Math.round(item.day.avgtemp_f),
								maxtemp: Math.round(item.day.maxtemp_f),
								mintemp: Math.round(item.day.mintemp_f),
								maxwind: item.day.maxwind_mph,
							}
						},
						hours: item.hour.filter(hItem => hItem.temp_c = Math.round(hItem.temp_c))
					}
				})
			})

			console.log(newWeather);
			state.appCurrentWeatherList = newWeather
		},
		toggleInfoWeather(state, id) {
			const wList = state.appCurrentWeatherList
			if (wList[id].isOpen) {
				return wList[id].isOpen = false
			}
			wList.forEach(item => item.isOpen = false)
			wList[id].isOpen = !wList[id].isOpen
		}
	},
	getters: {
		currentWeatherList(state) {
			return state.appCurrentWeatherList
		}
	},
	actions: {
		async getWeatherList({ commit, getters }, payload) {
			try {
				const api = getters.api
				const paramCity = !payload.city ? `&q=${getters.currentCity}` : `&q=${payload.city}`
				const { data } = await axios.get(`${api.basePath + api.methods.list.path + api.key + paramCity}`)

				commit('buildDataList', data)
			} catch (error) {
				console.log(error.message)
			}
		}
	},
}
