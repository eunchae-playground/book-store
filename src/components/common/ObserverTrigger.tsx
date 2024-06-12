import { useEffect, useMemo, useRef } from "react";

interface Props {
  callback: () => void;
}

function ObserverTrigger({ callback }: Props) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const observer = useMemo(
    () =>
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            callback();
          }
        },
        {
          root: null, // 뷰포트를 기준으로 합니다.
          rootMargin: "0px",
          threshold: 0.1, // 트리거가 10% 이상 보일 때 콜백을 호출합니다.
        }
      ),
    [callback]
  );

  useEffect(() => {
    let element: HTMLDivElement | null = null;

    if (!triggerRef.current) {
      return;
    }

    element = triggerRef.current;
    observer.observe(element);  

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [observer]);

  return (
    <div
      ref={triggerRef}
      style={{
        width: "1px",
        height: "1px",
        opacity: 0,
      }}
    />
  );
}

export default ObserverTrigger;
