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

  // let lastRef;
  // let query2;
  // entriesRef.get().then((doc) => console.log("docs", doc.docs));
  // query.get().then((doc) => {
  //   lastRef = doc.docs[0];
  //   console.log(lastRef);
  //   query2 = entriesRef.orderBy("createdAt").startAfter(lastRef).limit(1);
  //   query2.get().then((snapshot) => {
  //     snapshot.forEach((doc) => console.log(doc.data()));
  //   });
  // });

  const [entries, loading] = useCollectionData<EntryItem>(que, {
    idField: "id",
  });

  // entriesRef
  //   .get()
  //   .then((doc) => doc.forEach((item) => console.log(item.data())));

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SearchEntry>({
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
      // setCsvData(JSON.stringify(entries));
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
      setQue(
        entriesRef
          .orderBy("createdAt")
          .startAfter(entries[LIMIT - 1].createdAt)
          .limit(LIMIT)
      );
    }
  };

  const handleBack = () => {
    if (entries) {
      setQue(
        entriesRef
          .orderBy("createdAt")
          .endBefore(entries[0].createdAt)
          .limit(LIMIT)
      );
    }
  };

  console.log(entries);
  return (
    <Layout title={"エントリー一覧"}>
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
            text={"検索"}
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
              CSVダウンロード
            </CsvDownload>
            <table className="table-auto">
              <thead>
                <tr>
                  <TableTitle>ID</TableTitle>
                  <TableTitle>氏名</TableTitle>
                  <TableTitle>Email</TableTitle>
                  <TableTitle>詳細</TableTitle>
                </tr>
              </thead>
              <tbody>
                {entries?.map((entry) => (
                  <tr key={entry.id}>
                    <TableRow>{entry.id.slice(-4)}</TableRow>
                    <TableRow>{entry.name}</TableRow>
                    <TableRow>{entry.email}</TableRow>
                    <TableCellLink>
                      <NavLink to={`/entrylist/${entry.id}`}>[詳細]</NavLink>
                    </TableCellLink>
                  </tr>
                ))}
                <tr>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <ButtonField>
              <button onClick={handleBack}>{"< 戻る"}</button>
              <button onClick={handleMore}>{"次へ >"}</button>
            </ButtonField>
          </div>
        )}
      </>
    </Layout>
  );
}
