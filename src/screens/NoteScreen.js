import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { inject, observer } from 'mobx-react';
import { saveActive, saveInActive } from '../assets/index';

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
      data: '',
      titleType: '',
      txtInputTitle: false,
      txtInputData: false,
    };
  }

  changeTitle = title => {
    this.setState({ title });
  }

  changedata = data => {
    this.setState({ data });
  }

  setNotes = async () => {
    const { title, data } = this.state;
    if (this.titleType === 'addScreen') {
      this.props.noteStore.addNotes(title, data);
    }
    if (this.titleType === 'updateScreen') {
      this.props.noteStore.updateNotes(this.id, title, data);
    }
  }

  setTitleType = () => {
    if (this.titleType === 'addScreen') {
      this.setState({ titleType: 'Add a New Note' });
    }
    if (this.titleType === 'updateScreen') {
      const { title, data } = this.props.noteStore.getNotes(this.id);
      this.setState({ titleType: 'Edit Note' });
      this.setState({ title, data });
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
            placeholder="Title"
            value={this.state.title}
            onChangeText={text => this.changeTitle(text)}
            onFocus={() => this.setState({ txtInputTitle: true })}
            onBlur={() => this.setState({ txtInputTitle: false })}
            style={[styles.txtInput,
            this.state.txtInputTitle ? styles.activeInput : styles.inActiveInput]}
          />
          <TextInput
            multiline
            maxLength={500}
            placeholder="Enter Note"
            value={this.state.data}
            onChangeText={text => this.changedata(text)}
            onFocus={() => this.setState({ txtInputData: true })}
            onBlur={() => this.setState({ txtInputData: false })}
            style={[styles.txtInput, styles.noteInput,
            this.state.txtInputData ? styles.activeInput : styles.inActiveInput]}
          />
        </View>
        <View style={styles.addBtnWrapperView}>
          <TouchableOpacity
            style={[styles.addBtn]}
            onPress={() => {
              this.setNotes();
              this.navigation.navigate('HomeScreen');
            }}>
            <Image
              style={styles.saveIcon}
              source={this.state.title.length > 0 ? saveActive : saveInActive} />
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
    backgroundColor: 'rgba(0,0,0,0.3)',
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
    fontSize: 18,
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
  activeInput: {
    borderWidth: 2,
    borderColor: '#60DAC4',
  },
  inActiveInput: {
    borderWidth: 1,
    borderColor: '#ccc',
  },
  addBtnWrapperView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  addBtn: {
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 20,
  },
  saveIcon: {
    height: 75,
    width: 75
  },
});

export default NoteScreen;
