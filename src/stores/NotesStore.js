import { action, computed, makeObservable, observable } from 'mobx';

class NotesStore {
  constructor() {
    makeObservable(this, {
      notes: observable,
      addNotes: action,
      getNotes: action,
      updateNotes: action,
      getAllNotes: computed,
    });
  }
  notes = [
    {
      id: 1,
      title: 'T1',
      body: 'B1',
    },
    {
      id: 2,
      title: 'T2',
      body: 'B2',
    },
    {
      id: 3,
      title: 'T3',
      body: 'B3',
    },
  ];

  addNotes(title, body) {
    const id = this.notes.length + 1;
    this.notes.push({ id, title, body });
  }

  get getAllNotes() {
    return this.notes;
  }

  updateNotes(id, title, body) {
    //console.log(id, title);
    this.notes.id = { title, body };
    console.log(this.notes.id);
  }

  getNotes(id) {
    const data = this.notes.find(ele => ele.id === id);
    return data;
  }
}

export default new NotesStore();
