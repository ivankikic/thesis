import { Container, PageTitle } from "../PagesStyles";
import {
  PageContent,
  PageContentSection,
  PageContentTitle,
  PageHeader,
  TableContainer,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  ImportButton,
  ImportButtonContainer,
  DeleteButton,
} from "./ImportStyles";
import { useTranslation } from "react-i18next";
import * as XLSX from "xlsx";
import { useState, useEffect } from "react";
import axiosClient from "../../auth/apiClient";
import { FileType, ImportLog } from "../../utils/types";
import dayjs from "dayjs";
import deleteIcon from "/icons/pages/delete_w.svg";
import ConfirmDeleteImportModal from "../../components/Modal/DeleteImportModal";
import ImportPreviewModal from "../../components/Modal/ImportPreviewModal";
import toast from "react-hot-toast";
import { useSidebar } from "../../contexts/SidebarContext";

const Import = () => {
  const { t } = useTranslation();
  const { reloadSheets } = useSidebar();
  const [file, setFiles] = useState<FileType[]>([]);
  const [importLogs, setImportLogs] = useState<ImportLog[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewData, setPreviewData] = useState<any>(null);

  const handleFileChange = (event: any) => {
    const selectedFiles = event.target.files;
    const acceptedFiles: FileType[] = Array.from(selectedFiles) as FileType[];
    acceptedFiles.forEach((file: FileType) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        if (e.target?.result) {
          const data = new Uint8Array(e.target.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json: any[][] = XLSX.utils.sheet_to_json(worksheet, {
            header: 1,
          });

          let processedColumnsCount = 0;
          const expectedColumnCount = json[0].length;

          let columns = json[0].map((col: any) => {
            processedColumnsCount++;
            return col === null || col === undefined || col === ""
              ? "unknown"
              : col;
          });

          if (processedColumnsCount < expectedColumnCount) {
            columns = Array.from({ length: expectedColumnCount }, (_, i) =>
              columns[i] === undefined ? "unknown" : columns[i]
            );
          }

          const rows = json
            .slice(1)
            .map((row: any[]) => row.map((value: any) => ({ value })));

          setPreviewData({
            name: file.name.replace(/\.[^/.]+$/, ""),
            columns,
            rows,
          });

          setShowPreviewModal(true);
        } else {
          console.error("File reading failed.");
          toast.error(t("ERROR_IMPORT"), { duration: 1500 });
        }
      };
      reader.readAsArrayBuffer(file as unknown as Blob);
    });
    setFiles(acceptedFiles);
    event.target.value = null;
  };

  const handleConfirmImport = async (
    name: string,
    columns: string[],
    rows: any[]
  ) => {
    try {
      await axiosClient.post("/api/sheets", {
        name,
        columns: JSON.stringify(columns),
        rows: JSON.stringify(rows),
      });
      await axiosClient.post("/api/import", {
        file_name: file[0].name,
        status: "imported",
        sheet_name: name,
      });
      reloadSheets();
      // toast.success(t("TOAST_SUCCESS_IMPORT"), { duration: 1500 });
    } catch (error) {
      await axiosClient.post("/api/import", {
        file_name: file[0].name,
        status: "failed",
      });
      console.error("Error saving import log:", error);
      toast.error(t("ERROR_IMPORT"), { duration: 1500 });
    } finally {
      setShowPreviewModal(false);
      resetFileState();
      fetchImportLogs();
    }
  };

  const resetFileState = () => {
    setFiles([]);
    setPreviewData(null);
  };

  const fetchImportLogs = async () => {
    try {
      const response = await axiosClient.get("/api/import");
      setImportLogs(response.data);
    } catch (error) {
      console.error("Error fetching import logs:", error);
    }
  };

  useEffect(() => {
    fetchImportLogs();
  }, []);

  const handleDelete = async () => {
    if (deleteId !== null) {
      try {
        await axiosClient.delete(`/api/import/${deleteId}`);
        setImportLogs(
          importLogs.filter((log: ImportLog) => log.id !== deleteId)
        );
        toast.success(t("TOAST_SUCCESS_DELETE_IMPORT"), { duration: 1500 });
      } catch (error) {
        console.error("Error deleting import log:", error);
        toast.error(t("ERROR_DELETE_IMPORT"), { duration: 1500 });
      } finally {
        setShowModal(false);
        setDeleteId(null);
      }
    }
  };

  const openDeleteModal = (id: number) => {
    setDeleteId(id);
    setShowModal(true);
  };

  return (
    <Container>
      <PageHeader>
        <PageTitle>{t("IMPORT")}</PageTitle>
      </PageHeader>
      <PageContent>
        <PageContentSection>
          <PageContentTitle>{t("IMPORT_FILE")}</PageContentTitle>
          <input
            type="file"
            accept=".csv, .xlsx, .xls"
            onChange={handleFileChange}
            style={{ display: "none" }}
            id="fileInput"
          />
          <ImportButtonContainer>
            <label htmlFor="fileInput">
              <ImportButton>{t("IMPORT_IT")}</ImportButton>
            </label>
            <span>{t("ALLOWED_EXTENSIONS")}</span>
          </ImportButtonContainer>
        </PageContentSection>
        <PageContentSection>
          <PageContentTitle>{t("FILES")}</PageContentTitle>
          <TableContainer>
            <Table>
              <thead>
                <TableRow>
                  <TableHeader>{t("ID")}</TableHeader>
                  <TableHeader>{t("FILE_NAME")}</TableHeader>
                  <TableHeader>{t("SHEET_NAME")}</TableHeader>
                  <TableHeader>{t("STATUS")}</TableHeader>
                  <TableHeader>{t("DATE")}</TableHeader>
                  <TableHeader className="delete-column">
                    {t("DELETE")}
                  </TableHeader>
                </TableRow>
              </thead>
              <tbody>
                {importLogs.length > 0 ? (
                  importLogs.map((log: ImportLog) => (
                    <TableRow key={log.id}>
                      <TableCell>{log.id}</TableCell>
                      <TableCell>{log.file_name}</TableCell>
                      <TableCell>{log.sheet_name}</TableCell>

                      <TableCell
                        className={
                          log.status === "imported" ? "imported" : "failed"
                        }
                        style={{ textTransform: "uppercase" }}
                      >
                        {log.status === "imported"
                          ? t("IMPORTED")
                          : t("FAILED")}
                      </TableCell>
                      <TableCell>
                        {dayjs(log.created_at).format("DD.MM.YYYY HH:mm:ss")}
                      </TableCell>
                      <TableCell className="delete-column">
                        <DeleteButton onClick={() => openDeleteModal(log.id)}>
                          <img src={deleteIcon} alt="Delete" />
                        </DeleteButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4}>{t("NO_DATA_AVAILABLE")}</TableCell>
                  </TableRow>
                )}
              </tbody>
            </Table>
          </TableContainer>
        </PageContentSection>
      </PageContent>
      <ConfirmDeleteImportModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={handleDelete}
      />
      {previewData && (
        <ImportPreviewModal
          show={showPreviewModal}
          handleClose={() => {
            setShowPreviewModal(false);
            resetFileState();
          }}
          handleConfirm={handleConfirmImport}
          initialName={previewData.name}
          initialColumns={previewData.columns}
          initialRows={previewData.rows}
          rowCount={previewData.rows.length}
        />
      )}
    </Container>
  );
};

export default Import;
