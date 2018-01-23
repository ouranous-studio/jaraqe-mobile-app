import React, { Fragment } from 'react'
import {
  View,
  Dimensions,
  Button,
} from 'react-native'
import Navbar from 'src/common/Navbar'
import Jimage from 'src/common/Jimage'
import Jext from 'src/common/Jext'
import api from 'src/utils/apiHOC'
import { connect } from 'react-redux'
import { getSetProfile } from 'src/redux/Main.reducer'
import { navigate } from 'src/utils/helpers/navigation.helper'
import { autobind } from 'core-decorators'

const { width } = Dimensions.get('window')

@api((props) => ({
  url: `users/${props.profile.id}/friendship`,
  method: 'POST',
  name: 'changeFriendShip',
}))
@api((props) => ({
  url: `users/${props.profile.id}`,
  method: 'GET',
  name: 'user',
}))
@api((props) => ({
  url: `games/play-with-user/${props.profile.id}`,
  method: 'POST',
  name: 'playWithUser',
}))
@connect(
  state => ({
    profileProp: state.Main.profile,
  }),
  { getSetProfile }
)
@autobind
export default class UserProfile extends React.Component {
  handleFriendShip(action) {
    const { data: { changeFriendShip }, getSetProfile } = this.props

    return changeFriendShip({
      body: {
        action,
      }
    })
      .then(() => {
        navigate({
          method: 'dismissModal',
        })
        getSetProfile()
      })
  }

  createGame() {
    const { data: { playWithUser } } = this.props

    playWithUser()
      .then(({ game }) => {
        return navigate({
          navigator: this.props.navigator,
          screen: 'Game',
          method: 'push',
          options: {
            passProps: {
              game
            },
            navigatorStyle: {
              drawUnderTabBar: true,
              navBarHidden: true,
              tabBarHidden: true,
            }
          }
        })
      })
  }

  render() {
    let { profile, data: { user }, profileProp } = this.props

    if (user) {
      profile = user
    }

    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Navbar
          isModal
        />
        <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 16 }}>
          <Jimage
            source={{ uri: profile.avatar }}
            style={{
              width: width / 3,
              height: width / 3,
              borderRadius: width / 6,
            }}
          />
          <Jext style={{ fontSize: 20, marginVertical: 10 }}>{profile.username || profile.fullName}</Jext>

          {
            profileProp.id !== profile.id &&
            <View>
              {
                !profile.isFriend
                  ? <Button
                  title='رفیق شدن'
                  onPress={() => this.handleFriendShip('add')}
                />
                  : <Button
                  title='نارفیق شدن'
                  color='red'
                  onPress={() => this.handleFriendShip('remove')}
                />
              }

              <Button
                title='جرقه!'
                onPress={this.createGame}
              />
            </View>
          }

        </View>
      </View>
    )
  }
}