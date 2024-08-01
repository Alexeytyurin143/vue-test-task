<template>
	<v-app>
		<AppHeader />
		<v-main>
			<RouterView />
		</v-main>
	</v-app>
</template>

<script setup>
import { RouterView } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
</script>

<style scoped></style>
