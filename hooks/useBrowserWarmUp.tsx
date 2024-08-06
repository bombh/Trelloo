/**
 * @description  improve OAuth flow on Android by pre-warming the browser
 * @example https://clerk.com/changelog/2024-07-26-clerk-expo-v2
 */

import React from "react"
import * as WebBrowser from "expo-web-browser"

export const useBrowserWarmUp = () => {
   React.useEffect(() => {
      void WebBrowser.warmUpAsync()
      return () => {
         void WebBrowser.coolDownAsync()
      }
   }, [])
}
