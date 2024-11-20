/* eslint-disable react/prop-types */
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
  TableCell,
  Button
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { MdExplicit } from "react-icons/md";
import { FaArrowDownShortWide, FaArrowUpWideShort } from "react-icons/fa6";

const Top10 = ({ data, country }) => {
  const [topSongs, setTopSongs] = useState(data.slice(0, 10));

  useEffect(() => {
    const fetchData = () => {
      setTopSongs(
        data.filter((d) => (country ? d.country === country : d)).slice(0, 10)
      );
    };
    fetchData();
  } , [data, country]);

  console.log(topSongs)

  return (
    <div className="flex flex-col space-y-5 justify-center">
      <h2 className="font-semibold">Top 10 List - {country === "" ? "Global" : country}</h2>
      <Table aria-label="Top 10 List" selectionMode="single" removeWrapper className="dark">
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
              <TableCell>{parseInt(d.weekly_movement) < 0 ? <FaArrowUpWideShort className="text-green-500"/> : parseInt(d.weekly_movement) > 0 ? <FaArrowDownShortWide className="text-red-600" /> : ""}</TableCell>
              <TableCell>{d.artists}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Top10;
