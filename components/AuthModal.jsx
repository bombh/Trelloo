import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React from "react"
import { BottomSheetView } from "@gorhom/bottom-sheet"
import { MaterialIcons } from "@expo/vector-icons"
import { useOAuth, useSignIn, useSignUp } from "@clerk/clerk-expo"
import { useBrowserWarmUp } from "@/hooks/useBrowserWarmUp"

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
   // {
   //    text: "Continue with Slack",
   //    icon: require("@/assets/images/login/slack.png"),
   //    strategy: AuthStrategy.Slack,
   // },
]

const AuthModal = ({ authType }) => {
   // Warm up the browser
   useBrowserWarmUp()

   // Sign up and sign in hooks
   const { signUp, setActive } = useSignUp()
   const { signIn } = useSignIn()

   // Handle selected authentication strategy
   const { startOAuthFlow: googleAuth } = useOAuth({ strategy: AuthStrategy.Google })
   const { startOAuthFlow: microsoftAuth } = useOAuth({ strategy: AuthStrategy.Microsoft })
   const { startOAuthFlow: appleAuth } = useOAuth({ strategy: AuthStrategy.Apple })
   const { startOAuthFlow: slackAuth } = useOAuth({ strategy: AuthStrategy.Slack })

   const onSelected = async (strategy) => {
      // Select the authentication strategy
      const selectedAuth = {
         [AuthStrategy.Google]: googleAuth,
         [AuthStrategy.Microsoft]: microsoftAuth,
         [AuthStrategy.Slack]: slackAuth,
         [AuthStrategy.Apple]: appleAuth,
      }[strategy]

      // Start the OAuth flow
      // https://clerk.com/docs/custom-flows/oauth-connections#o-auth-account-transfer-flows
      // If the user has an account in your application, but does not yet
      // have an OAuth account connected to it, you can transfer the OAuth
      // account to the existing user account.
      const userExistsButNeedsToSignIn =
         signUp.verifications.externalAccount.status === "transferable" &&
         signUp.verifications.externalAccount.error?.code === "external_account_exists"

      if (userExistsButNeedsToSignIn) {
         const res = await signIn.create({ transfer: true })

         if (res.status === "complete") {
            setActive({
               session: res.createdSessionId,
            })
         }
      }

      // If the user has an OAuth account but does not yet
      // have an account in your app, you can create an account
      // for them using the OAuth information.
      const userNeedsToBeCreated = signIn.firstFactorVerification.status === "transferable"

      if (userNeedsToBeCreated) {
         const res = await signUp.create({
            transfer: true,
         })

         if (res.status === "complete") {
            setActive({
               session: res.createdSessionId,
            })
         }
      } else {
         // If the user has an account in your application
         // and has an OAuth account connected to it, you can sign them in.
         try {
            const { createdSessionId, setActive } = await selectedAuth()

            if (createdSessionId) {
               setActive({ session: createdSessionId })
               console.log(`OAuth success ${strategy}`)
            }
         } catch (err) {
            console.error("OAuth error", err.message)
         }
      }
   }

   return (
      <BottomSheetView style={styles.modalContainer}>
         {/* Log in with Email */}
         <TouchableOpacity
            style={styles.modalBtn}
            onPress={() => {
               // TODO: Implement authentication logic with user and email
            }}
         >
            <MaterialIcons
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
      paddingHorizontal: 20,
      padding: 35,
      gap: 35,
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
