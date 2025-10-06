import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchUserBetHistory } from '@/api/user';
import { CommonDataTable } from '@/components/ui/common-data-table';
import { columns } from './columns';
import { useViewportType, ViewportType } from '@/common/hooks/useViewportType';
import { BetsTableColumns, betsTableViewportWiseColumns } from '@/const/tables';
import BetsIcon from '@/assets/icons/bets';
import { useLocation, useRouter } from '@tanstack/react-router';

function MyBetsTable(): JSX.Element {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const viewport = useViewportType();
  const router = useRouter();

  const location = useLocation();

  const tableColumns = columns(viewport);

  const { data } = useQuery({
    queryKey: ['my-bets', pagination],
    queryFn: () =>
      fetchUserBetHistory({
        page: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
      }),
    placeholderData: prev => prev,
  });

  const usedColumns = betsTableViewportWiseColumns[viewport]
    ? tableColumns.filter(col =>
        betsTableViewportWiseColumns[viewport]?.includes(
          col.id as BetsTableColumns
        )
      )
    : tableColumns;

  return (
    <CommonDataTable
      columns={usedColumns}
      data={data?.data.bets || []}
      pageCount={data?.data.pagination.totalPages || 0}
      pagination={pagination}
      rowCount={data?.data.pagination.totalCount || 0}
      setPagination={setPagination}
      emptyState={{
        icon: <BetsIcon />,
        title: 'No bets yet',
        description:
          "You haven't placed any bets yet. Start playing some games to see your betting history here.",
        ...(location.pathname !== '/casino/home' && {
          action: {
            label: 'Explore Games',
            onClick: () => {
              router.navigate({ to: '/casino/home' });
            },
          },
        }),
      }}
    />
  );
}

export default MyBetsTable;
