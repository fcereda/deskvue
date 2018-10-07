<template>

	<section 
		role="tabpanel"
		class="tab-content" 
		:class="tabItemClass"
	>
    	<slot><div v-html="vHtml"></div></slot>
	</section>

</template>

<script>

import utils from './utils.js'

export default {
	props: ['title', 'id', 'v-html', 'disabled'],

	computed: {
		tabItemClass: function () {
			if (this.active)
				return 'active'
			return ''
		},

		hasHtml: function () {
			return !this.html || this.html == ''
		},

		isDisabled: function () {
			return utils.isPropOn(this.disabled)
		}
	},

	data: function () {
		return {
			active: false
		}
	},

	mounted: function () {
		this.$parent.addTab(this)
	},

	beforeDestroy: function () {
		console.log('Vamos remover a tab ' + this.title)
		this.$parent.removeTab(this)
		//this.$parent.willRemoveTab()
	},

	destroyed: function () {
		//this.$parent.removedTab()
	}
}

</script>

<style>

.tab-content:not(.active) {
	display: none;
}

.tab-content.active {
	display: block;
}

</style>
