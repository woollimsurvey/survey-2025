"use client";

import { createContext, useContext, useState } from "react";

const FormContext = createContext({});

export function FormProvider({ children }) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [classification, setClassification] = useState("");
  const [etc, setEtc] = useState("");
  const [career, setCareer] = useState("");
  const [tel1, setTel1] = useState("");
  const [tel2, setTel2] = useState("");
  const [tel3, setTel3] = useState("");
  const [email, setEmail] = useState("");
  const [checkedInter, setCheckedInter] = useState([]);
  const [settingInter, setSettingInter] = useState(false);
  const [settingPer, setSettingPer] = useState(false);
  const [settingMonth, setSettingMonth] = useState(false);
  const [largeWay, setLargeWay] = useState([]);

  return (
    <FormContext.Provider
      value={{
        name,
        setName,
        company,
        setCompany,
        position,
        setPosition,
        classification,
        setClassification,
        etc,
        setEtc,
        career,
        setCareer,
        tel1,
        setTel1,
        tel2,
        setTel2,
        tel3,
        setTel3,
        email,
        setEmail,
        checkedInter,
        setCheckedInter,
        settingInter,
        setSettingInter,
        settingPer,
        setSettingPer,
        settingMonth,
        setSettingMonth,
        largeWay,
        setLargeWay,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useForm() {
  return useContext(FormContext);
}
