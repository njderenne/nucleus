'use client'

import { useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  SortingState,
  flexRender,
} from '@tanstack/react-table'
import { ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ResponsiveTableProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
  searchable?: boolean
  pagination?: boolean
  pageSize?: number
  mobileCard?: (item: T) => React.ReactNode
  emptyState?: React.ReactNode
  className?: string
}

export default function ResponsiveTable<T>({
  data,
  columns,
  searchable = true,
  pagination = true,
  pageSize = 10,
  mobileCard,
  emptyState,
  className
}: ResponsiveTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize,
      },
    },
  })

  const rows = table.getRowModel().rows

  if (rows.length === 0) {
    return emptyState || (
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-12 text-center">
        <p className="text-slate-400">No data found</p>
      </div>
    )
  }

  return (
    <div className={cn('space-y-4', className)}>
      {/* Search */}
      {searchable && (
        <div>
          <input
            value={globalFilter ?? ''}
            onChange={e => setGlobalFilter(e.target.value)}
            placeholder="Search..."
            className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-slate-500 text-sm"
          />
        </div>
      )}

      {/* Mobile Card View */}
      {mobileCard && (
        <div className="md:hidden space-y-3">
          {rows.map(row => (
            <div key={row.id}>
              {mobileCard(row.original)}
            </div>
          ))}
        </div>
      )}

      {/* Desktop Table View */}
      <div className={cn(
        'rounded-xl border border-slate-700 overflow-hidden',
        mobileCard ? 'hidden md:block' : 'block'
      )}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800/50 border-b border-slate-700">
              <tr>
                {table.getHeaderGroups()[0].headers.map(header => (
                  <th
                    key={header.id}
                    className="p-4 text-left text-slate-400 font-medium text-sm"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={cn(
                          'flex items-center gap-2',
                          header.column.getCanSort() && 'cursor-pointer select-none hover:text-white'
                        )}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getCanSort() && (
                          <ArrowUpDown className="w-4 h-4" />
                        )}
                        {header.column.getIsSorted() === 'asc' && (
                          <span className="text-primary">↑</span>
                        )}
                        {header.column.getIsSorted() === 'desc' && (
                          <span className="text-primary">↓</span>
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {rows.map(row => (
                <tr
                  key={row.id}
                  className="hover:bg-slate-700/30 transition"
                >
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="p-4 text-slate-300 text-sm">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {pagination && table.getPageCount() > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-400">
            Showing {table.getState().pagination.pageIndex * pageSize + 1} to{' '}
            {Math.min((table.getState().pagination.pageIndex + 1) * pageSize, data.length)} of{' '}
            {data.length} results
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="p-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm text-slate-400">
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </span>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="p-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

