<template>

    <div 
    	class="dv-toolbar-spacer" 
    	:class="divClass"
    	:style="divStyle"
    ></div>

</template>

<script>

export default {
	props: [ 'width' ],

	data: function () {
		return {}
	},

	computed: {
		divClass: function () {
			return ''
		},

		divStyle: function () {
			if (!this.width)
				return 'flex:1;'
			return `width:${this.width};`
		}
	}
}

</script>

<style lang="scss">

@import './base.scss';

.dv-toolbar-spacer {
	
}

</style>