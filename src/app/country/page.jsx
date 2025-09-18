"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Heading } from "@/components/heading";
import { Badge } from "@/components/badge";
import { Text } from "@/components/text";
import { Radio, RadioGroup } from "@/components/radio";
import { Input } from "@/components/input";
import { Button } from "@/components/button";

import { useForm } from "@/contexts/FormContext";

import { supabase } from "@/libs/supabaseClient";

export default function Country() {
  const router = useRouter();

  const {
    name,
    company,
    position,
    classification,
    etc,
    career,
    tel,
    email,
    checkedInter,
    countries,
    setCountries,
  } = useForm();

  const handleNext = async () => {
    const { error } = await supabase.from("form").insert(
      checkedInter.map((inter) => {
        return {
          name,
          company,
          position,
          classification,
          etc,
          career,
          tel,
          email,
          intermediate: inter.intermediate,
          code: inter.code,
        };
      })
    );

    error && console.error(error);
  };

  useEffect(() => {
    setCountries(
      checkedInter.map((inter) => {
        return { code: inter.code, country: "kr" };
      })
    );
  }, []);

  return (
    <div>
      <header className="my-3 p-3 bg-gray-50">
        <Heading level={2}>
          <Badge className="align-middle">3</Badge> 기술수준조사
        </Heading>
      </header>
      <main>
        <section className="flex items-center gap-8">
          <div>
            기술수준조사 수행 전 과년도(2023년)에 수행된 기술수준조사 결과를
            다운받아 응답 시 참고해주시기 바랍니다.
          </div>
          <div className="border">
            <div className="bg-gray-100 p-4 text-lg font-bold">
              과년도 조사결고 다운로드
            </div>
            <div className="p-4 text-red-400 text-center">PDF 파일</div>
          </div>
        </section>
        <Heading level={3} className="my-4">
          □ (기술성) 위원님께서 선택하신 중분류 기술들의 기술성을 평가할 수 있는
          하위 문항에 응답해주시기 바랍니다.
        </Heading>
        <Heading level={4}>
          3Q-1. (최고기술 보유국)&nbsp;
          <span className="font-normal">
            한국, 미국, 중국, 일본, 유럽 중 2025년 현재 분야 내 기술의 최상위
            국가와 최고기술 보유기관을 제시해주시기 바랍니다.
          </span>
        </Heading>
        <Text className="indent-4">
          ※ 유럽의 경우, 유럽 내 최상위 기술 국가명을 제시해주시기 바랍니다.
        </Text>
        <section className="my-2 border-t border-r border-l text-center">
          <article className="grid grid-cols-[1fr_8fr_1fr] border-b">
            <div className="border-r bg-gray-100 text-lg font-bold leading-24">
              중분류
            </div>
            <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_2fr_1fr]">
              <div className="col-span-7 border-r border-b bg-gray-100 text-lg font-bold leading-8">
                최고기술 보유국
              </div>
              <div className="border-r bg-gray-100 text-lg font-bold leading-16">
                한국
              </div>
              <div className="border-r bg-gray-100 text-lg font-bold leading-16">
                미국
              </div>
              <div className="border-r bg-gray-100 text-lg font-bold leading-16">
                중국
              </div>
              <div className="border-r bg-gray-100 text-lg font-bold leading-16">
                일본
              </div>
              <div className="border-r bg-gray-100 text-lg font-bold leading-16">
                유럽
              </div>
              <div className="flex justify-center items-center border-r bg-gray-100 text-lg font-bold">
                유럽국가명*
                <br />
                (복구 국가 제시 가능)
              </div>
              <div className="border-r bg-gray-100 text-lg font-bold leading-16">
                기타
              </div>
            </div>
            <div className="flex justify-center items-center bg-gray-100 text-lg font-bold">
              최고기술
              <br />
              보유기관
            </div>
          </article>
          {checkedInter
            .sort((a, b) => a.id - b.id)
            .map((inter) => (
              <article key={inter.id} className="grid grid-cols-[1fr_8fr_1fr]">
                <div className="border-r border-b bg-blue-950 p-1 text-lg font-bold text-white">
                  {inter.intermediate}
                </div>
                <RadioGroup
                  name="country"
                  aria-label="country"
                  className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_2fr_1fr]"
                  onChange={(e) => {
                    setCountries((prevList) =>
                      prevList.map((prev) => {
                        if (prev.code === inter.code) {
                          return { ...prev, country: e };
                        }

                        return prev;
                      })
                    );
                  }}
                  defaultValue="kr"
                >
                  <div className="flex justify-center items-center m-0 border-r border-b">
                    <Radio value="kr" />
                  </div>
                  <div className="flex justify-center items-center m-0 border-r border-b">
                    <Radio value="us" />
                  </div>
                  <div className="flex justify-center items-center m-0 border-r border-b">
                    <Radio value="cn" />
                  </div>
                  <div className="flex justify-center items-center m-0 border-r border-b">
                    <Radio value="jp" />
                  </div>
                  <div className="flex justify-center items-center m-0 border-r border-b">
                    <Radio value="eu" />
                  </div>
                  <div className="flex items-center m-0 border-r border-b px-2">
                    <Input
                      aria-label="euName"
                      name="euName"
                      value={
                        countries.find((ele) => ele.code === inter.code)
                          ?.euName || ""
                      }
                      onChange={({ target }) =>
                        setCountries((prevList) =>
                          prevList.map((prev) => {
                            if (prev.code === inter.code) {
                              return { ...prev, euName: target.value };
                            }

                            return prev;
                          })
                        )
                      }
                      disabled={
                        countries.find((ele) => ele.code === inter.code)
                          ?.country !== "eu"
                      }
                    />
                  </div>
                  <div className="flex items-center gap-1 border-r border-b px-2">
                    <Radio value="etc" />
                    <Input
                      aria-label="etcName"
                      name="etcName"
                      value={
                        countries.find((ele) => ele.code === inter.code)
                          ?.etcName || ""
                      }
                      onChange={({ target }) =>
                        setCountries((prevList) =>
                          prevList.map((prev) => {
                            if (prev.code === inter.code) {
                              return { ...prev, etcName: target.value };
                            }

                            return prev;
                          })
                        )
                      }
                      disabled={
                        countries.find((ele) => ele.code === inter.code)
                          ?.country !== "etc"
                      }
                    />
                  </div>
                </RadioGroup>
                <div className="flex items-center border-b px-2">
                  <Input
                    aria-label="institution"
                    name="institution"
                    value={
                      countries.find((ele) => ele.code === inter.code)
                        ?.institution || ""
                    }
                    onChange={({ target }) =>
                      setCountries((prevList) =>
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
        <Text>* 유럽 국가 선택 시 작성</Text>
        <Text>※ 기타 선택 시 해당 국가명 기재</Text>
      </main>
      <footer className="text-right">
        <Button onClick={handleNext}>다음</Button>
      </footer>
    </div>
  );
}
