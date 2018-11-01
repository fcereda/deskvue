<template>

	<div 
		class="dv-sliding-pane-container" 
		:class="containerClass"
		:style="containerStyle"
	>
		<div 
			class="dv-sliding-pane-content"
			:class="contentClass" 
			:style="contentStyle"
			ref="content">
			<slot></slot>
		</div>
	</div>

</template>

<script>

const DIRECTION_HORIZONTAL = 1
const DIRECTION_VERTICAL = 2

export default {
	props: {
		'show': Boolean, 
		'dock': {
			type: String,
			default: 'left',
		},
		'floating': {
			type: Boolean,
			default: true
		}	
	},

	data: function () {
		return {
			size: 0,
			position: 0,
		}
	},

	computed: {
		containerClass: function () {
			if (!this.floating)
				return ['relative', this.dock]
			return ''
		},

		containerStyle: function () {
			let styles = []
			let cssProperty = this.direction == DIRECTION_HORIZONTAL ? 'max-width' : 'max-height'
			styles.push(`${cssProperty}:${this.size}px;`)
			if (this.dock == 'right' || this.dock == 'bottom')
				styles.push(`${this.dock}:${this.position};`)
			return styles.join('')
		},

		contentClass: function () {
			if (this.direction == DIRECTION_HORIZONTAL)
				return 'horizontal'
			return 'vertical'
		},

		contentStyle: function () {
			let cssProperty = this.dock
			let style = `${cssProperty}:${this.position}px;`
			return style
		},

		direction: function () {
			if (this.dock == 'left' || this.dock == 'right')
				return DIRECTION_HORIZONTAL
			return DIRECTION_VERTICAL
		}
	},

	watch: {
		show: function () {
			this.setSizeAndPosition()
		}
	},

	mounted: function () {
		this.setSizeAndPosition()
	},

	methods: {
		setSizeAndPosition: function () {
			let contentElement = this.$refs.content
			let contentSize = this.direction == DIRECTION_HORIZONTAL ? contentElement.offsetWidth : contentElement.offsetHeight
			if (this.show) {
				this.size = contentSize
				this.position = 0
			}
			else {
				this.size = 0
				this.position = 0
				if (this.dock == 'left' || this.dock == 'top') {
					this.position = -contentSize
				}
			}
		}
	}
}

</script>

<style lang="scss">

@import './base.scss';

$transition-duration: 0.3s;


.dv-sliding-pane-container {
	transition: all $transition-duration ease;
	overflow: hidden;
	background-color: blue;
	position: absolute;

	&.relative {
		position: relative;

		&.left {
			float: left;
		}

		&.right {
			float: right;
		}
	}
}

.dv-sliding-pane-content {
	display: inline-block;
	background-color: firebrick;
	position: relative;
	transition: all $transition-duration ease;	

	&.horizontal {
		height: 100%;	
	}

	&.vertical {
		width: 100%;
	}

}



</style>