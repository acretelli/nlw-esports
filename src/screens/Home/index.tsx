import { useEffect, useState } from 'react';
import { Image, FlatList, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import logoImg from '../../assets/logo-nlw-esports.png';

import { Background } from '../../components/Background';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { Heading } from '../../components/Heading';
import { Loading } from '../../components/Loading';

import { styles } from './styles';

export function Home() {
  const [games, setGames] = useState();
  const navigation = useNavigation();

  function handleOpenGame({ id, title, bannerUrl }: GameCardProps) {
    navigation.navigate('game', { id, title, bannerUrl });
  }

  const gameMockup = {
    id: '123456',
    title: 'Valorant',
    bannerUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/516575-188x250.jpg',
    _count: {
      ads: 5,
    }
  }

  useEffect(() => {
    fetch('http://192.168.15.145:3333/games')
    .then(res => res.json())
    .then( data => setGames(data))
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image 
          source={logoImg}
          style={styles.logo}
        /> 

        <Heading
          title="Encontre o seu duo"
          subtitle="Selecione o que deseja jogar..."
        />

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleOpenGame(gameMockup)}
          >
            <Text>Jogo</Text>
          </TouchableOpacity>

        {<FlatList
          data={games}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <GameCard
              data={item}
              onPress={() => handleOpenGame(item)}
            />
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.contentList}
        />}
      </SafeAreaView>
    </Background>
  );
}