import { Stack } from "expo-router"
import { ActionSheetProvider } from "@expo/react-native-action-sheet"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { StatusBar } from "expo-status-bar"
import { ClerkProvider } from "@clerk/clerk-expo"
import { SupabaseProvider } from "@/context/SupabaseContext"

import * as SecureStore from "expo-secure-store"

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY.toString()

// Cache the Clerk JWT
const tokenCache = {
   async getToken(key) {
      try {
         return SecureStore.getItemAsync(key)
      } catch (err) {
         return null
      }
   },
   async saveToken(key, value) {
      try {
         return SecureStore.setItemAsync(key, value)
      } catch (err) {
         return
      }
   },
}

const RootNavigation = () => {
   return (
      <SupabaseProvider>
         <Stack>
            <Stack.Screen
               name="index"
               options={{ headerShown: false }}
            />
         </Stack>
      </SupabaseProvider>
   )
}

const RootLayout = () => {
   return (
      <ClerkProvider
         publishableKey={CLERK_PUBLISHABLE_KEY}
         tokenCache={tokenCache}
      >
         <ActionSheetProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
               <RootNavigation />
               <StatusBar style="light" />
            </GestureHandlerRootView>
         </ActionSheetProvider>
      </ClerkProvider>
   )
}

export default RootLayout
