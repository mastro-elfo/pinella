export default function withVibration(callback: Function) {
  return () => {
    if ("vibrate" in navigator) {
      navigator.vibrate(100);
    }
    return callback();
  };
}
