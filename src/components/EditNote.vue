<template>
	<v-card class="mx-md-auto mt-10 mx-2 mb-2" max-width="950">
		<v-form @submit.prevent>
			<v-container>
				<v-row>
					<v-col cols="12">
						<v-text-field
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
							/>
							<v-text-field
								hide-details
								label="Название задачи"
								v-model="task.name"
							/>
							<v-btn
								@click="deleteTask(note.id, task.id)"
								variant="plain"
								icon="mdi-delete"
							/>
						</div>
					</v-list-item>
				</v-list>
				<v-btn
					@click="addTask(note.id)"
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
						@click="router.push('/')"
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
import { useRoute, useRouter } from 'vue-router'
import ConfirmDialog from './ConfirmDialog.vue'
import { useConfirmStore } from '@/stores/confirm'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'

const route = useRoute()
const router = useRouter()
const { notes, editNote, deleteTask, deleteNote, addTask } = useNotesStore()
const note = notes.find(({ id }) => id == route.params.id)
const noteCopy = JSON.parse(JSON.stringify(note))

const confirmStore = useConfirmStore()
const { isConfirmed, confirmId } = storeToRefs(confirmStore)
const { openConfirmDialog } = confirmStore

watch(isConfirmed, (newValue, _) => {
	if (newValue && confirmId.value) {
		deleteNote(confirmId.value)
	} else if (newValue) {
		editNote(route.params.id, noteCopy)
	}
	router.push('/')
})
</script>
