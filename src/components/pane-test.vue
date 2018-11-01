<template>

	<div style="text-align:left">

		<button @click="showSlidingPane1 = !showSlidingPane1">Show horizontal left-to-right sliding pane</button>
		<button @click="showSlidingPane2 = !showSlidingPane2">Show horizontal right-to-left sliding pane</button>
		<button @click="showSlidingPane3 = !showSlidingPane3">Show vertical top-down pane</button>
		<button @click="showSlidingPane4 = !showSlidingPane4">Show vertical bottom-up pane</button>


		<br>

		<div class="pane-test">

			<dv-sliding-pane 
				:show="showSlidingPane1" 
				dock="left"
				class="sliding-pane-test">

				<div class="pane-test-content left">
					This is the left pane
				</div>

			</dv-sliding-pane>

			<dv-sliding-pane 
				:show="showSlidingPane2" 
				dock="right"
				:floating="false"
				class="sliding-pane-test">

				<div class="pane-test-content right">
					This is the right pane
				</div>

			</dv-sliding-pane>

			This is the regular content of this frame. Yada yada yada.



		</div>

		<br><br>

		<div class="pane-test">	

			<dv-sliding-pane 
				:show="showSlidingPane3" 
				dock="top"
				class="sliding-pane-test">

				<div class="pane-test-content top">
					This is the top-docked pane
				</div>

			</dv-sliding-pane>

			This is the content of this panel. Lorem ipsun.

			<dv-sliding-pane 
				:show="showSlidingPane4"
				:floating="false" 
				dock="bottom"
				class="sliding-pane-test">

				<div class="pane-test-content bottom">
					This pane is at the bottom
				</div>

			</dv-sliding-pane>


		</div>

		<br><br><button @click="showSlidingPane5 = !showSlidingPane5">Invisibie container</button><br>

		<div style="width:400px; height:auto; position: relative; background-color: yellow">
			<dv-sliding-pane 
				:show="showSlidingPane5" 
				dock="top"
				:floating="false"
				class="sliding-pane-test">

				<div class="pane-test-content top">
					This pane is at the bottom
				</div>

			</dv-sliding-pane>
		</div>	

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
	    	showSlidingPane1: false,
	    	showSlidingPane2: false,
	    	showSlidingPane3: false,
	    	showSlidingPane4: false,
	    	showSlidingPane5: false	    	
	    }
	}

}

</script>

<style lang="scss">

.pane-test {
	width: 400px;
	height: 300px;
	border: 1px solid #aaa;
	position: relative;
	background: #eef;
}

.sliding-pane-test {
	height: 300px;
}

.pane-test-content {
	box-sizing: border-box;
	width: 150px;
	height: 100%;
	background-color: white;
	padding: 16px;

	&.left {
		border-right: 1px solid #aaa;
	}

	&.right {
		border-left: 1px solid #aaa;
	}

	&.top {
		width: 400px;
		height: 100px;
		border-bottom: 1px solid #aaa;
	}

	&.bottom {
		width: 400px;
		height: 100px;
		border-top: 1px solid #aaa;
	}
}

</style>