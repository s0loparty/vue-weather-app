import { createStore } from 'vuex'

import wearherModule from '@/store/modules/weather'
import wearherListModule from '@/store/modules/weatherList'

import axios from 'axios'

export default createStore({
	state: {
		UPDATE_INTERVAL: 300000, // 300000 (5min)
		API: {
			basePath: 'https://api.weatherapi.com/v1/',
			key: '&key=' + process.env.VUE_APP_API_KEY,
			methods: {
				forecast: {
					path: 'forecast.json?&days=1&aqi=no&alerts=no&lang=ru',
				},
				ip: 'ip.json?&q=auto:ip',
				list: {
					path: 'forecast.json?&days=3&aqi=no&alerts=no&lang=ru',
				}
			},
		},
		appCityList: ['Краснодар', 'Москва', 'Омск', 'Воронеж', 'Чебоксары', 'Мыло'],
		appCurrentCity: 'Краснодар',
		appCurrentUnit: 'c',
		appUnits: ['c', 'f'],
		appCurrentWeather: null,
		appSearchCityIsActive: false,
		appAlerts: [],
	},
	mutations: {
		setCurrentCity(state, city) {
			state.appCurrentCity = city
		},
		setCurrentUnit(state, unit) {
			state.appCurrentUnit = unit
		},
		toggleSearchCity(state) {
			state.appSearchCityIsActive = !state.appSearchCityIsActive
		},
		setAlert(state, alert) {
			state.appAlerts.push({
				title: alert.title,
				text: alert.text,
				type: alert.type,
				id: state.appAlerts.length +1
			})

			setTimeout(() => state.appAlerts.shift(), 5000)
		}
	},
	getters: {
		UPDATE_INTERVAL(state) {
			return state.UPDATE_INTERVAL
		},
		api(state) {
			return state.API
		},
		currentCity(state) {
			return state.appCurrentCity
		},
		currentUnit(state) {
			return state.appCurrentUnit
		},
		searchCityIsActive(state) {
			return state.appSearchCityIsActive
		},
		cityList(state) {
			return state.appCityList
		},
		appAlerts(state) {
			return state.appAlerts
		}
	},
	actions: {
		async getMemberLocation({commit, dispatch}) {
			const { data: {ip} } = await axios.get('https://ipapi.co/json/')
			const { data } = await axios.get(`https://api.allorigins.win/get?url=http://ip-api.com/json/${ip}?lang=ru`, {
				headers: {
					'Content-Type': 'application/jsonp'
				}
			})

			const city = data.contents.split('\"')[23]
			
			commit('setCurrentCity', city)
			dispatch('getWeather', city)
		},
	},
	modules: {
		wearherModule,
		wearherListModule
	}
})
