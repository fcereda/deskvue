<template>

	<div 
		class="dv-sliding-pane-container" 
		:style="containerStyle"
	>
		<div 
			class="dv-sliding-pane-content" 
			:style="contentStyle"
			ref="content">
			<slot></slot>
		</div>
	</div>

</template>

<script>

export default {
	props: ['show', 'slide-direction'],

	data: function () {
		return {
			width: 0,
			left: 0
		}
	},

	computed: {
		containerStyle: function () {
			return `max-width:${this.width}px;`
		},

		contentStyle: function () {
			return `left:${this.left}px;`	
		}
	},

	watch: {
		show: function () {
			let contentWidth = this.$refs.content.offsetWidth
			if (this.show) {
				this.width = contentWidth
				this.left = 0
			}
			else {
				this.width = 0
				this.left = -contentWidth
			}
		}
	}
}

</script>

<style lang="scss">

@import './base.scss';

.dv-sliding-pane-container {

	transition: all 0.3s ease;
	overflow: hidden;
	background-color: blue;
	position: relative;
	
}

.dv-sliding-pane-content {
	display:inline-block;
	background-color: firebrick;
	position: relative;

	transition: all 0.3s ease;	
}

</style>