import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BaseScreen from '../components/BaseScreen';
import Title from '../components/Title';
import Subtitle from '../components/Subtitle';
import Button from '../components/Button';
import { ScreenProps } from '../navigations/Types';
import theme from '../styles/theme';

export default function HomeScreen({ navigation }: ScreenProps<'Home'>) {
  const [hasPendingChallenge, setHasPendingChallenge] = useState(false);

  useEffect(() => {
    const checkChallengeStatus = async () => {
      const today = new Date().toDateString();
      const acceptedDate = await AsyncStorage.getItem('challengeAcceptedDate');
      setHasPendingChallenge(acceptedDate !== today);
    };

    checkChallengeStatus();
    const unsubscribe = navigation.addListener('focus', checkChallengeStatus);
    return unsubscribe;
  }, [navigation]);


  return (
    <BaseScreen>
      <Title>Bienvenue sur YANA</Title>
      <Subtitle>YANA : Votre aide au quotidien</Subtitle>

      <Button title="Pomodoro" onPress={() => navigation.navigate('Timer')} />
      <Button title="Journal de suivi" onPress={() => navigation.navigate('Journal')} />
      <Button title="Statistiques" onPress={() => navigation.navigate('Stats')} />

      <Button
        title={`Défi du jour${hasPendingChallenge ? ' ⭐' : ''}`}
        onPress={() => navigation.navigate('Challenge')}
        color={hasPendingChallenge ? theme.colors.accent : undefined}
        style={
          hasPendingChallenge
            ? {
              borderWidth: 2,
              borderColor: '#c2ae2d',
            }
            : undefined
        }
      />

    </BaseScreen>
  );
}
