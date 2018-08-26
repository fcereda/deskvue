<template>

      <li class="dv-tab-item" tabindex="0"><slot></slot></li>

</template>

<script>

export default {
	props: ['active'],

	data: function () {
		return {}
	}
}

</script>