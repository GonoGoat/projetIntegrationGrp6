import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

class Test extends React.Component {
  render() {
    return (
      <View style={styles.main_container}>
        <Text>Détail des portes</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  }
})

export default Test
