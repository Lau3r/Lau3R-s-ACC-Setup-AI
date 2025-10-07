
export interface ACCSetup {
  summary: string;
  tyres: {
    tyreCompound: string;
    tyrePressures: {
      frontLeft: number;
      frontRight: number;
      rearLeft: number;
      rearRight: number;
    };
    alignment: {
      camber: {
        front: number;
        rear: number;
      };
      toe: {
        front: number;
        rear: number;
      };
      caster: number;
    };
  };
  electronics: {
    tractionControl1: number;
    tractionControl2: number;
    abs: number;
    ecuMap: string;
  };
  fuelAndStrategy: {
    fuel: number;
    pitStopTyreSet: number;
    pitStopFuelToAdd: number;
  };
  mechanicalGrip: {
    antirollBar: {
      front: number;
      rear: number;
    };
    preloadDifferential: number;
    wheelRate: {
      front: number;
      rear: number;
    };
    bumpstopRate: {
      front: number;
      rear: number;
    };
    bumpstopRange: {
      front: number;
      rear: number;
    };
  };
  dampers: {
    bump: {
      front: number;
      rear: number;
    };
    rebound: {
      front: number;
      rear: number;
    };
  };
  aero: {
    rideHeight: {
      front: number;
      rear: number;
    };
    rearWing: number;
    splitter: number;
    brakeDucts: number;
  };
}
