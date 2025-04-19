import { useState, useEffect } from 'react';
import './App.scss';
import * as XLSX from 'xlsx';
import Program from './components/Program';
import { Person } from './data';
import Papa from 'papaparse';

export default function App() {
  const [data, setData] = useState<Person[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vTFkErcd5ZxPZH3d5reCj2ioVSKqW4ZOt3Y5Wd76MTLy1tA-7h-NKheExSfr7h3LOXNa-ZM6DTHwIcP/pub?output=csv'
      );
      const csvData = await response.text();
      const extractedData = processData(csvData);
      setData(extractedData);
    } catch (error) {
      console.error('Error fetching data from Google Sheet:', error);
    }
  };

  const readData = async () => {
    try {
      const response = await fetch('/assets/currentData.csv');
      const csvData = await response.text();

      Papa.parse(csvData, {
        header: true,
        complete: (results: Papa.ParseResult<any>) => {
          const extractedData = processCsvData(results.data);
          console.log('Parsed CSV Data:', extractedData);
          setData(extractedData);
        },
      });
    } catch (error) {
      console.error('Error reading data from CSV:', error);
    }
  };

  const processCsvData = (csvData: any[]): Person[] => {
    return csvData.map((row: any) => ({
      name: row["Full Name"],
      shows: (row["Show(s)"] || '').split(', '),
      roles: row.Role,
      bio: row.Bio,
    })).filter((person: Person) => person.name);
  }

  const processData = (csvData: string): Person[] => {
    const workbook = XLSX.read(csvData, { type: 'string', raw: true });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const rawData: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    const extractedData: Person[] = rawData.slice(1).map((row) => ({
      name: row[1],   // Column B
      shows: row[3].split(', '),    // Column D
      roles: row[4],    // Column E
      bio: row[5],      // Column F
    })).filter(person => person.name); // Filter out rows with no name
    return extractedData;
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has('show')) {
      fetchData();
    } else {
      console.log('reading data')
      readData();
    }
  }, []);

  return (
    <>
      <Program data={data} />
      <a href="#top" className="backToTop--link">
        <div className="backToTop">
          <span>Back to Top</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5" />
          </svg>
        </div>
      </a>
    </>
  );
}
