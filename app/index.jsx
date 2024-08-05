import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import * as WebBrowser from "expo-web-browser"
import { useActionSheet } from "@expo/react-native-action-sheet"
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetBackdrop } from "@gorhom/bottom-sheet"

import { Colors } from "@/constants/Colors"

export default function Index() {
   const { top } = useSafeAreaInsets()
   const { showActionSheetWithOptions } = useActionSheet()

   const showModal = async (type) => {
      console.log("type", type)
   }

   const openLink = async (url) => {
      console.log("url", url)
      WebBrowser.openBrowserAsync("https://www.farmprod.be")
   }

   const openActionSheet = async () => {
      const options = ["View support docs", "Contact us", "Cancel"]
      const cancelButtonIndex = 2

      showActionSheetWithOptions(
         {
            options,
            cancelButtonIndex,
            title: "Need help?",
         },
         (selectedIndex) => {
            console.log("selectedIndex", selectedIndex)
         }
      )
   }

   return (
      <BottomSheetModalProvider>
         <View
            style={[
               styles.container,
               {
                  paddingTop: top + 30,
               },
            ]}
         >
            <Image
               source={require("@/assets/images/login/trello.png")}
               style={styles.image}
            />
            <Text style={styles.introText}>Move teamwork forward !</Text>

            <View style={styles.bottomContainer}>
               <TouchableOpacity
                  style={[styles.btn, { backgroundColor: "#FFF" }]}
                  onPress={() => showModal("login")}
               >
                  <Text style={[styles.btnText, { color: Colors.primary }]}>Log in</Text>
               </TouchableOpacity>

               <TouchableOpacity
                  style={[styles.btn]}
                  onPress={() => showModal("signup")}
               >
                  <Text style={[styles.btnText, { color: "#fff" }]}>Sign Up</Text>
               </TouchableOpacity>

               <Text style={styles.description}>
                  By signing up, you confirm that you've read and accepted our{" "}
                  <Text
                     style={styles.link}
                     onPress={openLink}
                  >
                     Terms of Service{" "}
                  </Text>
                  and{" "}
                  <Text
                     style={styles.link}
                     onPress={openLink}
                  >
                     Privacy Policy
                  </Text>
               </Text>

               <TouchableOpacity
                  style={styles.link}
                  onPress={openActionSheet}
               >
                  <Text style={styles.link}>Can't log in or sign up ?</Text>
               </TouchableOpacity>
            </View>
         </View>
      </BottomSheetModalProvider>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: Colors.primary,
      alignItems: "center",
   },
   image: {
      height: 450,
      paddingHorizontal: 40,
      resizeMode: "contain",
   },
   introText: {
      fontWeight: "600",
      color: "white",
      fontSize: 17,
      padding: 30,
   },
   bottomContainer: {
      width: "100%",
      paddingHorizontal: 40,
      gap: 10,
   },
   btn: {
      padding: 10,
      borderRadius: 8,
      alignItems: "center",
      borderColor: "#fff",
      borderWidth: 1,
   },
   btnText: {
      fontSize: 18,
   },
   description: {
      fontSize: 12,
      textAlign: "center",
      color: "#fff",
      marginHorizontal: 60,
   },
   link: {
      color: "#fff",
      fontSize: 12,
      textAlign: "center",
      textDecorationLine: "underline",
   },
})
