import React, { Component } from 'react'
import { Text, View, SafeAreaView, Image } from 'react-native'
import { LoginButton, AccessToken } from 'react-native-fbsdk';
export default class App extends Component {
  state={
    url:'',
    name:''
  }
  initUser(token) {
    console.log('heello')
    fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
      .then((response) => response.json())
      .then((json) => {
        // Some user object has been set up somewhere, build that user here
        user.name = json.name
        user.id = json.id
        user.user_friends = json.friends
        user.email = json.email
        user.username = json.name
        user.loading = false
        user.loggedIn = true
        user.avatar = setAvatar(json.id)
      })
      .catch(() => {
        reject('ERROR GETTING DATA FROM FACEBOOK')
      })
  }
  render() {
      const imge=this.state.url? this.state.url:'https://www.petmd.com/sites/default/files/Acute-Dog-Diarrhea-47066074.jpg' 
      
    return (

      <SafeAreaView>
        <View>
          <Image source={{ uri:imge }} style={{ borderRadius: 30, height: 100, width: 100 }} />
          <Text>{this.state.name}</Text>
          <LoginButton
            onLoginFinished={
              (error, result) => {
                if (error) {
                  console.log("login has error: " + result.error);
                } else if (result.isCancelled) {
                  console.log("login is cancelled.");
                } else {
                  AccessToken.getCurrentAccessToken().then(
                    (data) => {
                      // console.log(data)"https://graph.facebook.com/your-facebook-user-id/photos?access_token=your-access-token"
                      fetch('https://graph.facebook.com/v2.5/me?fields=email,name,picture,friends&access_token=' + data.accessToken)
                        .then((response) => response.json())
                        .then((json) => {
                          console.log(json)
                          this.setState({url:json.picture.data.url,name:json.name})
                          // Some user object has been set up somewhere, build that user here
                          // user.name = json.name
                          // user.id = json.id
                          // user.user_friends = json.friends
                          // user.email = json.email
                          // user.username = json.name
                          // user.loading = false
                          // user.loggedIn = true
                          // user.avatar = setAvatar(json.id)
                        })
                        .catch(() => {
                          reject('ERROR GETTING DATA FROM FACEBOOK')
                        })
                    }
                  )
                }
              }
            }
            onLogoutFinished={() => console.log("logout.")} />
        </View>
      </SafeAreaView>
    )
  }
}
