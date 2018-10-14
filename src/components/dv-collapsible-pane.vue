<template>

	<div class="dv-collapsible-pane">
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
			<div v-if="content" v-html="content"></div>
			<slot></slot>
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

	props: ['title', 'content', 'open'],

	data: function () {
		return {
			displayContent: true
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
		contentStyle: function () {
			if (this.displayContent)
				return 'display:block'
			return ''
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
}

.dv-collapsible-pane-head {
	display: flex;
	flex-direction: row;
	align-items: center;
	background-color: #f0f0f0;
	font-size: 16px;
	font-weight: 700;
	padding-left: 1em;
	//padding-top: 0.25em;
	//padding-bottom: 0.25em;
	padding-right: 0;
}

.dv-collapsible-pane-content {
	display: none;
	background-color: white;
	padding: 1em;
}


</style>