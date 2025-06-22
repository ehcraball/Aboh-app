import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Journal: undefined;
  Timer: undefined;
  Stats: undefined;
};

// 👉 Type générique pour tous les écrans
export type ScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;
