export type MainDataOptions = {
  gameSceneContainer: any;
  endSceneContainer: any;
  countTime: number;
  scoreCount: number;
  hitMoleCount: number;
  missesCount: number;
  stopGame: boolean;
};

export type StartSceneOptions = {
  container: any;
  onGameStart: () => void;
};
export type StartSceneDataOptions = {
  beginFill: number;
  buttonTextColor: number;
  buttonTextMouseOver: number;
};

export type GameSceneOptions = {
  container: any;
};
export type GameSceneDataOptions = {
  scoreBarContainer: any;
  holesContainer: any;
  whiteBackground: any;
  holes: Array<any>;
};

export type ScoreBarOptions = {
  container: any;
};
export type HoleOptions = {
  x: number;
};
export type MoleOptions = {
  holeIndex: number;
};
export type MoleDataOptions = {
  texture: any;
  deadMoleTexture: any;
  deadMoleRectangle: any;
};
export type MoleCoordsOptions = {
  y: number;
};

export type MoleControllerOptions = {
  currentTime: number;
  gameSceneContainer: any;
};

export type EndSceneOptions = {
  container: any;
  onTryAgain: () => void;
};
