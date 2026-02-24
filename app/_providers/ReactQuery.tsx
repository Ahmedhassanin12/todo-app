"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

function ReactQueryProvider({ children }: React.PropsWithChildren) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          structuralSharing: true,
          retry: false,
          refetchOnWindowFocus: false,
          gcTime: 1000 * 60 * 1, // 1 minute - garbage collect unused queries
          staleTime: 1000 * 60, // 1 minute - consider data fresh for 1 minute
        },
      },
    }),
  );

  return (

    <QueryClientProvider client={client}>
      {children}
      {/* <ReactQueryDevtools
					initialIsOpen={false}
					buttonPosition="bottom-right"
				/> */}
    </QueryClientProvider>

  );
}

export default ReactQueryProvider;
