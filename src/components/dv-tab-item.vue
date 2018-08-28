<template>

	<div 
		class="tab-content" 
		:class="tabItemClass"
	>
    	<slot><div v-html="vHtml"></div></slot>
	</div>

</template>

<script>

export default {
	props: ['title', 'id', 'v-html'],

	computed: {
		tabItemClass: function () {
			if (this.active)
				return 'active'
			return ''
		},

		hasHtml: function () {
			return !this.html || this.html == ''
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
