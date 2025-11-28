'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

type SearchBarProps = {
    filters: string[];
    searchParams: { q?: string, filter?: string };
};

export default function SearchBar({ filters, searchParams }: SearchBarProps) {
    const router = useRouter();

    const [searchTerm, setSearchTerm] = useState(searchParams.q || "");
    const [selectedFilter, setSelectedFilter] = useState(searchParams.filter || filters[0]);

    function handleSearch() {
        router.push(`?q=${searchTerm}&filter=${selectedFilter}`);
    }

    return (
        <div className="sm:self-end sm:place-items-end flex flex-col gap-y-2">
            <label className="text-2xl font-medium" htmlFor="search">Quick Search</label>

            <div className="flex flex-row gap-x-4 flex-wrap sm:justify-end">
                <div className="flex flex-row gap-x-4 items-center">
                    {filters.map((filter) => (
                        <div key={filter}>
                            <input
                                type="radio"
                                name="filter"
                                id={filter}
                                value={filter}
                                checked={selectedFilter === filter}
                                onChange={() => setSelectedFilter(filter)}
                                className="mr-2"
                            />
                            <label htmlFor={filter}>{filter}</label>
                        </div>
                    ))}
                </div>
            </div>

            <input
                className="block w-[300px] rounded-md border px-4 py-2"
                id="search"
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleSearch}
            >
                Search
            </button>
        </div>
    );
}
