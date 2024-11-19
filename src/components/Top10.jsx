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

const Top10 = ({ data, country }) => {
  const [topSongs, setTopSongs] = useState(data.slice(0, 10));

  useEffect(() => {
    const fetchData = async () => {
      console.log("Country-> ", country);
      console.log("country code -> ", await convert2Alpha2(country));
      console.log("Top 10 data -> ", data);
      setTopSongs(
        data.filter((d) => (country ? d.country === country : d)).slice(0, 10)
      );
    };
    fetchData();
  } , [data, country]);

  const convert2Alpha2 = async (country) => {
    const res = await fetch(
      "https://iso3166-2-api.vercel.app/api/country_name/" + country
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Country code -> ", data);
        return data;
      });
    return res;
  };

  return (
    <div className="flex flex-col space-y-5 justify-center">
      <h2 className="font-semibold">Top 10 List - {country === "" ? "Global" : country}</h2>
      <Table aria-label="Top 10 List" removeWrapper className="dark">
        <TableHeader>
          <TableColumn>Rank</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn>Artists</TableColumn>
          <TableColumn>Country</TableColumn>
        </TableHeader>
        <TableBody>
          {data.map((d, i) => (
            <TableRow key={i}>
              <TableCell className="text-green-600">{d.daily_rank}º</TableCell>
              <TableCell>{d.name}</TableCell>
              <TableCell>{d.artists}</TableCell>
              <TableCell>{d.country}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Top10;
