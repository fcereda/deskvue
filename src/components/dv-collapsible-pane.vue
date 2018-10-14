<template>

	<div class="dv-collapsible-pane" :class="divClass">
		<div>
			<div v-if="title" class="dv-collapsible-pane-head">
				<span style="text-align:left;vertical-align:text-top;">{{ title }}</span>
				<span style="flex:1;">&nbsp;</span>
				<span  style="vertical-align:text-top;" >
					<dv-iconbutton 
						link 
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

	props: ['title', 'content', 'open', 'rounded'],

	data: function () {
		return {
			displayContent: this.open,
			contentHeight: 0,
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
				rounded: 'rounded',
				closed: !this.displayContent
			}, this)
		},

		contentStyle: function () {
			console.log('alterou this.diplayContent')
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
		onClickArrow: function () {
			this.displayContent = !this.displayContent	
			this.$emit(this.displayContent ? 'open' : 'close', this)
		}
	}

}

</script>

<style lang="scss">

@import './base.scss';

.dv-collapsible-pane {
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
	background-color: #f0f0f0;
	font-size: $font-size + 1;
	font-weight: 700;
	padding-left: 1em;
	padding-right: 0;

/*

	&.rounded {
		border-top-left-radius: 8px;
		border-top-right-radius: 8px;
	}

*/	
}

/*

.dv-collapsible-pane.closed > .dv-collapsible-pane-head.rounded {
	border-bottom-left-radius: 8px;
	border-bottom-right-radius: 8px;
}

*/

.dv-collapsible-pane-content {
	box-sizing: border-box;
	max-height: 0px;
	overflow: hidden;
	background-color: white;

	transition-property: max-height;
	transition-timing-function: ease;
	transition-delay: 0s;
	transition-duration: 0.5s;

	&.rounded {
		border-bottom-left-radius: 8px;
		border-bottom-right-radius: 8px;
	}

}


</style>