import React, { useContext, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Container, LoadingIcon } from './styles'
import AsyncStorage from '@react-native-community/async-storage'
import BarberLogo from './../../assets/barber.svg'
import Api from '../../Api'
import { UserContext } from '../../contexts/UserContext'

export default () => {
  const { dispatch: userDispatch } = useContext(UserContext)
  const navigation = useNavigation()

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token')

      if (!!token) {
        const response = await Api.checkToken(token)

        if (response.token) {
          await AsyncStorage.setItem('token', response.token)
          userDispatch({
            type: 'setAvatar',
            payload: { avatar: response.data.avatar }
          })

          navigation.reset({
            routes: [{ name: 'MainTab' }]
          })
        } else {
          navigation.navigate('Signin')
        }
      } else {
        navigation.navigate('Signin')
      }
    }

    checkToken()
  }, [])

  return (
    <Container>
      <BarberLogo width="100%" height="160" />
      <LoadingIcon size="large" color="#fff" />
    </Container>
  )
}
