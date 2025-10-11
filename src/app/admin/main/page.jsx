"use client";

import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

import { Heading } from "@/components/heading";

import { supabase } from "@/libs/supabaseClient";

export default function Main() {
  const columns = [
    { field: "field", headerName: "분야", width: 200 },
    {
      field: "large",
      headerName: "대분류",
      width: 250,
    },
    {
      field: "intermediate",
      headerName: "중분류",
      width: 300,
    },
    {
      field: "code",
      headerName: "중분류 고유 번호",
      width: 150,
    },
    {
      field: "totalCount",
      headerName: "총 건수",
      width: 100,
      rowSpanValueGetter: () => {
        return;
      },
    },
  ];

  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchForm = async () => {
      const { data, error } = await supabase
        .from("form")
        .select("*")
        .order("code");

      setRows(
        Object.values(
          data.reduce((acc, cur) => {
            const key = cur.code;

            if (acc[key]) {
              acc[key].totalCount += 1;
            }

            if (!acc[key]) {
              acc[key] = { ...cur, totalCount: 1 };
            }

            return acc;
          }, {})
        )
      );

      error && console.error(error);
    };

    fetchForm();
  }, []);

  return (
    <div>
      <header>
        <Heading level={1} className="my-4">
          258개 중분류별 응답 현황
        </Heading>
      </header>
      <main>
        <DataGrid
          rows={rows}
          columns={columns}
          rowSpanning
          showCellVerticalBorder
        />
      </main>
    </div>
  );
}
