import React, { useState } from 'react'
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
import Api from './../../Api'
import SignInput from '../../components/SignInput'
import BarberLogo from './../../assets/barber.svg'
import EmailIcon from './../../assets/email.svg'
import LockIcon from './../../assets/lock.svg'

export default () => {
  const navigation = useNavigation()
  const [email, setEmail] = useState('suporte@b7web.com.br')
  const [password, setPassword] = useState('1234')

  const handleMessageBtn = () => {
    navigation.reset({
      routes: [{ name: 'Signup' }]
    })
  }

  const handleLogin = async () => {
    if (!!email && !!password) {
      const json = await Api.signIn(email, password)

      if (json.token) {
        console.log(json)
      } else {
        alert('wrong data')
      }
    } else {
      alert('fill the form')
    }
  }

  return (
    <Container>
      <BarberLogo width="100%" height="160" />
      <InputArea>
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
        <CustomButton onPress={handleLogin}>
          <CustomButtonText>LOGIN</CustomButtonText>
        </CustomButton>
      </InputArea>
      <SignMessageButton onPress={handleMessageBtn}>
        <SignMessageButtonText>Don't have an account? </SignMessageButtonText>
        <SignMessageButtonTextBold>Sign up</SignMessageButtonTextBold>
      </SignMessageButton>
    </Container>
  )
}
