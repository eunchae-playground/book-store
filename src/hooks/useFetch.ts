import { isAxiosError } from "axios";
import { useEffect, useState } from "react";

type FetcherCallback<TData> = () => Promise<TData>;

/**
 * @param fetcherCallback useFetch는 fetcherCallback의 변경을 감지하지 않고, deps만을 의존성 배열로 가져 함수를 재실행 합니다.
 */
const useFetch = <TData>(
  fetcherCallback: FetcherCallback<TData>,
  deps: React.DependencyList
) => {
  const [data, setData] = useState<TData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const data = await fetcherCallback();
        setData(data);
      } catch (error) {
        if (isAxiosError(error)) {
          setError(error);
        }
      } finally {
        setIsLoading(false);
      }
    })();
    // eslint-disable-next-line
  }, deps);

  return { data, error, isLoading };
};

export default useFetch;
