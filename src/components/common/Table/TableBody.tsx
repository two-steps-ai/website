import React from 'react';
import type { Column } from './types';
import clsx from 'clsx';

interface TableBodyProps {
  columns: Column[];
  data: Record<string, any>[];
  isMobile: boolean;
}

const TableBody: React.FC<TableBodyProps> = ({ columns, data, isMobile }) => {
  const dataLength = data.length;

  return (
    <tbody className="bg-gray-900/30 backdrop-blur-sm">
      {data.map((row, rowIndex) => {
        const isLastRow = rowIndex === dataLength - 1;
        const rowBgClass = rowIndex % 2 === 0 ? 'bg-transparent' : 'bg-gray-900/20';

        return (
          <tr
            key={rowIndex}
            className={clsx(
              'transition-colors duration-200 hover:bg-gray-900/50',
              rowBgClass,
              isLastRow && 'last-row'
            )}
          >
            {columns.map((column, colIndex) => {
              const isFirstColumn = colIndex === 0;
              const isLastColumn = colIndex === columns.length - 1;

              return (
                <td
                  key={column.key}
                  className={clsx(
                    'px-4 py-3 first:pl-6 last:pr-6 text-sm text-gray-300 border-b border-gray-800/30',
                    isMobile && 'whitespace-nowrap',
                    isLastRow && 'border-b-0',
                    isLastRow && isFirstColumn && 'rounded-bl-xl',
                    isLastRow && isLastColumn && 'rounded-br-xl'
                  )}
                >
                  {column.render
                    ? column.render(row[column.key], row)
                    : row[column.key]}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default React.memo(TableBody);
