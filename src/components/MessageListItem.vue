<template>
  <ion-item-sliding>
    <ion-item-options side="start">
      <ion-item-option color="primary" @click="notRead">Not read</ion-item-option>
      <ion-item-option color="tertiary">Remind me</ion-item-option>
    </ion-item-options>

    <ion-item v-if="message" :detail="false" class="list-item" @click="handleMessageClick">
      <div slot="start" :class="!message.read ? 'dot dot-unread' : 'dot'"></div>
      <ion-label class="ion-text-wrap">
        <h2 class="ion-text-wrap">
          {{ message.fromName }}
          <span class="date">
            <ion-note>{{ message.date }}</ion-note>
            <ion-icon aria-hidden="true" :icon="chevronForward" size="small" v-if="isIos()"></ion-icon>
          </span>
        </h2>
        <h3>{{ message.subject }}</h3>
        <p class="ion-text-wrap">
          {{message.content}}
        </p>
      </ion-label>
    </ion-item>

    <ion-item-options>
      <ion-item-option color="light">More</ion-item-option>
      <ion-item-option color="danger" @click="confirmDelete">Delete</ion-item-option>
      <ion-item-option color="tertiary">Archive</ion-item-option>
    </ion-item-options>
  </ion-item-sliding>
</template>

<script setup lang="ts">
import { alertController, IonIcon, IonItem, IonLabel, IonNote } from '@ionic/vue';
import { chevronForward } from 'ionicons/icons';
import { defineProps, defineEmits } from 'vue';
import { Message } from '@/data/messages';

const props = defineProps({
  message: Object as () => Message,
});

const emits = defineEmits(['messageClick', 'deleteMessage', 'updateMessage']);

const handleMessageClick = () => {
  emits('messageClick', props.message?.id);
};

const isIos = () => {
  const win = window as any;
  return win && win.Ionic && win.Ionic.mode === 'ios';
};

const confirmDelete = async () => {
  const alert = await alertController.create({
    header: 'Confirm Delete',
    message: 'Are you sure you want to delete this message?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
      },
      {
        text: 'Delete',
        cssClass: 'danger',
        handler: () => {
          emits('deleteMessage', props.message?.id);
        },
      },
    ],
  });

  await alert.present();
};

const notRead = () => {
  emits('updateMessage', { ...props.message, read: true });
};
</script>

<style scoped>
.list-item {
  --padding-start: 0;
  --inner-padding-end: 0;
}

.list-item ion-label {
  margin-top: 12px;
  margin-bottom: 12px;
}

.list-item h2 {
  font-weight: 600;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.list-item p {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  max-height: calc(2 * 1.4em);
  line-height: 1.4em;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  max-lines: 2;
}

.list-item .date {
  align-items: center;
  display: flex;
}

.list-item ion-icon {
  color: #c9c9ca;
}

.list-item ion-note {
  font-size: 0.9375rem;
  margin-right: 8px;
  font-weight: normal;
}

.list-item ion-note.md {
  margin-right: 14px;
}

.list-item .dot {
  display: block;
  height: 12px;
  width: 12px;
  border-radius: 50%;
  align-self: start;
  margin: 16px 10px 16px 16px;
}

.list-item .dot-unread {
  background: var(--ion-color-primary);
}
</style>
