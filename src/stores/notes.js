import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useConfirmStore } from './confirm'
import { useRouter } from 'vue-router'

export const useNotesStore = defineStore('notes', () => {
	const notes = ref(
		localStorage.getItem('notes')
			? JSON.parse(localStorage.getItem('notes'))
			: []
	)
	const isCreateDialogOpen = ref(false)
	const history = ref([])
	const { closeConfirmDialog } = useConfirmStore()
	const router = useRouter()

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
		router.push(`/note/${id}`)
		closeCreateDialog()
		saveLocal()
	}

	const findNoteIndex = (noteId) => {
		return notes.value.findIndex((note) => note.id == noteId)
	}

	const deleteNote = (id) => {
		notes.value = notes.value.filter((note) => note.id !== id)
		closeConfirmDialog()
		saveLocal()
	}

	const editNote = (noteId, newNote) => {
		const index = findNoteIndex(noteId)
		notes.value[index] = newNote
		closeConfirmDialog()
		saveLocal()
	}

	const saveNote = () => {
		saveLocal()
		router.back()
	}

	const deleteTask = (noteId, taskId) => {
		const index = findNoteIndex(noteId)
		notes.value[index].tasks = notes.value[index].tasks.filter(
			(task) => task.id !== taskId
		)
	}

	const addTask = (noteId) => {
		const index = findNoteIndex(noteId)
		notes.value[index].tasks.push({
			id: Date.now(),
			name: '',
			checked: false,
		})
	}

	return {
		notes,
		isCreateDialogOpen,
		closeCreateDialog,
		openCreateDialog,
		createNote,
		deleteNote,
		editNote,
		saveNote,
		deleteTask,
		addTask,
	}
})
