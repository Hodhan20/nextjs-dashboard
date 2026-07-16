import CustomersTable from '@/app/ui/customers/table';
import { fetchFilteredCustomers } from '@/app/lib/data';
import Search from '@/app/ui/search';
import { Suspense } from 'react';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customers',
};

async function Customers({
  query,
}: {
  query: string;
}) {
  const customers = await fetchFilteredCustomers(query);
  return <CustomersTable customers={customers} />;
}

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Customers</h1>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search customers..." />
      </div>

      <Suspense
        key={query}
        fallback={<InvoicesTableSkeleton />}
      >
        <Customers query={query} />
      </Suspense>
    </div>
  );
}