import { Audio } from 'expo-av';

export  async function PlayNxtAudio()
{
  const { sound } = await Audio.Sound.createAsync(require('../assets/audio/next.mp3'))
  await sound.playAsync();
  return sound;
}

export  async function PlayApplauseAudio()
{
  
  const { sound } = await Audio.Sound.createAsync(require('../assets/audio/applause.mp3'))
  await sound.playAsync();
  return sound;
  
}

export  async function PlaySuccessAudio()
{
  
  const { sound } = await Audio.Sound.createAsync(require('../assets/audio/success.mp3'))
  await sound.playAsync();
  return sound;
}

export  async function PlayLeaveAudio()
{
  
  const { sound } = await Audio.Sound.createAsync(require('../assets/audio/leave.mp3'))
  await sound.playAsync();
  return sound;
}

export  async function PlayMoneyAudio()
{
  
  const { sound } = await Audio.Sound.createAsync(require('../assets/audio/money.mp3'))
  await sound.playAsync();
  return sound;
}

export  async function PlayGameMenuAudio()
{
  
  const { sound } = await Audio.Sound.createAsync(require('../assets/audio/game-menu.mp3'))
  await sound.playAsync();
  return sound;
}

export  async function PlayHelpAudio()
{
  
  const { sound } = await Audio.Sound.createAsync(require('../assets/audio/help.mp3'))
  await sound.playAsync();
  return sound;
}

export  async function PlayRestartAudio()
{
  
  const { sound } = await Audio.Sound.createAsync(require('../assets/audio/restart.mp3'))
  await sound.playAsync();
  return sound;
}

export  async function PlayTimeOutAudio()
{
  
  const { sound } = await Audio.Sound.createAsync(require('../assets/audio/timeout.mp3'))
  
  return sound;
}

