import { Stack } from "expo-router"
import { ActionSheetProvider } from "@expo/react-native-action-sheet"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { StatusBar } from "expo-status-bar"

const RootNavigation = () => {
   return (
      <Stack>
         <Stack.Screen
            name="index"
            options={{ headerShown: false }}
         />
      </Stack>
   )
}

const RootLayout = () => {
   return (
      <ActionSheetProvider>
         <>
            <StatusBar style="light" />
            <GestureHandlerRootView style={{ flex: 1 }}>
               <RootNavigation />
            </GestureHandlerRootView>
         </>
      </ActionSheetProvider>
   )
}

export default RootLayout
