<template>
	<v-card class="mx-md-auto mt-10 mx-2 mb-2" max-width="950">
		<v-form @submit.prevent>
			<v-container class="pa-6">
				<v-row class="d-flex ga-2">
					<v-btn
						icon="mdi-undo"
						variant="text"
						:disabled="!historyPrev.length"
						@click="goToPrev()"
					/>
					<v-btn
						icon="mdi-redo"
						variant="text"
						:disabled="!historyNext.length"
						@click="goToNext()"
					/>
				</v-row>
				<v-row>
					<v-col cols="12">
						<v-text-field
							@focus="makeCopy(note)"
							@blur="addToHistory(noteCopy)"
							v-model="note.name"
							label="Название заметки"
						/>
					</v-col>
				</v-row>
				<v-list>
					<v-list-subheader>Задачи</v-list-subheader>
					<v-list-item
						class="py-2"
						v-for="task in note.tasks"
						:key="task.id"
					>
						<div class="d-flex">
							<v-checkbox-btn
								density="compact"
								v-model="task.checked"
								class="flex-0-0"
								@click="addToHistory()"
							/>
							<v-text-field
								hide-details
								label="Название задачи"
								v-model="task.name"
								@focus="makeCopy(note)"
								@blur="addToHistory(noteCopy)"
							/>
							<v-btn
								@click="handleDeleteTask(task.id)"
								variant="plain"
								icon="mdi-delete"
							/>
						</div>
					</v-list-item>
				</v-list>
				<v-btn
					@click="handleAddTask()"
					prepend-icon="mdi-plus"
					class="mb-4"
					variant="text"
				>
					Добавить задачу
				</v-btn>
				<v-divider />
				<div
					class="d-flex justify-end ga-4 mt-4 flex-column-reverse flex-sm-row"
				>
					<v-btn
						class="mr-sm-auto"
						@click="openConfirmDialog(note.id)"
						color="error"
					>
						Удалить заметку
					</v-btn>
					<v-btn @click="openConfirmDialog()">Отмена</v-btn>
					<v-btn
						@click="handleSaveNote()"
						type="submit"
						color="success"
						>Сохранить</v-btn
					>
				</div>
			</v-container>
		</v-form>
	</v-card>
	<ConfirmDialog />
</template>

<script setup>
import { useNotesStore } from '@/stores/notes'
import { useRouter } from 'vue-router'
import ConfirmDialog from './ConfirmDialog.vue'
import { useConfirmStore } from '@/stores/confirm'
import { storeToRefs } from 'pinia'
import { onBeforeUnmount, onUnmounted, ref, watch } from 'vue'

const router = useRouter()
const notesStore = useNotesStore()
const noteCopy = ref({})

const { historyPrev, historyNext, note } = storeToRefs(notesStore)

const {
	editNote,
	deleteTask,
	deleteNote,
	addTask,
	addToHistory,
	goToNext,
	goToPrev,
	cancelSaveNote,
} = notesStore

const confirmStore = useConfirmStore()
const { isConfirmed, confirmId } = storeToRefs(confirmStore)
const { openConfirmDialog } = confirmStore

const makeCopy = (copy) => {
	noteCopy.value = JSON.parse(JSON.stringify(copy))
}

const handleAddTask = () => {
	addToHistory()
	addTask()
}

const handleDeleteTask = (taskId) => {
	addToHistory()
	deleteTask(taskId)
}

const handleSaveNote = () => {
	editNote()
	router.push('/')
}

const confirmLeave = (e) => {
	e.preventDefault()
	const decision = confirm('Вы хотите сохранить изменения перед выходом?')
	if (decision) {
		editNote()
	}
}

addEventListener('beforeunload', confirmLeave)
addEventListener('popstate', confirmLeave)

onUnmounted(() => {
	removeEventListener('beforeunload', confirmLeave)
	removeEventListener('popstate', confirmLeave)
})

watch(isConfirmed, (newValue, _) => {
	if (newValue && confirmId.value) {
		deleteNote(confirmId.value)
	} else if (newValue) {
		cancelSaveNote()
	}
	router.push('/')
})
</script>
