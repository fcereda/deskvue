<template>

	<li 
		class="dv-list-item"
		@click="onClick">
		<slot></slot>
	</li>

</template>

<script>

export default {
	data: function () {
		return {} 
	},

	methods: {
		onClick: function (e) {
			this.$emit('click', e)
		}
	}
}		

</script>

<style lang="scss">

@import './base.scss';

li.dv-list-item {
	display: block  !important;
	padding: 0.5em 1em;
	text-align: left;
	line-height: 125%;
	cursor: default;
	user-select: none;

	&:hover {
		background-color: $hover-color;
	}	
}

</style>