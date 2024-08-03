import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useConfirmStore } from './confirm'
import { useRoute, useRouter } from 'vue-router'

export const useNotesStore = defineStore('notes', () => {
	const findNoteIndex = (noteId) => {
		return notes.value.findIndex((note) => note.id == noteId)
	}
	const route = useRoute()
	const router = useRouter()
	const notes = ref(
		localStorage.getItem('notes')
			? JSON.parse(localStorage.getItem('notes'))
			: []
	)
	const note = ref(
		route.params.id
			? JSON.parse(
					JSON.stringify(notes.value[findNoteIndex(route.params.id)])
			  )
			: {}
	)
	const isCreateDialogOpen = ref(false)
	const historyPrev = ref([])
	const historyNext = ref([])
	const { closeConfirmDialog } = useConfirmStore()

	const addToHistory = (noteCopy) => {
		if (!noteCopy) {
			historyPrev.value.push(JSON.parse(JSON.stringify(note.value)))
		} else {
			historyPrev.value.push(noteCopy)
		}
	}

	const goToPrev = () => {
		const state = historyPrev.value.pop()
		historyNext.value.push(note.value)
		note.value = state
	}

	const goToNext = () => {
		const state = historyNext.value.pop()
		historyPrev.value.push(note.value)
		note.value = state
	}

	const clearHistory = () => {
		historyPrev.value = []
		historyNext.value = []
		note.value = {}
	}

	const saveLocal = () => {
		localStorage.setItem('notes', JSON.stringify(notes.value))
	}

	const closeCreateDialog = () => {
		isCreateDialogOpen.value = false
	}

	const openCreateDialog = () => {
		isCreateDialogOpen.value = true
	}

	const createNote = (name) => {
		const id = Date.now()
		notes.value.push({
			id,
			name,
			tasks: [],
		})
		note.value = notes.value[findNoteIndex(id)]
		router.push(`/note/${id}`)
		closeCreateDialog()
		saveLocal()
	}

	const deleteNote = (id) => {
		notes.value = notes.value.filter((note) => note.id !== id)
		closeConfirmDialog()
		saveLocal()
		clearHistory()
	}

	const cancelSaveNote = () => {
		closeConfirmDialog()
		clearHistory()
	}

	const editNote = () => {
		notes.value[findNoteIndex(note.value.id)] = note.value
		clearHistory()
		saveLocal()
	}

	const deleteTask = (taskId) => {
		note.value.tasks = note.value.tasks.filter((task) => task.id !== taskId)
	}

	const addTask = () => {
		note.value.tasks.push({
			id: Date.now(),
			name: '',
			checked: false,
		})
	}

	return {
		notes,
		isCreateDialogOpen,
		historyPrev,
		historyNext,
		note,
		closeCreateDialog,
		openCreateDialog,
		createNote,
		deleteNote,
		editNote,
		deleteTask,
		addTask,
		addToHistory,
		goToNext,
		goToPrev,
		saveLocal,
		cancelSaveNote,
	}
})
