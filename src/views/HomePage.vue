<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Inbox</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding-right">
      <ion-refresher slot="fixed" @ionRefresh="refresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Inbox</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-searchbar v-model="searchQuery"></ion-searchbar>

      <ion-list>
        <MessageListItem 
          v-for="message in filteredMessages" 
          :key="message.id" 
          :message="message" 
          @messageClick="markMessageAsReadAndNavigate"
          @deleteMessage="handleDeleteMessage"
        />
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  IonSearchbar,
} from '@ionic/vue';
import MessageListItem from '@/components/MessageListItem.vue';
import { getMessages, Message } from '@/data/messages';
import { ref, computed } from 'vue';
import router from '@/router';

const messages = ref<Message[]>(getMessages());
const searchQuery = ref<string>('');

const filteredMessages = computed(() => {
  if (!searchQuery.value) {
    return messages.value;
  } else {
    const query = searchQuery.value.toLowerCase();
    return messages.value.filter(
      (message) => message.content.toLowerCase().includes(query)
    );
  }
});

const markMessageAsReadAndNavigate = (id: number) => {
  const message = messages.value.find((msg) => msg.id === id);
  if (message && !message.read) {
    message.read = true;
    router.push({ name: 'view-message', params: { id: message.id.toString() } });
  }
};

const refresh = (ev: CustomEvent) => {
  setTimeout(() => {
    ev.detail.complete();
  }, 3000);
};

const handleDeleteMessage = (id: number) => {
  const index = messages.value.findIndex((msg) => msg.id === id);
  if (index !== -1) {
    messages.value.splice(index, 1);
  }
};
</script>


<style scoped lang="scss">
.input-search {
  border-radius: 20px;
  border: 1px solid #b6b6b6;
  padding: 0 1rem !important;
  margin: 20px !important;
}
</style>