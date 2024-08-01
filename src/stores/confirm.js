import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConfirmStore = defineStore('confirm', () => {
	const isConfirmDialogOpen = ref(false)
	const confirmId = ref(null)
	const isConfirmed = ref(false)

	const confirm = () => {
		isConfirmed.value = true
	}

	const closeConfirmDialog = () => {
		isConfirmDialogOpen.value = false
		isConfirmed.value = false
		confirmId.value = null
	}

	const openConfirmDialog = (id) => {
		isConfirmDialogOpen.value = true
		confirmId.value = id
	}

	return {
		isConfirmDialogOpen,
		isConfirmed,
		confirmId,
		confirm,
		closeConfirmDialog,
		openConfirmDialog,
	}
})
