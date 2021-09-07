import { createRouter, createWebHistory } from 'vue-router'
import Weather from '@/views/Weather.vue'

const routes = [
	{ 
		path: '/', 
		name: 'weather-main', 
		component: Weather 
	},
	{ 
		path: '/weather-list', 
		name: 'weather-list', 
		component: () => import('@/views/WeatherList.vue') 
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
