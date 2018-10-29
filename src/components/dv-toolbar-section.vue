<template>

	<div 
		class="dv-toolbar-section"
		:class="divClass"
		:style="divStyle">
		<slot></slot>
	</div>

</template>

<script>

export default {

	props: [ 'width', 'border', 'align' ],
	
	data: function () {
		return {}
	},

	computed: {
		divClass: function () {
			let classes = []
			if (this.border == 'right')
				classes.push('border-right')
			if (this.border == 'left')
				classes.push('border-left')
			if (this.align == 'left')
				classes.push('align-center')
			if (this.align == 'right')
				classes.push('align-right')
			return classes
		},

		divStyle: function () {
			if (this.width)
				return `width:${this.width};`
			return ''
		}
	}

}	

</script>

<style lang="scss">

@import './base.scss';

.dv-toolbar-section {
	align-self: stretch;
	display: flex;
	flex-direction: row;
	align-items: center;
	padding-left: 8px;
	padding-right: 8px;
	justify-content: center;
	//background-color: yellow;

	&.border-right {
		border-right: 1px solid $border-color;
	}

	&.border-left {
		border-left: 1px solid $border-color;
	}

	&.align-left {
		justify-content: flex-start;
	}

	&.align-right {
		justify-content: flex-end;
	}
}

</style>