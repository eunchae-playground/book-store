import { AxiosError, isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
type FetcherCallback<TData> = () => Promise<TData>;

/**
 * @param fetcherCallback useFetch는 fetcherCallback의 변경을 감지하지 않고, deps만을 의존성 배열로 가져 함수를 재실행 합니다.
 */
const useFetch = <TData>(
  fetcherCallback: FetcherCallback<TData>,
  deps: React.DependencyList
) => {
  const [data, setData] = useState<TData | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refetchTrigger, setRefetchTrigger] = useState<string | null>(null);

  const refetch = () => {
    setRefetchTrigger(uuidv4());
  };

  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        setIsLoading(true);
        const data = await fetcherCallback();
        if (!ignore) {
          setData(data);
        }
      } catch (error) {
        if (isAxiosError(error)) {
          setError(error);
        }
      } finally {
        setIsLoading(false);
      }
    })();

    return () => {
      ignore = true;
    };

    // eslint-disable-next-line
  }, [...deps, refetchTrigger]);

  return { data, error, isLoading, refetch };
};

export default useFetch;
