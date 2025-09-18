"use client";

import { createContext, useContext, useState } from "react";

const FormContext = createContext({});

export function FormProvider({ children }) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [classification, setClassification] = useState("ind");
  const [etc, setEtc] = useState("");
  const [career, setCareer] = useState("0");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [checkedInter, setCheckedInter] = useState([]);

  const [countries, setCountries] = useState([]);

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
        tel,
        setTel,
        email,
        setEmail,
        checkedInter,
        setCheckedInter,
        countries,
        setCountries,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useForm() {
  return useContext(FormContext);
}
