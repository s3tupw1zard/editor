<template>
	<Widget v-bind="$attrs" style="text-align: center">
		<Logo
			alt="Logo of bridge. v2"
			style="max-height: 100%; max-width: 100%"
		/>
	</Widget>
</template>

<script>
import Widget from './Widget.vue'
import Logo from '/@/components/UIElements/Logo.vue'

export default {
	components: { Widget, Logo },
}
</script>
