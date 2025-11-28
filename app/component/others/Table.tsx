type Column<T> = {
    key: keyof T | string;  // ชื่อ key ใน object
    label: string;          // ชื่อที่ใช้แสดงบนหัวตาราง
    render?: (row: T) => React.ReactNode; // optional: custom render
};

type TableProps<T> = {
    columns: Column<T>[];
    data: T[];
};

export default function Table<T>({ columns, data }: TableProps<T>) {
    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow border border-orange-100">
            <table className="min-w-full divide-y divide-orange-100">
                <thead className="bg-orange-100 text-left text-sm font-semibold text-gray-700">
                    <tr>
                        {columns.map((col) => (
                            <th key={col.key as string} className="px-4 py-3">
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 text-sm">
                    {data.length > 0 ? (
                        data.map((row, index) => (
                            <tr key={index} className="hover:bg-orange-50 transition">
                                {columns.map((col) => (
                                    <td key={col.key as string} className="px-4 py-3">
                                        {col.render 
                                            ? col.render(row)
                                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                            : // @ts-ignore (เพราะ T เป็น generic)
                                              row[col.key]
                                        }
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                className="px-4 py-6 text-center text-gray-500"
                                colSpan={columns.length}
                            >
                                No data found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
