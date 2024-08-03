import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export function TanStackQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0, // 数据立即过期，单位：毫秒
        retry: 1, // 请求失败时重试一次
        retryDelay: 1000, // 重试延迟时间为1秒
        refetchOnWindowFocus: true, // 窗口重新获得焦点时重新获取数据
        refetchOnReconnect: true, // 网络重新连接时是否重新获取数据
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
