import React from 'react';
import { Text } from 'react-native';
import { ScreenProps } from '../navigations/Types';
import BaseScreen from '../components/BaseScreen';
import Title from '../components/Title';
import Subtitle from '../components/Subtitle';
import Button from '../components/Button';

export default function HomeScreen({ navigation }: ScreenProps<'Home'>) {
  return (
    <BaseScreen>
      <Title>Bienvenue sur ABOH</Title>
        <Subtitle>ABOH : Votre aide au quotidien</Subtitle>
      <Button title="Pomodoro" onPress={() => navigation.navigate('Timer')} />
      <Button title="Journal de suivi" onPress={() => navigation.navigate('Journal')} />
      <Button title="Statistiques" onPress={() => navigation.navigate('Stats')} />
    </BaseScreen>
  );
}
