import { useEffect } from "react"
import { Stack, useRouter, useSegments } from "expo-router"
import { ActionSheetProvider } from "@expo/react-native-action-sheet"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { StatusBar } from "expo-status-bar"
import { ClerkProvider, useAuth } from "@clerk/clerk-expo"
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
   const router = useRouter()
   const segments = useSegments()
   const { isLoaded, isSignedIn } = useAuth()

   useEffect(() => {
      if (!isLoaded) return

      const inAuthGroup = segments[0] === "(auth)"

      if (isSignedIn && !inAuthGroup) {
         router.replace("/(auth)/(tabs)/account")
      } else if (!isSignedIn) {
         router.replace("/")
      }
   }, [isSignedIn])

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
