<template>
	<div class="widget-container pa-1">
		<LogoWidget size="sm" />
		<LogoWidget size="sm" :row="2" />
		<LogoWidget size="sm" :row="3" />
		<LogoWidget size="md" />
		<LogoWidget size="sm" :row="3" :column="2" />
		<LogoWidget size="sm" :row="3" :column="3" />
		<QuickActions />
		<LogoWidget size="xl" />
		<RecentFiles />
		<RecentProjects />
		<ExternalLink
			iconSrc="https://bedrock.dev/favicon/android-chrome-192x192.png"
			url="https://bedrock.dev"
			size="sm"
		/>
		<ExternalLink
			iconSrc="https://wiki.bedrock.dev/favicon.ico"
			url="https://wiki.bedrock.dev"
			size="sm"
		/>
		<ExternalLink
			iconSrc="https://minecraft.net/etc.clientlibs/minecraft/clientlibs/main/resources/img/minecraft-creeper-face.jpg"
			url="https://docs.microsoft.com/en-us/minecraft/creator/"
			size="sm"
		/>
	</div>
</template>

<script>
import { TranslationMixin } from '/@/components/Mixins/TranslationMixin.ts'
import ActionViewer from '/@/components/Actions/ActionViewer.vue'
import { App } from '/@/App.ts'
import { ProjectMixin } from '/@/components/Mixins/Project.ts'

import LogoWidget from './Widget/LogoWidget.vue'
import QuickActions from './Widget/QuickActions.vue'
import RecentFiles from './Widget/RecentFiles.vue'
import RecentProjects from './Widget/RecentProjects.vue'
import ExternalLink from './Widget/ExternalLink.vue'

export default {
	name: 'welcome-screen',
	mixins: [TranslationMixin, ProjectMixin],
	components: {
		ActionViewer,
		LogoWidget,
		QuickActions,
		RecentFiles,
		RecentProjects,
		ExternalLink,
	},

	async mounted() {
		const app = await App.getApp()
		const toLoad = [
			'bridge.action.newProject',
			'bridge.action.newFile',
			'bridge.action.searchFile',
			'bridge.action.openSettings',
		]
		this.actions = toLoad.map((l) => app.actionManager.state[l])

		await app.projectManager.fired
		this.projectManager = app.projectManager
	},

	data: () => ({
		actions: [],
		projectManager: null,
		maySwitchProjects: true,
	}),
	computed: {
		files() {
			if (!this.project) return []
			return this.project.recentFiles.elements
		},
		projects() {
			if (!this.projectManager) return []
			return this.projectManager.recentProjects.elements.filter(
				({ path }) => path !== this.projectManager.selectedProject
			)
		},
	},
	methods: {
		async openFile(filePath) {
			const app = await App.getApp()
			const fileHandle = await app.fileSystem.getFileHandle(filePath)
			app.project.openFile(fileHandle)
		},
		selectProject(projectName) {
			App.getApp().then((app) =>
				app.projectManager.selectProject(projectName)
			)
		},
	},
}
</script>

<style scoped>
.widget-container {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(85px, 1fr));
}
</style>
