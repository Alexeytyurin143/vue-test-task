<template>
	<v-dialog v-model="isConfirmDialogOpen" max-width="600">
		<v-card prepend-icon="mdi-note" title="Создание заметки">
			<v-card-text>{{ text }}</v-card-text>

			<v-divider />

			<v-card-actions class="justify-end">
				<v-btn @click="closeConfirmDialog()">Отмена</v-btn>

				<v-btn @click="confirm()" color="error">Подтвердить</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script setup>
import { useConfirmStore } from '@/stores/confirm'
import { storeToRefs } from 'pinia'
const confirmStore = useConfirmStore()

const { isConfirmDialogOpen } = storeToRefs(confirmStore)
const { closeConfirmDialog, confirm } = confirmStore

const props = defineProps({
	text: {
		required: false,
		type: String,
		default: 'Вы уверены?',
	},
})
</script>
