<template>
	<div class="alert alert--list">
		<div v-for="alert in $store.getters.appAlerts" :key="alert.id" class="alert__item">
			<div class="alert__title" :class="alert.type ?? ''">{{ alert.title }}</div>
			<div class="alert__body" v-html="alert.text"></div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.alert {
	&--list {
		position: absolute;
		bottom: 60px;
		right: 10px;
		box-sizing: border-box;
	}

	&__item {
		position: relative;
		box-sizing: border-box;

		max-width: 300px;
		border-radius: 2px;
		background-color: var(--white-color);
		color: #444;
		margin-bottom: 10px;
		line-height: normal;

		transition: opacity .5s;

		animation-name: alertAnimation;
		animation-duration: 5s;
		animation-fill-mode: forwards;

		&:last-child {margin-bottom: 0;}
	}
	&__title {
		padding: 5px;
		font-weight: bold;

		&.danger {color: var(--danger-color)}
		&.info {color: var(--blue-color)}
	}
	&__body { 
		padding: 5px;
		border-top: 1px solid #ccc;
	}
}

@keyframes alertAnimation {
	0% {opacity: 0}
	10% {opacity: 1}
	90% {opacity: 1}
	100% {opacity: 0}
}
</style>
