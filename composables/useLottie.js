/**
 * Composable for Lottie.js - use for interactive animations.
 * Import lottie from 'lottie-web' and load JSON animations.
 *
 * @example
 * const container = ref(null)
 * const { load, play, pause, goToFrame, setSpeed } = useLottie()
 * onMounted(() => {
 *   load(container.value, '/animations/example.json', { autoplay: true })
 * })
 */
export const useLottie = () => {
  let animation = null

  const load = async (element, animationData, options = {}) => {
    if (!import.meta.client || !element) return null
    const lottie = (await import('lottie-web')).default
    animation = lottie.loadAnimation({
      container: element,
      renderer: options.renderer || 'svg',
      loop: options.loop ?? true,
      autoplay: options.autoplay ?? false,
      animationData: typeof animationData === 'string' ? undefined : animationData,
      path: typeof animationData === 'string' ? animationData : undefined,
    })
    return animation
  }

  const play = () => animation?.play()
  const pause = () => animation?.pause()
  const stop = () => animation?.stop()
  const goToFrame = (frame) => animation?.goToAndStop(frame, true)
  const goToAndPlay = (frame) => animation?.goToAndPlay(frame, true)
  const setSpeed = (speed) => { if (animation) animation.setSpeed(speed) }
  const destroy = () => {
    animation?.destroy()
    animation = null
  }

  return {
    load,
    play,
    pause,
    stop,
    goToFrame,
    goToAndPlay,
    setSpeed,
    destroy,
  }
}
