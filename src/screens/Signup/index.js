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
import SignInput from '../../components/SignInput'
import BarberLogo from './../../assets/barber.svg'
import PersonIcon from './../../assets/person.svg'
import EmailIcon from './../../assets/email.svg'
import LockIcon from './../../assets/lock.svg'

export default () => {
  const navigation = useNavigation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleMessageBtn = () => {
    navigation.reset({
      routes: [{ name: 'Signin' }]
    })
  }

  const handleSignup = () => {}

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
