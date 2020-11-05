import React, { useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'
import {
  Container,
  Scroller,
  HeaderArea,
  HeaderTitle,
  SearchButton,
  LocationArea,
  LoacationInput,
  LocationFinder,
  LoadingIcon,
  ListArea
} from './styles'
import { useNavigation } from '@react-navigation/native'
import SearchIcon from './../../assets/search.svg'
import MyLocationIcon from './../../assets/my_location.svg'
import { request, PERMISSIONS } from 'react-native-permissions'
import Geolocation from '@react-native-community/geolocation'
import Api from '../../Api'
import BarberItem from '../../components/BarberItem'

export default () => {
  const navigation = useNavigation()
  const [location, setLocation] = useState('')
  const [coords, setCoords] = useState(null)
  const [loading, setLoading] = useState(false)
  const [barbersList, setBarbersList] = useState([])
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    getBarbers()
  }, [])

  const handleLocationFinder = async () => {
    setCoords(null)
    const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)

    if (result === 'granted') {
      setLoading(true)
      setBarbersList([])
      Geolocation.getCurrentPosition((info) => {
        setCoords(info.coords)
        getBarbers()
      })
    }
  }

  const getBarbers = async () => {
    setLoading(true)
    setBarbersList([])

    const lat = coords ? coords.latitude : null
    const lng = coords ? coords.longitude : null

    const response = await Api.getBarbers(lat, lng, location)
    console.log('response', response)

    if (!response.error) {
      if (response.loc) {
        setLocation(response.loc)
      }
      setBarbersList(response.data)
    } else {
      alert(response.error)
    }

    setLoading(false)
    setRefreshing(false)
  }

  const onRefresh = () => {
    setRefreshing(true)
    getBarbers()
  }

  const handleLocationSearch = () => {
    setCoords(null)
    getBarbers()
  }

  return (
    <Container>
      <Scroller
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <HeaderArea>
          <HeaderTitle numberOfLines={2}>Find your favorite barber</HeaderTitle>
          <SearchButton onPress={() => navigation.navigate('Search')}>
            <SearchIcon width="26" height="26" fill="#fff" />
          </SearchButton>
        </HeaderArea>
        <LocationArea>
          <LoacationInput
            placeholder="Where are you?"
            placeholderTextColor="#fff"
            value={location}
            onChangeText={(text) => setLocation(text)}
            onEndEditing={handleLocationSearch}
          />
          <LocationFinder onPress={handleLocationFinder}>
            <MyLocationIcon width="26" height="26" fill="#fff" />
          </LocationFinder>
        </LocationArea>
        {loading && <LoadingIcon size="large" color="#fff" />}

        <ListArea>
          {barbersList.map((item, index) => (
            <BarberItem key={item.id} data={item} />
          ))}
        </ListArea>
      </Scroller>
    </Container>
  )
}
