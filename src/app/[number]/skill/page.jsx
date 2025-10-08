"use client";

import { useState, useEffect, use } from "react";
import Form from "next/form";
import { useRouter } from "next/navigation";
import { Box, LinearProgress, Typography, Tooltip } from "@mui/material";

import { Heading } from "@/components/heading";
import { Badge } from "@/components/badge";
import { Text } from "@/components/text";
import { Label } from "@/components/fieldset";
import { Radio, RadioGroup } from "@/components/radio";
import { Button } from "@/components/button";

import { useForm } from "@/contexts/FormContext";

export default function Skill({ params }) {
  const router = useRouter();

  const { number } = use(params);

  const { checkedInter, setCheckedInter, settingSkill, setSettingSkill } =
    useForm();

  const [error, setError] = useState("");

  const handleCounSkill = (e, inter) => {
    setCheckedInter((prevInter) =>
      prevInter.map((prev) => {
        if (prev.code === inter.code) {
          return { ...prev, countrySkill: e };
        }

        return prev;
      })
    );
  };

  const handleKrSkill = (e, inter) => {
    setCheckedInter((prevInter) =>
      prevInter.map((prev) => {
        if (prev.code === inter.code) {
          return { ...prev, krSkill: e };
        }

        return prev;
      })
    );
  };

  const handlePrev = () => {
    setSettingSkill(true);

    router.push(`/${number}/effect`);
  };

  const handleNext = async () => {
    if (
      checkedInter.some((inter) => {
        if (inter.country !== "kr") {
          return inter.countrySkill === "";
        }

        return false;
      }) ||
      checkedInter.some((inter) => inter.krSkill === "")
    ) {
      setError("모든 중분류에 대해 기술성숙도를 선택해주세요.");

      return;
    }

    setSettingSkill(true);

    router.push(`/${number}/independence`);
  };

  useEffect(() => {
    if (!settingSkill) {
      setCheckedInter((prevInter) =>
        prevInter.map((inter) => {
          return {
            ...inter,
            countrySkill: "",
            krSkill: "",
          };
        })
      );
    }
  }, []);

  return (
    <Form action={handleNext}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress
            variant="determinate"
            value={54}
            sx={{ height: 35 }}
          />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body1">54%</Typography>
        </Box>
      </Box>
      <header className="my-3 p-3 bg-gray-50">
        <Heading level={2}>
          <Badge className="align-middle">3</Badge> 기술수준조사
        </Heading>
      </header>
      <main>
        <Heading level={4}>
          3Q-7. (기술성숙도)&nbsp;
          <span className="font-normal">
            선택하신 중분류 기술별 최고기술국과 우리나라의 기술 성숙도를 아래
            설명을 참고하시어 적정 단계를 선택해주시기
            <br />
            바랍니다.
          </span>
        </Heading>
        <Text className="indent-4">
          ※ 기술성숙도 : 특정 기술이 실제 제품이나 시스템에 적용되기 전, 기술의
          성숙도를 객관적으로 평가하기 위한 9단계의 기준
        </Text>
        <section className="my-4">
          <Heading level={5} className="my-2 text-center">
            &lt; 기술성숙도 단계별 설명 &gt;
          </Heading>
          <div className="grid grid-cols-[2fr_3fr] border">
            <div className="border-r border-b bg-gray-100 text-lg font-bold text-center leading-8">
              기술성숙도 구분
            </div>
            <div className="border-b bg-gray-100 text-lg font-bold text-center leading-8">
              설명
            </div>
            <div className="flex justify-center items-center border-r border-b">
              ① 기초연구 단계(TRL 1~2)
            </div>
            <div className="border-b pl-6">
              <ul className="list-disc">
                <li>TRL1 : 기초이론 또는 기초실험의 단계</li>
                <li>
                  TRL2 : 실용을 목적으로 한 아이디어나 특허 등의 개념정립 단계
                  단계
                </li>
              </ul>
            </div>
            <div className="flex justify-center items-center border-r border-b">
              ② 실험연구 단계(TRL 3~4)
            </div>
            <div className="border-b pl-6">
              <ul className="list-disc">
                <li>TRL3 : 실험실 규모의 기본 성능을 검증하는 단계</li>
                <li>
                  TRL4 : 실험실 규모의 소재·부품·시스템 핵심성능을 평가하는 단계
                </li>
              </ul>
            </div>
            <div className="flex justify-center items-center border-r border-b">
              ③ 시작품 단계(TRL 5~6)
            </div>
            <div className="border-b pl-6">
              <ul className="list-disc">
                <li>
                  TRL5 : 확정된 소재·부품·시스템의 시작품을 제작하고 성능을
                  평가하는 단계
                </li>
                <li>
                  TRL6 : 파일럿 규모의 시작품을 제작하고 성능을 평가하는 단계
                </li>
              </ul>
            </div>
            <div className="flex justify-center items-center border-r border-b">
              ④ 실용화 단계(TRL 7~8)
            </div>
            <div className="border-b pl-6">
              <ul className="list-disc">
                <li>TRL7 : 신뢰성 평가 및 수요기업을 평가하는 단계</li>
                <li>TRL8 : 시제품의 인증과 표준화를 수행하는 단계</li>
              </ul>
            </div>
            <div className="flex justify-center items-center border-r">
              ⑤ 사업화 단계(TRL 9)
            </div>
            <div className="pl-6">
              <ul className="list-disc">
                <li>TRL9 : 본격적으로 제품을 양산하는 단계</li>
              </ul>
            </div>
          </div>
        </section>
        <section className="mt-4 border-t border-r border-l text-center">
          <article className="grid grid-cols-[3fr_2fr_10fr] border-b bg-gray-100 text-xl font-bold">
            <div className="flex justify-center items-center border-r">
              중분류
            </div>
            <div className="flex justify-center items-center border-r">
              국가 구분
            </div>
            <div className="grid grid-cols-[2fr_2fr_2fr_2fr_2fr]">
              <div className="col-span-5 border-b leading-10">기술성숙도</div>
              <div className="border-r p-2">
                ① 기초연구 단계
                <br />
                (TRL 1~2)
              </div>
              <div className="border-r p-2">
                ② 실험 단계
                <br />
                (TRL 3~4)
              </div>
              <div className="border-r p-2">
                ③ 시작품 단계
                <br />
                (TRL 5~6)
              </div>
              <div className="border-r p-2">
                ④ 실용화 단계
                <br />
                (TRL 7~8)
              </div>
              <div className="p-2">
                ⑤ 사업화 단계
                <br />
                (TRL 9)
              </div>
            </div>
          </article>
          {checkedInter
            .sort((a, b) => a.id - b.id)
            .map((inter) => (
              <article key={inter.id} className="grid grid-cols-[3fr_12fr]">
                <div className="row-span-2 flex justify-center items-center border-b bg-blue-950 p-2 text-lg font-bold text-white">
                  {inter.intermediate}
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
                  name="countrySkill"
                  aria-label="countrySkill"
                  className="grid grid-cols-[2fr_2fr_2fr_2fr_2fr_2fr] border-b"
                  value={inter.countrySkill || ""}
                  onChange={(e) => handleCounSkill(e, inter)}
                  disabled={inter.country === "kr"}
                >
                  <div className="m-0 border-r p-1 text-lg font-bold whitespace-pre-line">
                    {inter.country === "kr" && "최고 기술국(한국)"}
                    {inter.country === "us" && "최고 기술국(미국)"}
                    {inter.country === "cn" && "최고 기술국(중국)"}
                    {inter.country === "jp" && "최고 기술국(일본)"}
                    {inter.country === "eu" && `최고 기술국(${inter.euName})`}
                    {inter.country === "etc" && `최고 기술국(${inter.etcName})`}
                  </div>
                  <Label
                    htmlFor={`coun1${inter.id}`}
                    className={`flex justify-center items-center m-0 border-r ${
                      inter.country === "kr" && "bg-gray-400"
                    }`}
                  >
                    {inter.country === "kr" ? (
                      <Tooltip
                        title={
                          <Typography variant="body1">
                            귀하는 ‘3Q-2’ 설문 문항에서 해당 중분류의
                            최고기술국으로 ‘한국’으로 선택하셨습니다.
                          </Typography>
                        }
                      >
                        <Radio id={`coun1${inter.id}`} value="1" />
                      </Tooltip>
                    ) : (
                      <Radio id={`coun1${inter.id}`} value="1" />
                    )}
                  </Label>
                  <Label
                    htmlFor={`coun2${inter.id}`}
                    className={`flex justify-center items-center m-0 border-r ${
                      inter.country === "kr" && "bg-gray-400"
                    }`}
                  >
                    {inter.country === "kr" ? (
                      <Tooltip
                        title={
                          <Typography variant="body1">
                            귀하는 ‘3Q-2’ 설문 문항에서 해당 중분류의
                            최고기술국으로 ‘한국’으로 선택하셨습니다.
                          </Typography>
                        }
                      >
                        <Radio id={`coun2${inter.id}`} value="2" />
                      </Tooltip>
                    ) : (
                      <Radio id={`coun2${inter.id}`} value="2" />
                    )}
                  </Label>
                  <Label
                    htmlFor={`coun3${inter.id}`}
                    className={`flex justify-center items-center m-0 border-r ${
                      inter.country === "kr" && "bg-gray-400"
                    }`}
                  >
                    {inter.country === "kr" ? (
                      <Tooltip
                        title={
                          <Typography variant="body1">
                            귀하는 ‘3Q-2’ 설문 문항에서 해당 중분류의
                            최고기술국으로 ‘한국’으로 선택하셨습니다.
                          </Typography>
                        }
                      >
                        <Radio id={`coun3${inter.id}`} value="3" />
                      </Tooltip>
                    ) : (
                      <Radio id={`coun3${inter.id}`} value="3" />
                    )}
                  </Label>
                  <Label
                    htmlFor={`coun4${inter.id}`}
                    className={`flex justify-center items-center m-0 border-r ${
                      inter.country === "kr" && "bg-gray-400"
                    }`}
                  >
                    {inter.country === "kr" ? (
                      <Tooltip
                        title={
                          <Typography variant="body1">
                            귀하는 ‘3Q-2’ 설문 문항에서 해당 중분류의
                            최고기술국으로 ‘한국’으로 선택하셨습니다.
                          </Typography>
                        }
                      >
                        <Radio id={`coun4${inter.id}`} value="4" />
                      </Tooltip>
                    ) : (
                      <Radio id={`coun4${inter.id}`} value="4" />
                    )}
                  </Label>
                  <Label
                    htmlFor={`coun5${inter.id}`}
                    className={`flex justify-center items-center m-0 ${
                      inter.country === "kr" && "bg-gray-400"
                    }`}
                  >
                    {inter.country === "kr" ? (
                      <Tooltip
                        title={
                          <Typography variant="body1">
                            귀하는 ‘3Q-2’ 설문 문항에서 해당 중분류의
                            최고기술국으로 ‘한국’으로 선택하셨습니다.
                          </Typography>
                        }
                      >
                        <Radio id={`coun5${inter.id}`} value="5" />
                      </Tooltip>
                    ) : (
                      <Radio id={`coun5${inter.id}`} value="5" />
                    )}
                  </Label>
                </RadioGroup>
                <RadioGroup
                  name="krSkill"
                  aria-label="krSkill"
                  className="grid grid-cols-[2fr_2fr_2fr_2fr_2fr_2fr] border-b"
                  value={inter.krSkill || ""}
                  onChange={(e) => handleKrSkill(e, inter)}
                >
                  <div className="m-0 border-r p-1 text-lg font-bold">한국</div>
                  <Label
                    htmlFor={`kr1${inter.id}`}
                    className="flex justify-center items-center m-0 border-r"
                  >
                    <Radio id={`kr1${inter.id}`} value="1" />
                  </Label>
                  <Label
                    htmlFor={`kr2${inter.id}`}
                    className="flex justify-center items-center m-0 border-r"
                  >
                    <Radio id={`kr2${inter.id}`} value="2" />
                  </Label>
                  <Label
                    htmlFor={`kr3${inter.id}`}
                    className="flex justify-center items-center m-0 border-r"
                  >
                    <Radio id={`kr3${inter.id}`} value="3" />
                  </Label>
                  <Label
                    htmlFor={`kr4${inter.id}`}
                    className="flex justify-center items-center m-0 border-r"
                  >
                    <Radio id={`kr4${inter.id}`} value="4" />
                  </Label>
                  <Label
                    htmlFor={`kr5${inter.id}`}
                    className="flex justify-center items-center m-0"
                  >
                    <Radio id={`kr5${inter.id}`} value="5" />
                  </Label>
                </RadioGroup>
              </article>
            ))}
        </section>
        <Text>
          * 기술성숙도를 국내 기술과 최고기술국의 기술을 각각 평가해주시기
          바랍니다.
        </Text>
      </main>
      <footer className="my-4">
        <div className="text-red-700 text-right">{error}</div>
        <div className="flex justify-end gap-4">
          <Button onClick={handlePrev}>이전</Button>
          <Button type="submit">다음</Button>
        </div>
      </footer>
    </Form>
  );
}
