export interface Message {
  id: number;
  fromName: string;
  date: string;
  subject: string;
  content: string;
}

const messages: Message[] = [
  {
    id: 0,
    fromName: 'Matt Chorsey',
    date: '9:32 AM',
    subject: 'New event: Trip to Vegas',
    content: 'Hey, I\'m going to Vegas next month and wondering if you are interested in going. We are going to have a lot of fun!'
  },
  {
    id: 1,
    fromName: 'Lauren Ruthford',
    date: '6:12 AM',
    subject: 'Long time no chat',
    content: 'Hey, how have you been? I\'m back in town and would love to catch up if you have time.'
  },
  {
    id: 2,
    fromName: 'Jordan Firth',
    date: '4:55 AM',
    subject: 'Report Results',
    content: 'Hey, I\'m sending you the report results. Please review it and let me know if you have any questions.'
  },
  {
    id: 3,
    fromName: 'Bill Thomas',
    date: 'Yesterday',
    subject: 'The situation',
    content: 'Hey, I\'m facing a situation and I wanted to discuss it with you. Can we meet up sometime?'
  },
  {
    id: 4,
    fromName: 'Joanne Pollan',
    date: 'Yesterday',
    subject: 'Updated invitation: Swim lessons',
    content: 'Hey, I wanted to let you know that there have been some updates to the swim lessons invitation. Please take a look at the revised details.'
  },
  {
    id: 5,
    fromName: 'Andrea Cornerston',
    date: 'Yesterday',
    subject: 'Last minute ask',
    content: 'Hey, I have a last-minute request and I was wondering if you could help me out. Let me know if you are available.'
  },
  {
    id: 6,
    fromName: 'Moe Chamont',
    date: 'Last Week',
    subject: 'Family Calendar - Version 1',
    content: 'Hey, I have created the first version of the family calendar. Take a look and let me know if you have any suggestions or changes.'
  },
  {
    id: 7,
    fromName: 'Kelly Richardson',
    date: 'Last Week',
    subject: 'Placeholder Headhots',
    content: 'Hey, I need your help with the placeholder headshots. Can you please provide me with some images?'
  }
];

export const getMessages = () => messages;

export const getMessage = (id: number) => messages.find(m => m.id === id);