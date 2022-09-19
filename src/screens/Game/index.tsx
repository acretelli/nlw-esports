import { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';

import logoImg from '../../assets/logo-nlw-esports.png';

import { GameParams } from '../../@types/navigation';
import { Background } from '../../components/Background';

import { styles } from './styles';
import { THEME } from '../../theme';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { DuoMatch } from '../../components/DuoMatch';

export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>();
  const [discordDuoSlected, setDiscordDuoSlected] = useState('');
  const [discordDuoSlectedMockup, setDiscordDuoSlectedMockup] = useState('');

  const route = useRoute();
  const game = route.params as GameParams;
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  }

  async function getDiscordUser(adsId: string) {
    fetch(`http://192.168.15.145:3333/ads/${adsId}/discord`)
    .then(res => res.json())
    .then( data => setDiscordDuoSlected(data))

  }

  async function getDiscordUserMockup(adsId: string) {
    setDiscordDuoSlectedMockup(adsId)
  }

  const duosMockup = [
    {
      id: "7891022",
      hourEnd: "21:20",
      hourStart: "18:00",
      name: "Anna Fernandes",
      useVoiceChannel: true,
      weekDays: ["0", "5", "6"],
      yearsPlaying: 2,
    },
    {
      id: "7891023",
      hourEnd: "21:20",
      hourStart: "18:00",
      name: "Anna Fernandes",
      useVoiceChannel: true,
      weekDays: ["0", "5", "6"],
      yearsPlaying: 2,
    },
  ]

  useEffect(() => {
    fetch(`http://192.168.15.145:3333/games/${game.id}/ads`)
    .then(res => res.json())
    .then(data => setDuos(data.discord))
  }, [])


  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />

          </TouchableOpacity>

          <Image
            source={logoImg}
            style={styles.logo}
          />

          <View style={styles.right} />
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading 
          title={game.title}
          subtitle='Conecte-se e comece a jogar!'
        />

        <FlatList
          data={duos}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <DuoCard
              data={item}
              onConnect={() => getDiscordUser(item.id)} 
            />
          )}
          horizontal
          contentContainerStyle={styles.contentList}
          showsHorizontalScrollIndicator={false}
          style={styles.containerList}
          ListEmptyComponent={() => (
            <Text style={styles.emptyText}>Não há anúncios publicados para esse jogo ainda</Text>
          )}
        />
        
        <FlatList
          data={duosMockup}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <DuoCard
              data={item}
              onConnect={() => getDiscordUserMockup(item.id)}  
            />
          )}
          horizontal
          contentContainerStyle={styles.contentList}
          showsHorizontalScrollIndicator={false}
          style={styles.containerList}
          ListEmptyComponent={() => (
            <Text style={styles.emptyText}>Não há anúncios publicados para esse jogo ainda</Text>
          )}
        />

        <DuoMatch 
          visible={discordDuoSlected.length > 0}
          discord={discordDuoSlected}
          onClose={() => setDiscordDuoSlected('')}
        />

        <DuoMatch 
          visible={discordDuoSlectedMockup.length > 0}
          discord={discordDuoSlectedMockup}
          onClose={() => setDiscordDuoSlectedMockup('')}
        />
      </SafeAreaView>
    </Background>
  );
}