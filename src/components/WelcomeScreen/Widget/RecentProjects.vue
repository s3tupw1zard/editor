<template>
	<Widget size="lg-sq" :column="$attrs.column" :row="$attrs.row">
		<h1>{{ t('welcome.recentProjects') }}</h1>
		<li
			v-for="project in projects"
			:key="project.name"
			class="d-flex rounded-lg pa-1 clickable"
			v-ripple
			@click="selectProject(project.path)"
		>
			<div class="d-flex align-center">
				<img
					v-if="project.imgSrc"
					:src="project.imgSrc"
					:alt="`${project.name} Logo`"
					draggable="false"
					class="mr-1 pack-icon"
				/>
				<span class="primary-text">{{ project.path }}</span>
			</div>
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

		await app.projectManager.fired
		this.projectManager = app.projectManager
	},
	data: () => ({
		projectManager: null,
	}),

	computed: {
		projects() {
			if (!this.projectManager) return []
			return this.projectManager.recentProjects.elements.filter(
				({ path }) => path !== this.projectManager.selectedProject
			)
		},
	},

	methods: {
		selectProject(projectName) {
			App.getApp().then((app) =>
				app.projectManager.selectProject(projectName)
			)
		},
	},
}
</script>

<style scoped>
li {
	list-style-type: none;
}

.pack-icon {
	height: 24px;
	image-rendering: pixelated;
}
</style>
