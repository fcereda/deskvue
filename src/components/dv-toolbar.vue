<template>

	<header :style="headerStyle">
		<div class="dv-toolbar" :class="toolbarClass">
			<slot></slot>
		</div>
	</header>

</template>

<script>

import utils from './utils.js'

export default {
	props: ['sticky', 'top', 'topbar'],

	data: function () {
	    return {}
	},

	computed: {
		headerStyle: function () {
			let styles = []
			if (utils.isPropOn(this.sticky))
				styles.push(`position:sticky;`)
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