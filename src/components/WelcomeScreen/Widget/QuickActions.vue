<template>
	<Widget size="lg-sq" :column="$attrs.column" :row="$attrs.row">
		<h1>{{ t('welcome.quickActions') }}</h1>
		<li
			v-for="action in actions"
			:key="action.id"
			class="rounded-lg pa-1 clickable d-flex align-center"
			v-ripple
			@click="() => action.trigger()"
		>
			<v-icon class="mr-1" color="accent" medium>{{
				action.icon
			}}</v-icon>
			<span color="text--primary">{{ t(action.name) }}</span>

			<v-spacer />
			<span class="text--secondary" v-if="action.keyBinding">
				{{ action.keyBinding.toStrKeyCode() }}
			</span>
		</li>
	</Widget>
</template>

<script>
import { TranslationMixin } from '/@/components/Mixins/TranslationMixin'
import Widget from './Widget.vue'
import { App } from '/@/App'

export default {
	mixins: [TranslationMixin],
	components: { Widget },

	async mounted() {
		const app = await App.getApp()
		const toLoad = [
			'bridge.action.newProject',
			'bridge.action.newFile',
			'bridge.action.searchFile',
			'bridge.action.openSettings',
		]

		this.actions = toLoad.map((l) => app.actionManager.state[l])
	},
	data: () => ({
		actions: [],
	}),
}
</script>

<style scoped>
li {
	list-style-type: none;
}
</style>
