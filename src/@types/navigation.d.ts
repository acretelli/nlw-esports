export interface GameParams {
  id: string,
  title: string,
  bannerUrl: string
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefinied;
      game: {
        id: string;
        title: string;
        bannerUrl: string;
      };
    }
  }
}