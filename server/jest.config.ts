import type { Config } from '@jest/types';

export default async (): Promise<Config.InitialOptions> => ({
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
});
