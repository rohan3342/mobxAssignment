import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import NoteCardComp from '../components/NoteCardComp';
import { inject, observer } from 'mobx-react';

@inject('noteStore')
@observer
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
  }

  renderNotes = ({ item }) => {
    return <NoteCardComp
      key={item.id.toString()}
      id={item.id}
      title={item.title}
      body={item.body}
      navigateToNotesComp={this.navigateToNotesComp}
    />;
  };

  navigateToNotesComp = (titleType, id) => {
    this.navigation.navigate('NoteScreen', { titleType, id })
  }

  emptyNotes = () => {
    return (
      <View style={styles.emptyNoteListView}>
        <Text style={styles.emptyNoteTxt}>
          You do not have any notes!
      </Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerView}>
          <Text style={styles.headerTxt}>HomeScreen</Text>
        </View>
        <View style={styles.notesWrapperView}>
          {this.props.noteStore.getAllNotes.length === 0 ?
            this.emptyNotes()
            : (<FlatList
              data={this.props.noteStore.getAllNotes}
              keyExtractor={item => item.id}
              renderItem={this.renderNotes}
            />)
          }
        </View>
        <View style={styles.addBtnWrapperView}>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => this.navigation.navigate('NoteScreen', { titleType: 'addScreen' })}>
            <Text style={styles.addBtnTxt}>+ Add New Note</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerView: {
    backgroundColor: '#60DAC4',
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  headerTxt: {
    fontSize: 22,
    color: '#333',
  },
  notesWrapperView: {
    flex: 1,
    marginVertical: 10,
  },
  addBtnWrapperView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  addBtn: {
    marginHorizontal: 20,
    marginVertical: 5,
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: '#60DAC4',
    borderRadius: 20,
  },
  addBtnTxt: {
    fontSize: 16,
    color: '#333',
  },
  emptyNoteListView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyNoteTxt: {
    fontSize: 18,
    color: '#222',
  },
});

export default HomeScreen;
