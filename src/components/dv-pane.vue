<template>

	<div 
		class="dv-pane"
		:class="divClass"
		:style="divStyle"
	><slot></slot></div>		

</template>

<script>

import utils from './utils.js'

export default {

	props: ['width', 'height', 'border', 'vertical', 'horizontal', 'defaultScroll', 'slim'],

	data: function () {
		return {}
	},

	computed: {
		divClass: function () {
			return utils.computeClasses({
				scrollx: 'horizontal',
				scrolly: 'vertical',
				'default-scroll': 'defaultScroll',
				slim: 'slim'
			}, this)
		},

		divStyle: function () {
			let styles = []
			if (this.width) 
				styles.push(`width:${this.width};`)
			if (this.height)
				styles.push(`height:${this.height};`)
			if (this.border)
				styles.push(`border:${this.border};`)
			return styles.join('')
		}
	}

}

</script>

<style lang="scss">

@import './base.scss';

.dv-pane {
	overflow: hidden;

	&:not(.default-scroll)::-webkit-scrollbar-track {
		background-color: #ddd;
	}

	&:not(.default-scroll)::-webkit-scrollbar-thumb {
    	background-color: #999;
	}

	&:not(.default-scroll)::-webkit-scrollbar {
    	width: 8px;
	} 

	&:not(.default-scroll).slim::-webkit-scrollbar {
		width: 6px;
	}		

	&.scrollx {
		overflow-x: scroll;
	}

	&.scrolly {
		overflow-y: scroll;
	}

}

</style>
