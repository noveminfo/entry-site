import React, { useState, useEffect, ReactElement } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import { Controller, useForm } from "react-hook-form";
import CsvDownload from "react-json-to-csv";

import Layout from "../../components/Layout";
import { TextInput } from "../../components/TextInput";
import Button from "../../components/Button";
import { db } from "../../firebase";
import { EntryItem, SearchEntry } from "../../types";
import { Data } from "react-firebase-hooks/firestore/dist/firestore/types";

const InputField = styled.div`
  ${tw`
    flex
    flex-nowrap
    pb-16
  `}
`;

const TableTitle = styled.th`
  ${tw`
    border-2
    px-4
    border-blue-600
    bg-blue-100
  `}
`;

const TableRow = styled.td`
  ${tw`
    border-2
    border-solid
    px-4
    border-blue-600
    text-center
  `}
`;

const TableCellLink = styled(TableRow)`
  ${tw`
    text-blue-400
    cursor-pointer
    hover:underline
  `}
`;

const ButtonField = styled.div`
  ${tw`
    flex
    justify-between
  `}
`;

export default function EntryListPage(): ReactElement {
  const LIMIT = 10;
  const entriesRef = db.collection("entries");
  const query = entriesRef.orderBy("createdAt").limit(LIMIT);
  const [que, setQue] = useState(query);
  const [csvData, setCsvData] = useState<Data<EntryItem, "", "">[]>([]);
  const [firstDocList, setFirstDocList] = useState<EntryItem[]>([]);
  const [page, setPage] = useState(0);

  const [entries, loading] = useCollectionData<EntryItem>(que, {
    idField: "id",
  });

  const { control, handleSubmit } = useForm<SearchEntry>({
    defaultValues: {
      word: "",
    },
  });

  const searchEntry = (data: SearchEntry) => {
    console.log(data);
    if (data.word.includes("@")) {
      setQue(entriesRef.where("email", "==", data.word));
    } else if (data.word !== "") {
      setQue(entriesRef.where("name", "==", data.word));
    } else {
      setQue(query);
    }
  };

  useEffect(() => {
    if (entries) {
      const tmpEntries = entries.map((entry) => ({
        ...entry,
        createdAt: entry.createdAt?.toDate().toLocaleString(),
        updatedAt: entry.updatedAt?.toDate().toLocaleString(),
      }));
      setCsvData(tmpEntries);
    }
  }, [entries]);

  const handleMore = () => {
    if (entries && entries[LIMIT - 1]) {
      setFirstDocList([...firstDocList, entries[0]]);
      setQue(
        entriesRef
          .orderBy("createdAt")
          .startAfter(entries[LIMIT - 1].createdAt)
          .limit(LIMIT)
      );
      setPage((value) => value + 1);
    }
  };

  const handleBack = () => {
    if (entries && firstDocList[page - 1]) {
      setQue(
        entriesRef
          .orderBy("createdAt")
          .startAt(firstDocList[page - 1].createdAt)
          .endBefore(entries[0].createdAt)
          .limit(LIMIT)
      );
      setPage((value) => value - 1);
    }
  };

  return (
    <Layout title={"?????????????????????"}>
      <>
        <InputField>
          <Controller
            name="word"
            control={control}
            render={({ field }) => (
              <TextInput className={"w-52"} type="text" {...field} />
            )}
          />
          <Button
            text={"??????"}
            className={"w-20 py-0 mx-6"}
            onClick={handleSubmit(searchEntry)}
          />
        </InputField>
        {loading ? (
          <p>Loading...</p>
        ) : entries?.length === 0 ? (
          <p>No Entry.</p>
        ) : (
          <div className="relative">
            <CsvDownload data={csvData} className="absolute -top-6 right-0">
              CSV??????????????????
            </CsvDownload>
            <table className="table-auto">
              <thead>
                <tr>
                  <TableTitle>ID</TableTitle>
                  <TableTitle>??????</TableTitle>
                  <TableTitle>Email</TableTitle>
                  <TableTitle>??????</TableTitle>
                </tr>
              </thead>
              <tbody>
                {entries?.map((entry) => (
                  <tr key={entry.id}>
                    <TableRow>{entry.id.slice(-4)}</TableRow>
                    <TableRow>{entry.name}</TableRow>
                    <TableRow>{entry.email}</TableRow>
                    <TableCellLink>
                      <NavLink to={`/entrylist/${entry.id}`}>[??????]</NavLink>
                    </TableCellLink>
                  </tr>
                ))}
                <tr>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <ButtonField>
              <button onClick={handleBack}>{"< ??????"}</button>
              <button onClick={handleMore}>{"?????? >"}</button>
            </ButtonField>
          </div>
        )}
      </>
    </Layout>
  );
}
