import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

class Page3 extends React.Component {
  render() {
    return (
      <View style={styles.main_container}>
        <Text>Page3</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  }
})

export default Page3