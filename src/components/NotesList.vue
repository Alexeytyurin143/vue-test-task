<template>
	<v-list lines="three">
		<v-list-item v-for="note in notes" :key="note.title">
			<v-list-item-title>{{ note.name }}</v-list-item-title>
			<v-list-item-subtitle>
				<v-list density="compact">
					<v-list-item v-for="task in note.tasks.slice(0, 3)">
						<v-list-item-title
							:class="
								task.checked && 'text-decoration-line-through'
							"
						>
							{{ task.name }}
						</v-list-item-title>
					</v-list-item>
					<v-list-item v-if="note.tasks.length > 3">
						<v-list-item-title>...</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-list-item-subtitle>
			<v-btn
				@click="handleEdit(note)"
				variant="plain"
				icon="mdi-pencil"
			/>
			<v-btn
				variant="plain"
				icon="mdi-delete"
				@click="openConfirmDialog(note.id)"
			/>
			<v-divider class="mt-5" />
		</v-list-item>
	</v-list>
	<ConfirmDialog />
</template>

<script setup>
import { useConfirmStore } from '@/stores/confirm'
import ConfirmDialog from './ConfirmDialog.vue'
import { useNotesStore } from '@/stores/notes'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const notesStore = useNotesStore()
const { notes, note } = storeToRefs(notesStore)
const { deleteNote } = notesStore

const confirmStore = useConfirmStore()
const { isConfirmed, confirmId } = storeToRefs(confirmStore)
const { openConfirmDialog } = confirmStore

const handleEdit = (noteToEdit) => {
	note.value = JSON.parse(JSON.stringify(noteToEdit))
	router.push(`/note/${noteToEdit.id}`)
}

watch(isConfirmed, (newValue, _) => {
	if (newValue) {
		deleteNote(confirmId.value)
	}
})
</script>
