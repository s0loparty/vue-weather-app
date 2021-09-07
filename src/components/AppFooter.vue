<template>
	<footer class="footer">
		<div class="footer__buttons">
			<!-- <button class="footer__btn">Изменить город</button>
			<button class="footer__btn">Мое местоположение</button>
			<button class="footer__btn">Погода на 3 дня</button> -->
			<div class="city-buttons">
				<button class="btn city-buttons_btn" @click="clickChangeCity">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
						<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
					</svg>
					<span>Сменить город</span>
				</button>
				<button class="btn city-buttons_btn" @click="$store.dispatch('getMemberLocation')">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
						<path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
						<path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
					</svg>
					<span>Мое местоположение</span>
				</button>
				<router-link to="/weather-list" custom v-slot="{ navigate }">
					<button @click="navigate" role="link" class="btn city-buttons_btn">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list-ul" viewBox="0 0 16 16">
						<path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
						</svg>
						<span>Погода на 3 дня</span>
					</button>
				</router-link>
			</div>
		</div>
		<div class="footer__units">
			<div class="wrap-units">
				<div class="units">
					<button 
						class="btn units_btn" 
						:class="unitActiveClass('c')"
						@click="$store.commit('setCurrentUnit', 'c')"
					>C</button>
					<button 
						class="btn units_btn" 
						:class="unitActiveClass('f')"
						@click="$store.commit('setCurrentUnit', 'f')"
					>F</button>
				</div>
			</div>
		</div>
	</footer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	methods: {
		unitActiveClass(btnUnit) {
			return { active: btnUnit === this.currentUnit }
		},
		clickChangeCity() {
			if (this.$router.currentRoute.value.name === 'weather-list') {
				return this.$router.push('/')

				// setTimeout(() => {
				// 	const focus = new FocusEvent('focusin')
				// 	document.querySelector('.city-search_input').dispatchEvent(focus)
				// }, 1000)
			}

			this.$store.commit('toggleSearchCity')
		}
	},
	computed: mapGetters(['currentUnit'])
}
</script>

<style lang="scss">
@import '@/assets/styles/scss/_bk-vars.scss';

.footer {
	position: absolute;
	bottom: 0;left: 0;right: 0;
	height: 50px;
	box-sizing: border-box;

	display: flex;
	align-items: center;
	justify-content: space-between;

	background-color: #ffffff0d;
	border-top: 1px solid #ffffff30;
	padding: 0 40px;
}

@media screen and (max-width: $bk-sm) {
	.footer {
		padding: 0 20px;
	}
}
</style>
