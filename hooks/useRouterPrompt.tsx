import React from 'react';
import { useRouter } from 'next/router';

const useRoutePrompt = (isLoading: boolean) => {
  const [shouldShowLeaveConfirmDialog, setShouldShowLeaveConfirmDialog] =
    React.useState(false);
  const [nextRouterPath, setNextRouterPath] = React.useState<string>('');
  const router = useRouter();

  const onRouteChangeStart = React.useCallback(
    (nextPath: string) => {
      if (isLoading) {
       setTimeout(()=>{
          setShouldShowLeaveConfirmDialog(true)
        },1000)
        setNextRouterPath(nextPath);
        throw 'cancelRouteChange';
      }
    },
    [isLoading]
  );

  const onRejectRouteChange = () => {
    setNextRouterPath('');
    setShouldShowLeaveConfirmDialog(false);
  };

  const removeListener = () => {
    router.events.off('routeChangeStart', onRouteChangeStart);
  };

  const onConfirmRouteChange = () => {
    setShouldShowLeaveConfirmDialog(false);
    // simply remove the listener here so that it doesn't get triggered when we push the new route.
    // This assumes that the component will be removed anyway as the route changes
    removeListener();
    router.push(nextRouterPath);
  };

  React.useEffect(() => {
    router.events.on('routeChangeStart', onRouteChangeStart);

    return () => {
      router.events.off('routeChangeStart', onRouteChangeStart);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onRouteChangeStart, isLoading]);

  return {
    isOpen: shouldShowLeaveConfirmDialog,
    onAllow: onConfirmRouteChange,
    onReject: onRejectRouteChange,
  };
};

export default useRoutePrompt;
