<template>

	<span 
		class="dv-label"
		:class="labelClass"
		:style="labelStyle"
	><slot></slot></span>

</template>

<script>

export default {
	props: ['align', 'width'],

	data: function () {
		return {}
	},

	computed: {
		labelClass: function () {
			if (this.align == 'right')
				return 'align-right'
			if (this.align == 'center')
				return 'align-center'
		},

		labelStyle: function () {
			if (this.width)
				return `width:${this.width};`
			return ''
		}
	}
}

</script>	

<style lang="scss">

@import './base.scss';

.dv-label {
	font-size: $font-size - 1;
	font-weight: 700;
	line-height: $form-control-height;

	align-right: {
		text-align: right;
	}
	
	align-center {
		text-align: center;
	}	
}

</style>