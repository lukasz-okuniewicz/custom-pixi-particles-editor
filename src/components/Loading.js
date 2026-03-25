export default function Loading({ progress = 0, error = "", onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-xl gap-2 px-4">
      <div>Loading editor assets... {Math.max(0, Math.min(100, progress))}%</div>
      {!error ? (
        <div className="text-sm opacity-75">
          First load can take a few seconds while textures and audio initialize.
        </div>
      ) : null}
      {error ? (
        <>
          <div className="text-sm text-red-400 text-center">{error}</div>
          <button type="button" className="btn btn-default" onClick={onRetry}>
            Retry load
          </button>
        </>
      ) : null}
    </div>
  );
}
