<template>

	<span 
		class="dv-label"
		:class="labelClass"
		:style="labelStyle"
	><span><slot></slot></span></span>

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
	display:inline-flex;
	align-self:stretch;
	align-items:center;

	font-weight: 700;
	font-size: $font-size - 1;
	padding-top:1px;

	&.align-right {
		text-align: right;
	}
	
	&.align-center {
		text-align: center;
	}	
}

</style>