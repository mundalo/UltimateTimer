// test WakeLock support
let isSupported = false;

if ('wakeLock' in navigator) {
  isSupported = true;
}

if (isSupported) {
  // create a reference for the wake lock
  let wakeLock = null;

  // create an async function to request a wake lock
  const requestWakeLock = async () => {
    try {
      wakeLock = await navigator.wakeLock.request('screen');

    } catch (err) {
      // if wake lock request fails - usually system related, such as battery
      alert('Error: can not prevent screen from sleeping.')
    }
  }

  requestWakeLock();

  const handleVisibilityChange = () => {
    if (wakeLock !== null && document.visibilityState === 'visible') {
      requestWakeLock();
    }
  }

  document.addEventListener('visibilitychange', handleVisibilityChange);

} // isSupported
