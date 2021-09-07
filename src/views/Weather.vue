<template>
	<AppLoader :data="currentWeather" />
	<TheWeatherHeader />
	<TheWeatherMain />
	<TheWeatherFooter :weather="currentWeather" :unit="currentUnit" />
	<AppFooter />
</template>

<script>
import { mapGetters } from 'vuex'

import TheWeatherHeader from '@/components/TheWeatherHeader'
import TheWeatherMain from '@/components/TheWeatherMain'
import TheWeatherFooter from '@/components/TheWeatherFooter'
import AppFooter from '@/components/AppFooter'
import AppLoader from '@/components/AppLoader'

export default {
	computed: mapGetters(['currentCity', 'currentWeather', 'currentUnit']),
	components: { TheWeatherHeader, TheWeatherMain, TheWeatherFooter, AppFooter, AppLoader }
}
</script>
