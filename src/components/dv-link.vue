<template>

	<span class="dv-link" tabindex="0"
		@click="onClick"
		@keydown.enter="onClick"
		@keydown.space="onClick"
	><slot></slot></span>

</template>

<script>

import dvIcon from './dv-icon.vue'

export default {
	components: {
		dvIcon
	},

	data: function () {
		return {}
	},

	methods: {
		onClick: function (e) {
			this.$emit('click', e)
			e.preventDefault()
			e.stopPropagation()
		}
	}
}	

</script>

<style lang="scss">

@import './base.scss';

.dv-link {
	cursor: pointer;

	&:hover {
	    text-decoration: underline;
	}

	&:focus,
	&:active {
		outline: 0;
		color: $color-primary;		
	};

	&:active {
		color: $color-primary;
	}
}

</style>