"use client";

import { useState, use } from "react";
import Form from "next/form";
import { useRouter } from "next/navigation";
import { Box, LinearProgress, Typography, Tooltip } from "@mui/material";

import { Heading } from "@/components/heading";
import { Badge } from "@/components/badge";
import { Text, Strong } from "@/components/text";
import { Label } from "@/components/fieldset";
import { Radio, RadioGroup } from "@/components/radio";
import { Button } from "@/components/button";

import { useForm } from "@/contexts/FormContext";

export default function Independence({ params }) {
  const router = useRouter();

  const { number } = use(params);

  const { checkedInter, setCheckedInter } = useForm();

  const [error, setError] = useState("");

  const handleChangeInde = (e, inter) => {
    setCheckedInter((prevInter) =>
      prevInter.map((prev) => {
        if (prev.code === inter.code) {
          return { ...prev, independence: e };
        }

        return prev;
      })
    );
  };

  const handlePrev = () => {
    router.push(`/${number}/skill`);
  };

  const handleNext = () => {
    if (!checkedInter.every((inter) => "independence" in inter)) {
      setError("모든 중분류에 대해 기술 자립도를 선택해주세요.");

      return;
    }

    router.push(`/${number}/way`);
  };

  return (
    <Form action={handleNext}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress
            variant="determinate"
            value={63}
            sx={{ height: 35 }}
          />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body1">63%</Typography>
        </Box>
      </Box>
      <header className="my-3 p-3 bg-gray-50">
        <Heading level={2}>
          <Badge className="align-middle">3</Badge> 기술수준조사
        </Heading>
      </header>
      <main>
        <Heading level={4}>
          3Q-8. (기술 자립도)&nbsp;
          <span className="font-normal">
            아래 설명을 참고하시어 선택하신 기술분류별로 5개의 항목 중 기술
            자립도에 가장 적합한 구분자를 선택해주시기 바랍니다.
          </span>
        </Heading>
        <Text className="indent-4">
          ※ 기술 자립도 : 해외 기술 의존도 대비 국내 기술 자립 수준
        </Text>
        <section className="my-4">
          <Heading level={5} className="my-2 text-center">
            &lt; 기술 자립도 설명 &gt;
          </Heading>
          <div className="grid grid-cols-[1fr_1fr] border text-center">
            <div className="border-r border-b bg-gray-100 text-lg font-bold leading-8">
              기술 자립도 구분
            </div>
            <div className="border-b bg-gray-100 text-lg font-bold leading-8">
              설명
            </div>
            <div className="border-r border-b">
              ① 해외 기술 의존도가 매우 높음
              <br />
              (국내 자립도가 매우 낮음)
            </div>
            <div className=" border-b leading-12">
              <Strong>국내 단독 개발·생산·운영 불가</Strong>
            </div>
            <div className="border-r border-b">
              ② 해외 기술 의존도가 높음
              <br />
              (국내 자립도가 낮음)
            </div>
            <div className="border-b leading-12">
              <Strong>해외 기술 없이 제한적으로 운영 가능</Strong>
            </div>
            <div className="border-r border-b leading-12">
              ③ 해외·국내 기술 의존도가 비슷함
            </div>
            <div className="border-b leading-12">
              <Strong>
                핵심 요소 일부는 국내 내재화가 되어 있으나, 일부는 해외에 의존
              </Strong>
            </div>
            <div className="border-r border-b">
              ④ 국내 기술 자립도가 높음
              <br />
              (해외 기술 보조적으로만 활용)
            </div>
            <div className="border-b leading-12">
              <Strong>핵심기술 대부분을 국내에서 제작·운영 가능</Strong>
            </div>
            <div className="border-r">
              ⑤ 국내 독자적 기술 자립도가 매우 높음
              <br />
              (해외 의존도 거의 없음)
            </div>
            <div className="leading-12">
              <Strong>국내 공급만으로 안정적 생산/서비스 가능</Strong>
            </div>
          </div>
        </section>
        <section className="border-t border-r border-l text-center">
          <article className="grid grid-cols-[2fr_5fr] bg-gray-100 text-xl font-bold">
            <div className="flex justify-center items-center border-r border-b">
              중분류
            </div>
            <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr]">
              <div className="col-span-5 border-b leading-10">기술 자립도</div>
              <div className="border-r border-b p-2">
                ① 해외 기술
                <br />
                의존도가 매우 높음
              </div>
              <div className="border-r border-b p-2">
                ② 해외 기술
                <br />
                의존도가 높음
              </div>
              <div className="border-r border-b p-2">
                ③ 해외·국내 기술
                <br />
                의존도가 비슷함
              </div>
              <div className="border-r border-b p-2">
                ④ 국내 기술
                <br />
                자립도가 높음
              </div>
              <div className="border-b p-2">
                ⑤ 국내 독자적 기술 자립도가 매우 높음
              </div>
            </div>
          </article>
          {checkedInter
            .sort((a, b) => a.id - b.id)
            .map((inter) => (
              <article key={inter.id} className="grid grid-cols-[2fr_5fr]">
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
                  name="independence"
                  aria-label="independence"
                  className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] border-b"
                  onChange={(e) => handleChangeInde(e, inter)}
                  defaultValue={inter.independence}
                >
                  <Label
                    htmlFor={`1${inter.id}`}
                    className="flex justify-center items-center m-0 border-r"
                  >
                    <Radio id={`1${inter.id}`} value="1" />
                  </Label>
                  <Label
                    htmlFor={`2${inter.id}`}
                    className="flex justify-center items-center m-0 border-r"
                  >
                    <Radio id={`2${inter.id}`} value="2" />
                  </Label>
                  <Label
                    htmlFor={`3${inter.id}`}
                    className="flex justify-center items-center m-0 border-r"
                  >
                    <Radio id={`3${inter.id}`} value="3" />
                  </Label>
                  <Label
                    htmlFor={`4${inter.id}`}
                    className="flex justify-center items-center m-0 border-r"
                  >
                    <Radio id={`4${inter.id}`} value="4" />
                  </Label>
                  <Label
                    htmlFor={`5${inter.id}`}
                    className="flex justify-center items-center m-0"
                  >
                    <Radio id={`5${inter.id}`} value="5" />
                  </Label>
                </RadioGroup>
              </article>
            ))}
        </section>
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
