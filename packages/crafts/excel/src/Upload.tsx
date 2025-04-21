import { useState } from 'react';
import * as XLSX from 'xlsx';

export const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<any[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0] ?? null;
    setFile(uploadedFile);

    if (uploadedFile) {
      const reader = new FileReader();
      reader.onload = evt => {
        if (evt.target) {
          const binaryStr = evt.target.result;
          const workbook = XLSX.read(binaryStr, { type: 'binary' });
          console.log(workbook);
          // 첫 번째 시트 가져오기
          const wsname = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[wsname];

          // 시트 데이터를 JSON으로 변환
          const parsedData = XLSX.utils.sheet_to_json(worksheet);
          console.log(parsedData);
          setData(parsedData);
        }
      };
      reader.readAsBinaryString(uploadedFile);
    }
  };

  return (
    <div>
      <input type='file' accept='.xlsx, .xls' onChange={handleFileUpload} />
      {data.length > 0 && (
        <div>
          <h3>파싱된 데이터:</h3>
          <table border={1}>
            <thead>
              <tr>
                {Object.keys(data[0]).map(key => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, i) => (
                    <td key={i}>{String(value)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
