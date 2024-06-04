import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSheet } from "../../services/sheetService";
import type { Sheet } from "../../utils/types";
import Spreadsheet from "react-spreadsheet";

const Sheet = () => {
  const { id } = useParams();
  const [sheet, setSheet] = useState<Sheet | null>(null);

  useEffect(() => {
    const fetchSheet = async () => {
      const data = await getSheet(id || "");
      setSheet(data);
    };
    fetchSheet();
  }, [id]);

  if (!sheet) return <div>Loading...</div>;

  return (
    <div>
      <Spreadsheet data={sheet.rows} columnLabels={sheet.columns} />
    </div>
  );
};

export default Sheet;
