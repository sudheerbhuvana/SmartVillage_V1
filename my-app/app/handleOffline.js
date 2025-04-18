import useOfflineStatus from './components/useOfflineStatus';

const HandleOffline = () => {
  const isOffline = useOfflineStatus();

  if (!isOffline) return null;

  return (
    <div className="offlineView">
      <h1>You are offline</h1>
      <p>Please check your internet connection and try again.</p>
    </div>
  );
};

export default HandleOffline;