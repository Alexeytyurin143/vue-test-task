import HomeView from '@/views/HomeView.vue'
import NoteView from '@/views/NoteView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
		},
		{
			path: '/note/:id',
			name: 'note',
			component: NoteView,
		},
	],
})

export default router
