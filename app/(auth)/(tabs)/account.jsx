import { View, Text, Button } from "react-native"
import React from "react"
import { useAuth } from "@clerk/clerk-expo"

const Screen = () => {
   const { signOut } = useAuth()

   return (
      <View>
         <Text>Account Screen</Text>
         <Button
            title="Logout"
            onPress={() => signOut()}
         />
      </View>
   )
}

export default Screen
