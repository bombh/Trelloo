import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React from "react"
import { BottomSheetView } from "@gorhom/bottom-sheet"
import { Ionicons } from "@expo/vector-icons"

// Strategies for authentication
const AuthStrategy = {
   Google: "oauth_google",
   Microsoft: "oauth_microsoft",
   Slack: "oauth_slack",
   Apple: "oauth_apple",
}

const LOGIN_OPTIONS = [
   {
      text: "Continue with Google",
      icon: require("@/assets/images/login/google.png"),
      strategy: AuthStrategy.Google,
   },
   {
      text: "Continue with Microsoft",
      icon: require("@/assets/images/login/microsoft.png"),
      strategy: AuthStrategy.Microsoft,
   },
   {
      text: "Continue with Apple",
      icon: require("@/assets/images/login/apple.png"),
      strategy: AuthStrategy.Apple,
   },
   {
      text: "Continue with Slack",
      icon: require("@/assets/images/login/slack.png"),
      strategy: AuthStrategy.Slack,
   },
]

const AuthModal = ({ authType }) => {
   const onSelected = async (strategy) => {
      console.log("strategy", strategy)
      // TODO: Implement authentication logic with Clerk
   }

   return (
      <BottomSheetView style={styles.modalContainer}>
         {/* Log in with Email */}
         <TouchableOpacity style={styles.modalBtn}>
            <Ionicons
               name="mail-outline"
               size={20}
            />
            <Text style={styles.btnText}>{authType === "login" ? "Log in" : "Sign up"} with Email</Text>
         </TouchableOpacity>

         {/* Log in with Auth Services */}
         {LOGIN_OPTIONS.map((option, index) => (
            <TouchableOpacity
               key={index}
               style={styles.modalBtn}
               onPress={() => onSelected(option.strategy)}
            >
               <Image
                  source={option.icon}
                  style={styles.btnIcon}
               />
               <Text style={styles.btnText}>{option.text}</Text>
            </TouchableOpacity>
         ))}
      </BottomSheetView>
   )
}

const styles = StyleSheet.create({
   modalContainer: {
      flex: 1,
      alignItems: "flex-start",
      padding: 20,
      gap: 20,
   },
   modalBtn: {
      flexDirection: "row",
      gap: 14,
      alignItems: "center",
      borderColor: "#fff",
      borderWidth: 1,
   },
   btnIcon: {
      width: 20,
      height: 20,
      resizeMode: "contain",
   },
   btnText: {
      fontSize: 18,
   },
})

export default AuthModal
