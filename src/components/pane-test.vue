<template>

	<div class="pane-test">

		<button @click="showSlidingPane = !showSlidingPane">Show pane</button>
		<br>

		<dv-sliding-pane :show="showSlidingPane">

			<div class="pane-test-content">
				Hello World!
			</div>

		</dv-sliding-pane>

	</div>

</template>

<script>

import dvSlidingPane from './dv-sliding-pane.vue'

export default {

	components: {
		dvSlidingPane
	},

	data: function () {
	    return {
	    	showSlidingPane: false
	    }
	}

}

</script>

<style lang="scss">

.pane-test {
	width: 300px;
	height: 300px;
	border: 1px solid #aaa;
}

.pane-test-content {
	width: 100px;
	height: 200px;
	background-color: yellow;
	padding: 16px;
}

</style>