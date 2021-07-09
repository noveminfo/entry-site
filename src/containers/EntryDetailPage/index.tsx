import React, { ReactElement } from "react";
import styled from "styled-components";
import tw from "twin.macro";

import Layout from "../../components/Layout";
import { SelectInput } from "../../components/SelectInput";
import { TextInput } from "../../components/TextInput";
import Button from "../../components/Button";
import { db, firestoreTimeStamp } from "../../firebase";
import {
  useCollectionDataOnce,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { useHistory, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { EntryItem } from "../../types";
import { useEffect } from "react";

const InputField = styled.div`
  ${tw`
    flex
    flex-nowrap
    w-80
    py-3
  `}
`;

const InputLabel = styled.span`
  ${tw`
    w-1/3
    text-left
    text-black
  `}
`;

const TextArea = styled.textarea`
  ${tw`
    px-2
    border-2
    border-solid
    border-blue-600
    text-black
    bg-white
    focus:outline-none
  `}
`;

const ErrorMessage = styled.p`
  ${tw`
    text-red-500
    text-sm
    
  `}
`;

export default function EntryDetailPage(): ReactElement {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const jobsRef = db.collection("jobs");
  const [jobs] = useCollectionDataOnce(jobsRef);

  const statusesRef = db.collection("statuses");
  const [statuses] = useCollectionDataOnce(statusesRef);

  const entriesRef = db.collection("entries").doc(id);
  const [entry, loading] = useDocumentData<EntryItem>(entriesRef);
  // console.log(entry);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EntryItem>({
    defaultValues: {
      id: "",
      name: "",
      email: "",
      age: 0,
      job: "",
      reason: "",
      status: "",
      createdAt: undefined,
      updatedAt: undefined,
    },
  });

  useEffect(() => {
    if (entry !== undefined) {
      setValue("name", entry.name);
      setValue("email", entry.email);
      setValue("age", entry.age);
      setValue("job", entry.job);
      setValue("reason", entry.reason ?? "");
      setValue("status", entry.status);
      setValue("createdAt", entry.createdAt);
    }
  }, [entry]);

  const updateEntry = async (data: EntryItem) => {
    // console.log(data);
    await entriesRef
      .update({
        ...data,
        age: Number(data.age),
        updatedAt: firestoreTimeStamp,
      })
      .then(() => console.log("ok"))
      .catch((err) => console.log(err));
  };

  const deleteEntry = async () => {
    await entriesRef
      .delete()
      .then(() => history.push("/entrylist"))
      .catch((err) => console.log(err));
  };

  // const loading = true;

  return (
    <Layout title={"エントリー詳細"}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <InputField>
            <InputLabel>氏名</InputLabel>
            <div>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextInput className={"w-52"} type="text" {...field} />
                )}
                rules={{ required: "氏名未入力" }}
              />
              {errors.name && (
                <ErrorMessage>{errors.name.message}</ErrorMessage>
              )}
            </div>
          </InputField>
          <InputField>
            <InputLabel>Email</InputLabel>
            <div>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextInput className={"w-52"} type="email" {...field} />
                )}
                rules={{ required: "Email未入力" }}
              />
              {errors.email && (
                <ErrorMessage>{errors.email.message}</ErrorMessage>
              )}
            </div>
          </InputField>
          <InputField>
            <InputLabel>年齢</InputLabel>
            <div>
              <Controller
                name="age"
                control={control}
                render={({ field }) => (
                  <TextInput className={"w-16"} type="number" {...field} />
                )}
                rules={{ required: "年齢未入力" }}
              />
              {errors.age && <ErrorMessage>{errors.age.message}</ErrorMessage>}
            </div>
            <InputLabel className="pl-2">歳</InputLabel>
          </InputField>
          <InputField>
            <InputLabel>希望職種</InputLabel>
            <div>
              <Controller
                name="job"
                control={control}
                render={({ field }) => (
                  <SelectInput className="w-52" data={jobs} {...field} />
                )}
                rules={{ validate: (value) => value !== "0" || "職種未選択" }}
              />
              {errors.job && <ErrorMessage>{errors.job.message}</ErrorMessage>}
            </div>
          </InputField>
          <InputField>
            <InputLabel>希望理由</InputLabel>
            <Controller
              name="reason"
              control={control}
              render={({ field }) => (
                <TextArea className="w-52" rows={5} {...field} />
              )}
            />
          </InputField>
          <InputField>
            <InputLabel>ステータス</InputLabel>
            <div>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <SelectInput className="w-52" data={statuses} {...field} />
                )}
                rules={{
                  validate: (value) => value !== "0" || "ステータス未選択",
                }}
              />
              {errors.status && (
                <ErrorMessage>{errors.status.message}</ErrorMessage>
              )}
            </div>
          </InputField>
          <div>
            <Button
              text={"更新する"}
              className={"w-28 my-4 mx-6 py-2"}
              onClick={handleSubmit(updateEntry)}
            />
            <Button
              text={"削除する"}
              className={"w-28 my-6 mx-6 py-2"}
              onClick={deleteEntry}
            />
          </div>
        </>
      )}
    </Layout>
  );
}
