import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const NoteCardComp = ({ id, title, body, navigateToNotesComp }) => {
  return (
    <TouchableOpacity
      key={id.toString()}
      style={styles.container}
      onPress={() => navigateToNotesComp('updateScreen', id)}
    >
      <View style={styles.titleView}>
        <Text> {title} </Text>
      </View>
      <View style={styles.titleView}>
        <Text> {body} </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    marginHorizontal: 10,
  },
});

export default NoteCardComp;
