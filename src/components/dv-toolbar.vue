<template>

	<header>
		<div class="dv-toolbar">

			<slot></slot>

		</div>
	</header>

</template>

<script>

export default {
	data: function () {
	    return {}
	}
}

</script>

<style lang="scss">

@import './base.scss';

.dv-toolbar {
	box-sizing: border-box;
	display: flex;
	align-items: center;
	background-color: white;
	height: 49px;
	position: absolute;
	top: 0px;
	left:0px;
	right: 0px;
	border-bottom: 1px solid $border-color;
	--topbar-color: firebrick;
	text-align:left;
	//padding-top: 8px;
	//padding-left: 8px;
	//padding-right: 8px;
	border-top: 6px solid var(--topbar-color);

	&:not(.topbar) {
		--topbar-color: #888;
	}

/*

	&.topbar:after {
	  content: "";
	  position: absolute;
	  left: 0;
	  width: 100%;
	  top: 0;
	  box-sizing: border-box;
	  border-top: 6px solid var(--topbar-color);
	}

*/

}

</style>