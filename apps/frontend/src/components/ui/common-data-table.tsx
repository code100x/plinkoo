import type {
  ColumnDef,
  PaginationState,
  Updater,
} from '@tanstack/react-table';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Table as TableUI,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table';
import { Button } from './button';
import { EmptyState } from './empty-state';

interface CommonDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageCount?: number;
  setPagination?: (updater: Updater<PaginationState>) => void;
  pagination?: PaginationState;
  rowCount?: number;
  emptyState?: {
    icon?: React.ReactNode;
    title: string;
    description?: string;
    action?: {
      label: string;
      onClick: () => void;
    };
  };
}

// Type declaration to extend ColumnDef with our custom meta properties
declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData, TValue> {
    alignment?: 'left' | 'right' | 'center';
  }
}

export function CommonDataTable<TData, TValue>({
  columns,
  data,
  pageCount,
  setPagination,
  pagination,
  rowCount,
  emptyState,
}: CommonDataTableProps<TData, TValue>): JSX.Element {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount,
    rowCount,
    defaultColumn: {
      size: 200, //starting column size
    },
    columnResizeMode: 'onChange',
    onPaginationChange: updater => {
      if (!pagination) return;
      // Handle the updater whether it's a function or an object
      if (typeof updater === 'function') {
        const newState = updater(pagination);
        setPagination?.({
          pageIndex: newState.pageIndex,
          pageSize: newState.pageSize,
        });
      } else {
        setPagination?.({
          pageIndex: updater.pageIndex,
          pageSize: updater.pageSize,
        });
      }
    },
    state: {
      pagination,
    },
  });

  if (table.getRowModel().rows.length === 0) {
    return (
      <EmptyState
        icon={emptyState?.icon}
        title={emptyState?.title || 'No data available'}
        description={emptyState?.description}
        action={emptyState?.action}
      />
    );
  }

  return (
    <div>
      <TableUI className="[&_tr:nth-child(odd)>td]:bg-brand-weak [&_tr:nth-child(odd)>td:first-child]:rounded-l-sm [&_tr:nth-child(odd)>td:last-child]:rounded-r-sm mt-2">
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead
                  className={cn(
                    'font-semibold text-neutral-weak text-sm px-3',
                    header.column.columnDef.meta?.alignment === 'right' &&
                      'text-right',
                    header.column.columnDef.meta?.alignment === 'center' &&
                      'text-center'
                  )}
                  key={header.id}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <TableRow
              data-state={row.getIsSelected() && 'selected'}
              key={row.id}
            >
              {row.getVisibleCells().map(cell => (
                <TableCell
                  className={cn(
                    'p-3 text-sm',
                    cell.column.columnDef.meta?.alignment === 'right' &&
                      'text-right',
                    cell.column.columnDef.meta?.alignment === 'center' &&
                      'text-center'
                  )}
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </TableUI>

      {/* Pagination controls */}
      {pagination && (table.getCanPreviousPage() || table.getCanNextPage()) ? (
        <div className="flex justify-center mt-4 gap-4 items-center">
          <Button
            className="flex items-center"
            disabled={!table.getCanPreviousPage()}
            onClick={() => {
              table.previousPage();
            }}
            size="default"
            variant="ghost"
          >
            <ChevronLeftIcon className="h-4 w-4 mr-1" />
            Prev
          </Button>
          <Button
            className="flex items-center"
            disabled={!table.getCanNextPage()}
            onClick={() => {
              table.nextPage();
            }}
            size="default"
            variant="ghost"
          >
            Next
            <ChevronRightIcon className="h-4 w-4 ml-1" />
          </Button>
        </div>
      ) : null}
    </div>
  );
}
