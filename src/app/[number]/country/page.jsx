"use client";

import { useState, use } from "react";
import Form from "next/form";
import { useRouter } from "next/navigation";
import { Box, LinearProgress, Typography, Tooltip } from "@mui/material";

import { Heading } from "@/components/heading";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { Text } from "@/components/text";
import { Label } from "@/components/fieldset";
import { Radio, RadioGroup } from "@/components/radio";
import { Input } from "@/components/input";

import { useForm } from "@/contexts/FormContext";

export default function Country({ params }) {
  const router = useRouter();

  const { number } = use(params);

  const {
    checkedInter,
    setCheckedInter,
    setSettingPer,
    setSettingMonth,
    setSettingSkill,
  } = useForm();

  const [error, setError] = useState("");

  const handleChangeCountry = (e, inter) => {
    setCheckedInter((prevInter) =>
      prevInter.map((prev) => {
        if (prev.code === inter.code) {
          return { ...prev, country: e };
        }

        return prev;
      })
    );

    setSettingPer(false);
    setSettingMonth(false);
    setSettingSkill(false);
  };

  const handleNext = () => {
    if (!checkedInter.every((inter) => "country" in inter)) {
      setError("모든 중분류에 대해 최고기술 보유국을 선택해주세요.");

      return;
    }

    router.push(`/${number}/level`);
  };

  return (
    <Form action={handleNext}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress variant="determinate" value={0} sx={{ height: 35 }} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="h6">0%</Typography>
        </Box>
      </Box>
      <header className="my-3 p-3 bg-gray-50">
        <Heading level={2}>
          <Badge className="align-middle">3</Badge> 기술수준조사
        </Heading>
      </header>
      <main>
        <section className="flex justify-evenly items-center gap-8 border p-1">
          <div className="text-lg font-bold">
            {number !== "W"
              ? "기술수준조사 수행 전 과년도(2023년)에 수행된 기술수준조사 결과를 다운받아 응답 시 참고해주시기 바랍니다."
              : "'양자 분야'는 2025년 새롭게 신설된 분류로, 과년도 기술수준조사 결과가 없습니다. 응답자의 견해를 바탕으로 응답해주시기 바랍니다."}
          </div>
          <div className="border">
            <div className="bg-gray-100 p-4 text-xl font-bold">
              과년도 조사결과 다운로드
            </div>
            <div className="p-2 text-center">
              {number !== "W" ? (
                <Button
                  href={`https://sisfrqtridudubgcsuoe.supabase.co/storage/v1/object/public/keit/${number}.pdf`}
                  target="_blank"
                  color="red"
                >
                  PDF 파일
                </Button>
              ) : (
                <Button color="red" disabled>
                  PDF 파일
                </Button>
              )}
            </div>
          </div>
        </section>
        <h3 className="my-4 text-3xl font-semibold text-zinc-950">
          □ (기술성) 위원님께서 선택하신 중분류 기술의 기술성(기술수준, 기술격차
          등)을 객관적으로 평가해주시기
          <br />
          바랍니다.
        </h3>
        <Heading level={4}>
          3Q-1. (최고기술 보유국)&nbsp;
          <span className="font-normal">
            한국, 미국, 중국, 일본, 유럽 중 2025년 현재 분야 내 기술의 최상위
            국가와 최고기술 보유기관을 제시해주시기 바랍니다.
          </span>
        </Heading>
        <Text className="indent-4">
          ※ 유럽의 경우, 유럽 내 최상위 기술 국가명(1개)을 제시해주시기
          바랍니다.
        </Text>
        <section className="my-2 border-t border-r border-l text-center">
          <article className="grid grid-cols-[4fr_12fr_4fr] border-b">
            <div className="border-r bg-gray-100 text-xl font-bold leading-20">
              중분류
            </div>
            <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_4fr_3fr]">
              <div className="col-span-7 border-r border-b bg-gray-100 text-xl font-bold leading-10">
                최고기술 보유국
              </div>
              <div className="border-r bg-gray-100 text-xl font-bold leading-10">
                한국
              </div>
              <div className="border-r bg-gray-100 text-xl font-bold leading-10">
                미국
              </div>
              <div className="border-r bg-gray-100 text-xl font-bold leading-10">
                중국
              </div>
              <div className="border-r bg-gray-100 text-xl font-bold leading-10">
                일본
              </div>
              <div className="border-r bg-gray-100 text-xl font-bold leading-10">
                유럽
              </div>
              <div className="border-r bg-gray-100 text-xl font-bold leading-10">
                유럽국가명*
              </div>
              <div className="border-r bg-gray-100 text-xl font-bold leading-10">
                기타
              </div>
            </div>
            <div className="flex justify-center items-center bg-gray-100 text-xl font-bold">
              최고기술
              <br />
              보유기관
            </div>
          </article>
          {checkedInter
            .sort((a, b) => a.id - b.id)
            .map((inter) => (
              <article key={inter.id} className="grid grid-cols-[4fr_12fr_4fr]">
                <div className="border-b bg-blue-950 p-2 text-lg font-bold text-white whitespace-pre-line">
                  {inter.intermediate.split(" ").reduce((acc, word, index) => {
                    acc +=
                      (index + 1) % 3 === 0
                        ? `${word}${
                            index !== inter.intermediate.split(" ").length - 1
                              ? "\n"
                              : "\t"
                          }`
                        : `${word}\t`;

                    return acc;
                  }, "")}
                  <Tooltip
                    title={
                      <Typography variant="body1">
                        {inter.description}
                      </Typography>
                    }
                  >
                    <button type="button" className="text-red-400">
                      (!)
                    </button>
                  </Tooltip>
                </div>
                <RadioGroup
                  name="country"
                  aria-label="country"
                  className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_4fr_3fr]"
                  onChange={(e) => handleChangeCountry(e, inter)}
                  defaultValue={inter.country}
                >
                  <Label
                    htmlFor={`kr${inter.id}`}
                    className="flex justify-center items-center m-0 border-r border-b"
                  >
                    <Radio id={`kr${inter.id}`} value="kr" />
                  </Label>
                  <Label
                    htmlFor={`us${inter.id}`}
                    className="flex justify-center items-center m-0 border-r border-b"
                  >
                    <Radio id={`us${inter.id}`} value="us" />
                  </Label>
                  <Label
                    htmlFor={`cn${inter.id}`}
                    className="flex justify-center items-center m-0 border-r border-b"
                  >
                    <Radio id={`cn${inter.id}`} value="cn" />
                  </Label>
                  <Label
                    htmlFor={`jp${inter.id}`}
                    className="flex justify-center items-center m-0 border-r border-b"
                  >
                    <Radio id={`jp${inter.id}`} value="jp" />
                  </Label>
                  <Label
                    htmlFor={`eu${inter.id}`}
                    className="flex justify-center items-center m-0 border-r border-b"
                  >
                    <Radio id={`eu${inter.id}`} value="eu" />
                  </Label>
                  <div className="flex items-center m-0 border-r border-b px-2">
                    <Input
                      aria-label="euName"
                      name="euName"
                      value={
                        checkedInter.find((ele) => ele.code === inter.code)
                          ?.euName || ""
                      }
                      onChange={({ target }) =>
                        setCheckedInter((prevList) =>
                          prevList.map((prev) => {
                            if (prev.code === inter.code) {
                              return { ...prev, euName: target.value };
                            }

                            return prev;
                          })
                        )
                      }
                      disabled={
                        checkedInter.find((ele) => ele.code === inter.code)
                          ?.country !== "eu"
                      }
                      required={inter.country === "eu"}
                    />
                  </div>
                  <Label
                    htmlFor={`etc${inter.id}`}
                    className="flex items-center gap-1 border-r border-b px-2"
                  >
                    <Radio id={`etc${inter.id}`} value="etc" />
                    <Input
                      aria-label="etcName"
                      name="etcName"
                      value={
                        checkedInter.find((ele) => ele.code === inter.code)
                          ?.etcName || ""
                      }
                      onChange={({ target }) =>
                        setCheckedInter((prevList) =>
                          prevList.map((prev) => {
                            if (prev.code === inter.code) {
                              return { ...prev, etcName: target.value };
                            }

                            return prev;
                          })
                        )
                      }
                      disabled={
                        checkedInter.find((ele) => ele.code === inter.code)
                          ?.country !== "etc"
                      }
                      required={inter.country === "etc"}
                    />
                  </Label>
                </RadioGroup>
                <div className="flex items-center border-b px-2">
                  <Input
                    aria-label="institution"
                    name="institution"
                    value={
                      checkedInter.find((ele) => ele.code === inter.code)
                        ?.institution || ""
                    }
                    onChange={({ target }) =>
                      setCheckedInter((prevList) =>
                        prevList.map((prev) => {
                          if (prev.code === inter.code) {
                            return { ...prev, institution: target.value };
                          }

                          return prev;
                        })
                      )
                    }
                  />
                </div>
              </article>
            ))}
        </section>
        <Text>* 유럽 국가 선택 시 작성하며, 단일 국가만 제시</Text>
        <Text>※ 기타 선택 시 해당 국가명 기재</Text>
      </main>
      <footer className="my-2 text-right">
        <div className="text-red-700">{error}</div>
        <Button type="submit">다음</Button>
      </footer>
    </Form>
  );
}
