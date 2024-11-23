/* eslint-disable react/prop-types */
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
  TableCell
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { MdExplicit } from "react-icons/md";
import { FaArrowDownShortWide, FaArrowUpWideShort } from "react-icons/fa6";

const Top10 = ({ data, country, setSong, song }) => {
  const [selectedRow, setSelectedRow] = useState(new Set());

  useEffect(() => {

    if(selectedRow.size > 0)
      setSong(data.at(Object.values(selectedRow)[0]))

    else if (selectedRow.size == 0)
      setSong(null);

  } , [data, country, selectedRow, song]);

  return (
    <div className="flex flex-col space-y-5 justify-center">
      <h2 className="font-semibold text-center">Top 10 List - {country === "" ? "Global" : country}</h2>
      <Table 
        aria-label="Top 10 List" 
        selectionMode="single" 
        removeWrapper 
        className="dark"
        selectedKeys={selectedRow}
        onSelectionChange={setSelectedRow}
      >
        <TableHeader>
          <TableColumn>Rank</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn>Variation</TableColumn>
          <TableColumn>Artists</TableColumn>
        </TableHeader>
        <TableBody>
          {data.map((d, i) => (
            <TableRow key={i}>
              <TableCell className="text-green-600">{d.daily_rank}º</TableCell>
              <TableCell>{d.name} {d.is_explicit != "False" && <MdExplicit />}</TableCell>
              <TableCell>{parseInt(d.weekly_movement) > 0 ? <FaArrowUpWideShort className="text-green-500"/> : parseInt(d.weekly_movement) < 0 ? <FaArrowDownShortWide className="text-red-600" /> : ""}</TableCell>
              <TableCell>{d.artists}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Top10;
