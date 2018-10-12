<template>


	<i 
		class="material-icons dv-icon"
		:style="iconStyle"
	><slot></slot></i>


</template>

<script>

export default {
	props: ['rotate'],

	data: function () {
		return {}
	},

	computed: {
		iconStyle: function () {
			if (this.rotate) {
				let rotation = this.rotate
				if (typeof rotation == 'number')
					rotation = rotation + 'deg'
				return `transform:rotate(${rotation})`
			}
			return ''
		}
	}
}

</script>

<style lang="scss">

@import './base.scss';

$icon-size: 20px;

.dv-icon {
	display:inline-block;

	&.material-icons {
		font-size: $icon-size;
		display: inline-block;
		vertical-align: middle;
	}	

}

</style>