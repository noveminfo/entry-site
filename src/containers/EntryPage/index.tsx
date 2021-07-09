import React, { ReactElement } from "react";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import tw from "twin.macro";
import { Controller, useForm } from "react-hook-form";

import Layout from "../../components/Layout";
import { db, firestoreTimeStamp, functions } from "../../firebase";
import { TextInput } from "../../components/TextInput";
import { SelectInput } from "../../components/SelectInput";
import Button from "../../components/Button";
import { EntryItem } from "../../types";

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

export default function EntryPage(): ReactElement {
  const jobsRef = db.collection("jobs");
  const [jobs] = useCollectionDataOnce(jobsRef);

  const entriesRef = db.collection("entries").doc();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EntryItem>();

  const addEntry = async (data: EntryItem) => {
    await entriesRef
      .set({
        ...data,
        age: Number(data.age),
        status: "受付",
        reason: data.reason ?? "",
        createdAt: firestoreTimeStamp,
      })
      .then(() => {
        const sendMail = functions.httpsCallable("emailSender");
        sendMail(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Layout title={"エントリー"}>
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
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
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
        <Button
          text={"申込み"}
          className={"w-28 my-4 mx-6"}
          onClick={handleSubmit(addEntry)}
        />
      </>
    </Layout>
  );
}
