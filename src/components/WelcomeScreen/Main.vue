<template>
	<div class="widget-container pa-1">
		<LogoWidget size="lg-sq" :column="4" />

		<ExternalLink
			:row="4"
			:column="4"
			iconSrc="https://bedrock.dev/favicon/android-chrome-192x192.png"
			url="https://bedrock.dev"
			size="sm"
		/>
		<ExternalLink
			:row="4"
			:column="5"
			iconSrc="https://wiki.bedrock.dev/favicon.ico"
			url="https://wiki.bedrock.dev"
			size="sm"
		/>
		<ExternalLink
			:row="4"
			:column="6"
			iconSrc="https://minecraft.net/etc.clientlibs/minecraft/clientlibs/main/resources/img/minecraft-creeper-face.jpg"
			url="https://docs.microsoft.com/en-us/minecraft/creator/"
			size="sm"
		/>

		<QuickActions :row="6" :column="1" />
		<RecentFiles :row="6" :column="4" />
		<RecentProjects :row="6" :column="7" />
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
	grid-template-columns: repeat(4, 1fr);
	grid-template-rows: repeat(20, 1fr);
	grid-auto-columns: 0;
	grid-auto-rows: 0;
}

@media (min-width: 600px) {
	.widget-container {
		grid-template-columns: repeat(6, 1fr);
	}
}

@media (min-width: 1000px) {
	.widget-container {
		grid-template-columns: repeat(9, 1fr);
	}
}

@media (min-width: 1904px) {
	.widget-container {
		grid-template-columns: repeat(12, 1fr);
	}
}
</style>
