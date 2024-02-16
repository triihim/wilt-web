import { useRef, useState, useEffect, PropsWithChildren } from 'react';
import { CenteredLoadingIndicator } from '../components/LoadingIndicator';

export const withClassAddedToMatchingSections = (
  text: string | null,
  search: string | null,
  className: string,
): React.ReactNode => {
  if (!text || !search || search.length < 1) return text;

  const regex = new RegExp(`(${search})`, 'gi'); // Capturing group to include the matched search term in the parts.
  const parts = text.split(regex);

  return parts.map((part, index) =>
    regex.test(part) ? (
      <span key={index} className={className}>
        {part}
      </span>
    ) : (
      part
    ),
  );
};

type InitializerProps = PropsWithChildren & {
  initFunctions: Array<(() => Promise<void>) | (() => void)>;
};

export const Initializer = (props: InitializerProps) => {
  const initialized = useRef(false);
  const [loading, setLoading] = useState(true);

  const initialize = async () => {
    if (initialized.current) return;
    await Promise.all(props.initFunctions.map((f) => f()));
    initialized.current = true;
    setLoading(false);
  };

  useEffect(() => {
    initialize();
  }, []);

  return loading ? <CenteredLoadingIndicator /> : props.children;
};
