<template>
	<v-dialog v-model="isCreateDialogOpen" max-width="600">
		<v-card prepend-icon="mdi-note" title="Создание заметки">
			<v-form @submit.prevent="handleSubmit()">
				<v-card-text>
					<v-row>
						<v-col cols="12">
							<v-text-field
								v-model="noteName"
								label="Введите название заметки"
								:rules="rules"
							/>
						</v-col>
					</v-row>
				</v-card-text>

				<v-divider />

				<v-card-actions class="justify-end">
					<v-btn @click="closeCreateDialog()">Отмена</v-btn>

					<v-btn type="submit" color="primary" variant="tonal">
						Создать
					</v-btn>
				</v-card-actions>
			</v-form>
		</v-card>
	</v-dialog>
</template>

<script setup>
import { useNotesStore } from '@/stores/notes'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const noteName = ref('')

const rules = [
	(value) => {
		if (value) return true
		return 'Пожалуйста, введите название.'
	},
]

const notesStore = useNotesStore()

const { isCreateDialogOpen } = storeToRefs(notesStore)
const { closeCreateDialog, createNote } = notesStore

const handleSubmit = () => {
	createNote(noteName.value)
	noteName.value = ''
}
</script>
