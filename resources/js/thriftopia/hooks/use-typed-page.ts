import { usePage } from '@inertiajs/react';
import { PageProps } from '@/types';

export function useTypedPage<T extends PageProps = PageProps>() {
  return usePage<T>();
}
