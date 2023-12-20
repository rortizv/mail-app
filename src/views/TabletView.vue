<template>
  <ion-row class="main-row">
    <ion-col size="4">
      <ion-page>
        <ion-header>
          <ion-toolbar>
            <ion-title>Inbox</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true" class="ion-padding-right content">
          <ion-refresher slot="fixed" @ionRefresh="refresh($event)">
            <ion-refresher-content></ion-refresher-content>
          </ion-refresher>

          <ion-searchbar v-model="searchQuery"></ion-searchbar>

          <ion-list>
            <MessageListItem 
              v-for="message in filteredMessages" 
              :key="message.id" 
              :message="message" 
              @messageClick="showMessageDetail(message)"
              @deleteMessage="handleDeleteMessage"
            />
          </ion-list>
        </ion-content>
      </ion-page>
    </ion-col>
    <ion-col size="8">
      <ion-page v-if="selectedMessage">
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-back-button default-href="/"></ion-back-button>
            </ion-buttons>
            <ion-title>Message Detail</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
          <ion-item>
            <ion-icon aria-hidden="true" :icon="personCircle" color="primary"></ion-icon>
            <ion-label class="ion-text-wrap">
              <h2>
                {{ selectedMessage.fromName }}
                <span class="date">
                  <ion-note>{{ selectedMessage.date }}</ion-note>
                </span>
              </h2>
              <h3>To: <ion-note>Me</ion-note></h3>
            </ion-label>
          </ion-item>

          <div class="ion-padding">
            <h1>{{ selectedMessage.subject }}</h1>
            <p>
              {{ selectedMessage.content }}
            </p>
          </div>
        </ion-content>
      </ion-page>
    </ion-col>
  </ion-row>
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
  IonItem,
  IonIcon,
  IonLabel,
  IonNote
} from '@ionic/vue';
import MessageListItem from '@/components/MessageListItem.vue';
import { getMessages, Message } from '@/data/messages';
import { personCircle } from 'ionicons/icons';
import { ref, computed } from 'vue';


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

const selectedMessage = ref<Message | null>(null);

const showMessageDetail = (message: Message) => {
  if (selectedMessage.value === message) {
    selectedMessage.value = null;
  } else {
    selectedMessage.value = message;
    if (!message.read) {
      message.read = true;
    }
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
    selectedMessage.value = null;
  }
};
</script>


<style scoped lang="scss">
.main-row {
  height: 100vh;
}
</style>