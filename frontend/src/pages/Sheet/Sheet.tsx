import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { getSheet, saveSheetRows } from "../../services/sheetService";
import type { Sheet } from "../../utils/types";
import Spreadsheet from "react-spreadsheet";
import { Container, PageTitle } from "../PagesStyles";
import {
  PageHeader,
  PageContent,
  PageContentSection,
  PageContentTitle,
  SpreadsheetContainer,
} from "./SheetStyles";
import { useTranslation } from "react-i18next";
import debounce from "lodash/debounce";

const Sheet = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [sheet, setSheet] = useState<Sheet | null>(null);

  useEffect(() => {
    const fetchSheet = async () => {
      const data = await getSheet(id || "");
      setSheet(data);
    };
    fetchSheet();
  }, [id]);

  const saveRowsDebounced = useCallback(
    debounce(async (updatedSheet: Sheet) => {
      try {
        await saveSheetRows(updatedSheet.id, updatedSheet.rows);
      } catch (error) {
        console.error("Error saving sheet rows:", error);
      }
    }, 500),
    []
  );

  const handleSheetChange = (newData: any) => {
    if (sheet) {
      const updatedSheet = { ...sheet, rows: newData };
      setSheet(updatedSheet);
      saveRowsDebounced(updatedSheet);
    }
  };

  if (!sheet) return <div>Loading...</div>;

  return (
    <Container>
      <PageHeader>
        <PageTitle>{t("SHEET")}</PageTitle>
      </PageHeader>
      <PageContent>
        <PageContentSection>
          <PageContentTitle>{sheet.name}</PageContentTitle>
          <SpreadsheetContainer>
            <Spreadsheet
              data={sheet.rows}
              columnLabels={sheet.columns}
              onChange={handleSheetChange}
            />
          </SpreadsheetContainer>
        </PageContentSection>
      </PageContent>
    </Container>
  );
};

export default Sheet;
