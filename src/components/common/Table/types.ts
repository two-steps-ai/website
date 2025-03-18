/**
 * Represents a single column in a table.
 * @template T - The type of the row data.
 */
export interface Column<T = Record<string, any>> {
  /**
   * Unique key for the column.
   */
  key: keyof T;
  /**
   * The header text displayed for the column.
   */
  header: string;
  /**
   * Optional render function to customize cell content.
   * @param value - The cell's value.
   * @param row - The entire row data.
   * @returns A React node to be rendered in the cell.
   */
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

/**
 * Props for the Table component.
 * @template T - The type of the row data.
 */
export interface TableProps<T = Record<string, any>> {
  /**
   * An array of columns to be rendered in the table.
   */
  columns: Column<T>[];
  /**
   * The data rows for the table. Each row is an object with key-value pairs.
   */
  data: T[];
  /**
   * Optional class name to style the table.
   */
  className?: string;
  /**
   * Optional caption for the table.
   */
  caption?: string;
  /**
   * Optional unique identifier for the table.
   */
  id?: string;
  /**
   * Optional aria-label for accessibility.
   */
  'aria-label'?: string;
}
