<template>
	<div class="widget" :style="computedStyles">
		<BridgeSheet class="widget-sheet">
			<slot />
		</BridgeSheet>
	</div>
</template>

<script>
import BridgeSheet from '/@/components/UIElements/Sheet.vue'

export default {
	components: {
		BridgeSheet,
	},
	props: {
		size: {
			type: String,
			default: 'md',
			validator: (size) => ['sm', 'md', 'lg', 'xl'].includes(size),
		},
		column: {
			type: Number,
		},
		row: {
			type: Number,
		},
	},
	computed: {
		computedStyles() {
			let aspectRatio = null
			let spanX = 1
			let spanY = 1

			switch (this.size) {
				case 'md': {
					spanX = 2
					spanY = 2
					break
				}
				case 'lg': {
					spanX = 3
					spanY = 2
					aspectRatio = '3 / 2'
					break
				}
				case 'xl': {
					spanX = 4
					spanY = 2
					aspectRatio = '4 / 2'
					break
				}
			}

			return {
				aspectRatio,
				gridColumn: this.column
					? `${this.column} / span ${spanX}`
					: `span ${spanX}`,
				gridRow: this.row
					? `${this.row} / span ${spanY}`
					: `span ${spanY}`,
			}
		},
	},
}
</script>

<style>
.widget {
	aspect-ratio: 1 / 1;
	align-self: stretch;

	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
}
.widget-sheet {
	overflow: hidden;
	margin: 4px;
	height: calc(100% - 8px);
	width: calc(100% - 8px);
}
</style>
