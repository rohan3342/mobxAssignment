import { action, computed, makeObservable, observable } from 'mobx';

class NotesStore {
  constructor() {
    makeObservable(this, {
      notes: observable,
      addNotes: action,
      getNotes: action,
      updateNotes: action,
      removeNotes: action,
      getAllNotes: computed,
    });
  }
  notes = [
    {
      id: 1,
      title: 'Task 1',
      data: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    },
    {
      id: 2,
      title: 'Task 2',
      data: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    },
  ];

  get getAllNotes() {
    return this.notes;
  }

  addNotes(title, data) {
    const id = this.notes.length + 1;
    return this.notes = [...this.notes, { id, title, data }];
  }

  getNotes(id) {
    return this.notes.find(ele => ele.id === id);
  }

  updateNotes(id, title, data) {
    const newNotes = this.notes.map((ele) => ele.id === id ? { id, title, data } : ele);
    return this.notes = newNotes;
  }

  removeNotes(id) {
    return this.notes = this.notes.filter(item => item.id !== id);
  }

}

export default new NotesStore();
