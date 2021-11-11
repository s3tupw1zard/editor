<template>
	<Widget
		v-bind="$attrs"
		:clickable="true"
		@click.native="onClick"
		style="text-align: center"
	>
		<img
			:src="iconSrc"
			:alt="`Visit ${this.url}`"
			class="rounded-lg"
			style="height: 100%; width: 100%"
			draggable="false"
		/>
	</Widget>
</template>

<script>
import Widget from './Widget.vue'
import { App } from '/@/App'
import Logo from '/@/components/UIElements/Logo.vue'

export default {
	components: { Widget, Logo },
	props: {
		iconSrc: String,
		url: String,
	},
	methods: {
		onClick() {
			App.openUrl(this.url)
		},
	},
}
</script>

<style scoped>
img {
	image-rendering: pixelated;
}
</style>
