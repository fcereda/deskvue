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

	props: ['width', 'height', 'border', 'elevation', 'verticalScroll', 'horizontalScroll', 'defaultScrollbar', 'slimScrollbar'],

	data: function () {
		return {}
	},

	computed: {
		divClass: function () {
			let elevation = this.elevation
			let scrollbar = this.scrollbar
			return utils.computeClasses({
				scrollx: 'horizontalScroll',
				scrolly: 'verticalScroll',
				'default-scrollbar': scrollbar == 'default',
				'slim-scrollbar': scrollbar == 'slim',
				'elevation-1': elevation == 1,
				'elevation-2': elevation == 2,
				'elevation-3': elevation == 3,
				'elevation-4': elevation == 4,
				'border-top': (elevation > 0) && (elevation < 5) && (!this.border),
				border: 'border'
			}, this)
		},

		divStyle: function () {
			let styles = []
			if (this.width) 
				styles.push(`width:${this.width};`)
			if (this.height)
				styles.push(`height:${this.height};`)
			return styles.join('')
		}
	}

}

</script>

<style lang="scss">

@import './base.scss';

.dv-pane {
	overflow: hidden;

	&.border-top {
		border-top: 1px solid rgba(0, 0, 0, 0.125);
	}

	&.border {
		border: 1px solid $border-color;
	}

	&:not(.default-scrollbar)::-webkit-scrollbar-track {
		background-color: #ddd;
	}

	&:not(.default-scrollbar)::-webkit-scrollbar-thumb {
    	background-color: #999;
	}

	&:not(.default-scrollbar)::-webkit-scrollbar {
    	width: 8px;
	} 

	&:not(.default-scrollbar).slim-scrollbar::-webkit-scrollbar {
		width: 6px;
	}		

	&.scrollx {
		overflow-x: scroll;
	}

	&.scrolly {
		overflow-y: scroll;
	}

}

.elevation-1 {
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}

.elevation-2 {
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
}

.elevation-3 {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}

.elevation-4 {
    box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
}


</style>
