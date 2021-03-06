import { createNotification } from '../Notifications/create'
import { InformationWindow } from '../Windows/Common/Information/InformationWindow'
import { FileSystem } from './FileSystem'
import { isUsingFileSystemPolyfill, isUsingOriginPrivateFs } from './Polyfill'
import { App } from '/@/App'
import { basename } from '/@/utils/path'

export async function saveOrDownload(
	filePath: string,
	fileData: Uint8Array,
	fileSystem: FileSystem
) {
	const notification = createNotification({
		icon: 'mdi-export',
		color: 'success',
		textColor: 'white',
		message: 'general.successfulExport.title',
		isVisible: true,
		onClick: async () => {
			if (isUsingOriginPrivateFs || isUsingFileSystemPolyfill.value) {
				download(basename(filePath), fileData)
			} else {
				const app = await App.getApp()

				new InformationWindow({
					description: `[${app.locales.translate(
						'general.successfulExport.description'
					)}: "${filePath}"]`,
				})
			}

			notification.dispose()
		},
	})

	if (!isUsingOriginPrivateFs || isUsingFileSystemPolyfill.value) {
		await fileSystem.writeFile(filePath, fileData)
	}
}

export function download(fileName: string, fileData: Uint8Array) {
	const url = URL.createObjectURL(new Blob([fileData]))
	const a = document.createElement('a')
	a.download = fileName
	a.href = url
	a.click()

	URL.revokeObjectURL(url)
}
