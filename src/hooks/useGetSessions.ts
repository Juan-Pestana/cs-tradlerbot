'use client'

import { useInfiniteQuery } from '@tanstack/react-query'

import { getSessionsBy } from '@/actions/sessionActions'
import { IfilterValues } from '../types/index'

export type IgetSessionsParams = Omit<IfilterValues, 'pageParam'>

export default function useGetPosts(searchParams: IgetSessionsParams) {
  return useInfiniteQuery({
    queryKey: ['sessions', searchParams],
    queryFn: ({ pageParam = 1 }) =>
      getSessionsBy({ pageParam, ...searchParams }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasNextPage ? pages.length + 1 : undefined
    },
  })
}
