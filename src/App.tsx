import { useState, useEffect } from 'react';
import './App.scss';
import * as XLSX from 'xlsx';
import Program from './components/Program';
import { Person } from './data';


export default function App() {
  const [data, setData] = useState<Person[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://docs.google.com/spreadsheets/d/e/2PACX-1vTFkErcd5ZxPZH3d5reCj2ioVSKqW4ZOt3Y5Wd76MTLy1tA-7h-NKheExSfr7h3LOXNa-ZM6DTHwIcP/pub?output=csv'
        );
        const csvData = await response.text();
        // console.log(csvData)
        const workbook = XLSX.read(csvData, { type: 'string', raw: true });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const rawData: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1});
        console.log(rawData.slice(1));
        const extractedData: Person[] = rawData.slice(1).map((row) => ({
          name: row[1],   // Column B
          shows: row[3].split(', '),    // Column D
          roles: row[4],    // Column E
          bio: row[5],      // Column F
        })).filter(person => person.name); // Filter out rows with no name

        setData(extractedData);
      } catch (error) {
        console.error('Error fetching data from Google Sheet:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Program data={data} />
    </>
  );
}
