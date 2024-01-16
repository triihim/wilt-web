export function LoadingIndicator() {
  return <span className="w-7 h-7 bg-emerald-400 rounded-md animate-spin"></span>;
}

export function CenteredLoadingIndicator() {
  return (
    <div className="flex justify-center">
      <LoadingIndicator />
    </div>
  );
}
