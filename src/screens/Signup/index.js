import React, { useState, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import {
  Container,
  InputArea,
  CustomButton,
  CustomButtonText,
  SignMessageButton,
  SignMessageButtonText,
  SignMessageButtonTextBold
} from './styles'
import SignInput from '../../components/SignInput'
import BarberLogo from './../../assets/barber.svg'
import PersonIcon from './../../assets/person.svg'
import EmailIcon from './../../assets/email.svg'
import LockIcon from './../../assets/lock.svg'
import Api from '../../Api'
import AsyncStorage from '@react-native-community/async-storage'
import { UserContext } from '../../contexts/UserContext'

export default () => {
  const { dispatch: userDispatch } = useContext(UserContext)
  const navigation = useNavigation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleMessageBtn = () => {
    navigation.reset({
      routes: [{ name: 'Signin' }]
    })
  }

  const handleSignup = async () => {
    if (!!name && !!email && !!password) {
      const json = await Api.signUp(name, email, password)

      if (json.token) {
        await AsyncStorage.setItem('token', json.token)
        userDispatch({
          type: 'setAvatar',
          payload: { avatar: json.data.avatar }
        })

        navigation.reset({
          routes: [{ name: 'MainTab' }]
        })
      } else {
        console.log(json.error)
      }
    } else {
      alert('fill all fields')
    }
  }

  return (
    <Container>
      <BarberLogo width="100%" height="160" />
      <InputArea>
        <SignInput
          IconSvg={PersonIcon}
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <SignInput
          IconSvg={EmailIcon}
          placeholder="E-Mail"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <SignInput
          IconSvg={LockIcon}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          password={true}
        />
        <CustomButton onPress={handleSignup}>
          <CustomButtonText>SIGNUP</CustomButtonText>
        </CustomButton>
      </InputArea>
      <SignMessageButton onPress={handleMessageBtn}>
        <SignMessageButtonText>Do you have an account? </SignMessageButtonText>
        <SignMessageButtonTextBold>Sign in</SignMessageButtonTextBold>
      </SignMessageButton>
    </Container>
  )
}
