<template>
	<Widget size="lg-sq" :column="$attrs.column" :row="$attrs.row">
		<h1>{{ t('welcome.recentFiles') }}</h1>
		<li
			v-for="file in files"
			:key="file.path"
			class="d-flex rounded-lg pa-1 clickable"
			v-ripple
			@click="openFile(file.path)"
		>
			<v-icon class="mr-1" :color="file.color || 'error'" medium>
				{{ file.icon }}
			</v-icon>
			<span class="primary-text">{{ file.name }}</span>
		</li>
	</Widget>
</template>

<script>
import { TranslationMixin } from '/@/components/Mixins/TranslationMixin'
import Widget from './Widget.vue'
import { App } from '/@/App'
import { ProjectMixin } from '/@/components/Mixins/Project'

export default {
	mixins: [TranslationMixin, ProjectMixin],
	components: { Widget },

	computed: {
		files() {
			if (!this.project) return []
			return this.project.recentFiles.elements
		},
	},
	methods: {
		async openFile(filePath) {
			const app = await App.getApp()
			const fileHandle = await app.fileSystem.getFileHandle(filePath)
			app.project.openFile(fileHandle)
		},
	},
}
</script>

<style scoped>
li {
	list-style-type: none;
}
</style>
