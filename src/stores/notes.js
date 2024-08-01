import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useConfirmStore } from './confirm'
import { useRouter } from 'vue-router'

export const useNotesStore = defineStore('notes', () => {
	const notes = ref([
		{
			id: 1,
			name: 'Note 1',
			tasks: [
				{
					id: 1,
					name: 'Task 1',
					checked: true,
				},
				{
					id: 2,
					name: 'Task 2',
					checked: true,
				},
				{
					id: 3,
					name: 'Task 3',
					checked: false,
				},
				{
					id: 4,
					name: 'Task 4',
					checked: false,
				},
			],
		},
		{
			id: 2,
			name: 'Note 2',
			tasks: [
				{
					id: 1,
					name: 'Task 1',
					checked: false,
				},
				{
					id: 2,
					name: 'Task 2',
					checked: true,
				},
				{
					id: 3,
					name: 'Task 3',
					checked: true,
				},
			],
		},
		{
			id: 3,
			name: 'Note 3',
			tasks: [
				{
					id: 1,
					name: 'Task 1',
					checked: true,
				},
				{
					id: 2,
					name: 'Task 2',
					checked: false,
				},
				{
					id: 3,
					name: 'Task 3',
					checked: false,
				},
			],
		},
	])
	const isCreateDialogOpen = ref(false)
	const history = ref([])
	const { closeConfirmDialog } = useConfirmStore()
	const router = useRouter()

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
	}

	const findNoteIndex = (noteId) => {
		return notes.value.findIndex((note) => note.id == noteId)
	}

	const deleteNote = (id) => {
		notes.value = notes.value.filter((note) => note.id !== id)
		closeConfirmDialog()
	}

	const editNote = (noteId, newNote) => {
		const index = findNoteIndex(noteId)
		notes.value[index] = newNote
		closeConfirmDialog()
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
		deleteTask,
		addTask,
	}
})
