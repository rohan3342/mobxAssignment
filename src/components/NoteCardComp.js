import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Platform } from 'react-native';

const NoteCardComp = ({ id, title, data, navigateToNotesComp, deleteNote }) => {
  return (
    <View style={styles.containerWrapper}>
      <TouchableOpacity
        key={id.toString()}
        style={styles.container}
        onPress={() => navigateToNotesComp('updateScreen', id)}
        onLongPress={() => deleteNote(id)}
      >
        <View style={styles.titleView}>
          <Text style={styles.titleTxt}>{title}</Text>
        </View>
        <View style={styles.titleView}>
          <Text style={styles.dataTxt}>{data}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  containerWrapper: {
    backgroundColor: '#fafafa',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#60DAC4',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  titleView: {
    marginVertical: 2,
  },
  titleTxt: {
    fontSize: 20,
  },
  dataTxt: {
    opacity: 0.8,
    fontSize: 15,
    fontWeight: '300',
  },
});

export default NoteCardComp;
