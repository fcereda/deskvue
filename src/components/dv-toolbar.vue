<template>


		<div class="dv-toolbar" :class="toolbarClass" :style="headerStyle">
			<slot></slot>
		</div>

</template>

<script>

import utils from './utils.js'

export default {
	props: ['sticky', 'fixed', 'top', 'topbar'],

	data: function () {
	    return {}
	},

	computed: {
		headerStyle: function () {
			let styles = []
			if (utils.isPropOn(this.sticky))
				styles.push(`position:sticky;`)
			else if (utils.isPropOn(this.fixed))
				styles.push(`position:fixed;`)
			if (this.top)
				styles.push(`top:${this.top};`)
			return styles.join('')
		},

		toolbarClass: function () {
			if (this.topbar == 'none')
				return 'no-topbar'
			return ''
		}
	}
}

</script>

<style lang="scss">

@import './base.scss';

header {
	z-index: 10;
}

.dv-toolbar {
	box-sizing: border-box;
	display: flex;
	align-items: center;
	background-color: white;
	height: 49px;
	position: absolute;
	top: 0px;
	left:0px;
	right: 0px;
	z-index: 1000;
	border-bottom: 1px solid $border-color;
	--topbar-color: firebrick;
	text-align:left;
	border-top: 6px solid var(--topbar-color);

	&:not(.topbar) {
		--topbar-color: #888;
	}

	&.no-topbar {
		border-top: 1px solid $border-color;
	}	


}

</style>