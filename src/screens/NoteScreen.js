import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { inject, observer } from 'mobx-react';

@inject('noteStore')
@observer
class NoteScreen extends Component {
  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
    this.titleType = this.props.route.params.titleType;
    this.id = this.props.route.params.id;
    this.state = {
      title: '',
      body: '',
      titleType: '',
    };
  }

  changeTitle = title => {
    this.setState({ title });
  }

  changeBody = body => {
    this.setState({ body });
  }

  setNotes = async () => {
    const { title, body } = this.state;
    if (this.titleType === 'addScreen') {
      this.props.noteStore.addNotes(title, body);
    }
    if (this.titleType === 'updateScreen') {
      this.props.noteStore.updateNotes(this.id, title, body);
    }
  }

  setTitleType = () => {
    if (this.titleType === 'addScreen') {
      this.setState({ titleType: 'Add a New Note' });
    }
    if (this.titleType === 'updateScreen') {
      const { title, body } = this.props.noteStore.getNotes(this.id);
      this.setState({ titleType: 'Edit Note' });
      this.setState({ title, body });
    }
  }

  componentDidMount() {
    this.setTitleType();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerView}>
          <Text style={styles.headerTxt}>{this.state.titleType}</Text>
          <TouchableOpacity
            style={styles.crossBtn}
            onPress={() => this.navigation.navigate('HomeScreen')}>
            <Text style={styles.crossBtnTxt}>x</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.txtInput}
            placeholder="Title"
            value={this.state.title}
            onChangeText={text => this.changeTitle(text)}
          />
          <TextInput
            multiline
            maxLength={500}
            style={[styles.txtInput, styles.noteInput]}
            placeholder="Enter Note"
            value={this.state.body}
            onChangeText={text => this.changeBody(text)}
          />
        </View>
        <View style={styles.addBtnWrapperView}>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => {
              this.setNotes();
              this.navigation.navigate('HomeScreen');
            }}>
            <Text style={styles.addBtnTxt}>Save</Text>
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
    paddingVertical: 15,
  },
  headerTxt: {
    fontSize: 22,
    color: '#333',
  },
  crossBtn: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 15,
    height: 30,
    width: 30,
    padding: 1,
    alignContent: 'center',
    right: 10,
  },
  crossBtnTxt: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
  },
  inputWrapper: {
    flex: 1,
    marginVertical: 10,
    alignItems: 'center',
  },
  txtInput: {
    fontSize: 16,
    borderColor: '#60DAC4',
    borderWidth: 1,
    width: '90%',
    height: 50,
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    textAlign: 'justify',
  },
  noteInput: {
    height: 200,
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
});

export default NoteScreen;
