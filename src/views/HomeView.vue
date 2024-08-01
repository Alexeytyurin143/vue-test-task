<template>
	<v-btn
		class="mt-5 ml-5"
		@click="openCreateDialog()"
		prepend-icon="mdi-plus"
		variant="tonal"
	>
		Создать заметку
	</v-btn>
	<NotesList />
	<CreateNoteDialog />
</template>

<script setup>
import CreateNoteDialog from '@/components/CreateNoteDialog.vue'
import NotesList from '@/components/NotesList.vue'
import { useNotesStore } from '@/stores/notes'
const { openCreateDialog } = useNotesStore()
</script>
