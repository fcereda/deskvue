<template>

	<div 
		class="dv-collapsible-pane" 
		:class="divClass"
		tabindex="0"
		@keydown="onKeydown"
		@focus="hasFocus = true"
		@blur="hasFocus = false"
	>
		<div>
			<div 
				v-if="title" 
				class="dv-collapsible-pane-head"
				:class="headClass"
				@click="onClickHeader"
			>
				<span style="text-align:left;vertical-align:text-top;">{{ title }}</span>
				<span style="flex:1;">&nbsp;</span>
				<span  style="vertical-align:text-top;" >
					<dv-iconbutton 
						link 
						tabindex="-1"
						:rotate="displayContent ? 180 : 0"
						@click="onClickArrow"
					>keyboard_arrow_down</dv-iconbutton>
				</span>	
			</div>	
			<slot name="head"></slot>
		</div>
		<div 
			class="dv-collapsible-pane-content" 
			:style="contentStyle"
		>
			<div
				ref="content">
				<div v-if="content" v-html="content"></div>
				<slot></slot>
			</div>	
		</div>
	</div>			

</template>

<script>

import utils from './utils.js'
import dvIconbutton from './dv-iconbutton.vue'

export default {

	components: {
		dvIconbutton
	},

	props: {
		title: String,
		content: String,
		open: {
			type: Boolean,
			default: false
		},
		automatic: {
			type: Boolean,
			default: false
		}, 
		rounded: {
			type: Boolean,
			default: false
		}, 
		headerClick: {
			type: Boolean,
			default: true
		}
	},	

	data: function () {
		return {
			displayContent: this.open,
			contentHeight: 0,
			thisRounded: this.rounded,
			hasFocus: false
		}
	},

	watch: {
		open: function () {
			if (open === undefined)
				return
			this.displayContent = this.open
		}
	},

	computed: {
		divClass: function () {
			return utils.computeClasses({
				rounded: utils.isPropOn(this.thisRounded),
				closed: !this.displayContent
			}, this)
		},

		headClass: function () {
			let classes = []
			if (!this.displayContent)
				classes.push('closed')
			if (this.hasFocus)
				classes.push('focus')
			return classes
		},

		contentStyle: function () {
			if (this.$refs.content) {
				this.contentHeight = this.$refs.content.offsetHeight
			}
			if (this.displayContent) {
				return `max-height:${this.contentHeight}px;`
			}
			return ''
		},

		parentIsAccordion: function () {
			return Boolean(this.$parent.addPane)
		}
	},

	mounted: function () {
		if (this.$refs.content) {
			this.contentHeight = this.$refs.content.offsetHeight
		}
		if (this.parentIsAccordion) {
			this.$parent.addPane(this)
		}
	},

	methods: {
		onClickHeader: function () {
			if (this.headerClick)
				this.toggleOpenClose()
		},

		onClickArrow: function () {
			if (!this.headerClick)
				this.toggleOpenClose()
			// No need to call toggleOpenClose if this.headerClick is true, because
			// the click event on the dv-iconbutton will bubble up to the header,
			// where it will be handled by onClickHeader
		},

		onKeydown: function (e) {
			if (e.key == 'Enter' || e.key == ' ') {
				this.toggleOpenClose()
				e.preventDefault()
				e.stopPropagation()
			}	
		},

		toggleOpenClose () {
			let shouldClose = this.displayContent
			if (this.automatic) {
				this.displayContent = !this.displayContent	
			}
			this.$emit(shouldClose ? 'close' : 'open', this)
		},

		openPane: function () {
			this.displayContent = true
		},

		closePane: function () {
			this.displayContent = false
		},

		setRounded: function (rounded) {
			this.thisRounded = rounded
		},

		focus: function () {
			this.$el.focus()
		}

	}

}

</script>

<style lang="scss">

@import './base.scss';

.dv-accordion > .dv-collapsible-pane {
    border: 1px solid $border-color;
	
	&.rounded {
		border-radius: 8px;
		overflow: hidden;
	}

}	

.dv-collapsible-pane-head {
	display: flex;
	flex-direction: row;
	align-items: center;
	font-size: $font-size + 1;
	font-weight: 700;
	padding-left: 1em;
	padding-right: 0;
	cursor: pointer;
	position: relative;

	&:not(.closed) {

	}	

	&:hover {
		color: $color-primary;
	}

	&.focus {
		background-color: #f0f0f0;
	}

}


.dv-collapsible-pane:focus {
	outline: 0;
	position: relative;
	z-index: 101;
}	

.dv-collapsible-pane-content {
	box-sizing: border-box;
	max-height: 0px;
	overflow: hidden;
	background-color: white;

	transition-property: max-height;
	transition-timing-function: ease;
	transition-delay: 0s;
	transition-duration: 0.5s;
}


</style>