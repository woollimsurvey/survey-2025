"use client";

import { useState, use } from "react";
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

export default function Availability({ params }) {
  const router = useRouter();

  const { number } = use(params);

  const { checkedInter, setCheckedInter } = useForm();

  const [error, setError] = useState("");

  const handleChangeKrAvail = (e, inter) => {
    setCheckedInter((prevInter) =>
      prevInter.map((prev) => {
        if (prev.code === inter.code) {
          return { ...prev, krAvailability: e };
        }

        return prev;
      })
    );
  };

  const handleChangeEtcAvail = (e, inter) => {
    setCheckedInter((prevInter) =>
      prevInter.map((prev) => {
        if (prev.code === inter.code) {
          return { ...prev, etcAvailability: e };
        }

        return prev;
      })
    );
  };

  const handlePrev = () => {
    router.push(`/${number}/way`);
  };

  const handleNext = async () => {
    if (
      !checkedInter.every((inter) => "krAvailability" in inter) ||
      !checkedInter.every((inter) => "etcAvailability" in inter)
    ) {
      setError("모든 중분류에 대해 시장 성숙도을 선택해주세요.");

      return;
    }

    router.push(`/${number}/maturity`);
  };

  return (
    <Form action={handleNext}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress
            variant="determinate"
            value={81}
            sx={{ height: 35 }}
          />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body1">81%</Typography>
        </Box>
      </Box>
      <header className="my-3 p-3 bg-gray-50">
        <Heading level={2}>
          <Badge className="align-middle">3</Badge> 기술수준조사
        </Heading>
      </header>
      <main>
        <h3 className="my-4 text-3xl font-semibold text-zinc-950">
          □ (시장성) 위원님께서 선택하신 중분류 기술의 시장성(시장 활용성, 시장
          성숙도)을 객관적으로 평가해주시기
          <br />
          바랍니다.
        </h3>
        <Heading level={4}>
          4Q-1. (시장 활용성)&nbsp;
          <span className="font-normal">
            선택하신 중분류별 가장 적합한 기술 활용성을 국내와 국외로 구분하여
            선택해주시기 바랍니다.
          </span>
        </Heading>
        <Text className="indent-4">
          ※ 해당 분야의 산업 규모와 향후 시장 성장 가능성을 고려하여 산업 및
          소비자 시장에서 제품·서비스로 구현되고 확산될 수 있는 현실적 가능성
        </Text>
        <section className="mt-4 border-t border-r border-l text-center">
          <article className="grid grid-cols-[3fr_1fr_2fr_2fr_2fr_2fr_2fr] border-b bg-gray-100 text-xl font-bold">
            <div className="flex justify-center items-center border-r">
              중분류
            </div>
            <div className="flex justify-center items-center border-r">
              구분*
            </div>
            <div className="flex justify-center items-center border-r p-2">
              ① 전혀 없다
            </div>
            <div className="border-r p-2">
              ② 낮은 편이다
              <br />
              (시장 제한, 경쟁력 낮음)
            </div>
            <div className="border-r p-2">
              ③ 보통이다
              <br />
              (일부 시장 경쟁력을 보유)
            </div>
            <div className="border-r p-2">
              ④ 높은 편이다
              <br />
              (국내외에서 활용 예정)
            </div>
            <div className="p-2">
              ⑤ 매우 높다
              <br />
              (이미 국내외에서 활용 중)
            </div>
          </article>
          {checkedInter
            .sort((a, b) => a.id - b.id)
            .map((inter) => (
              <article key={inter.id} className="grid grid-cols-[3fr_11fr]">
                <div className="row-span-2 flex justify-center items-center border-b bg-blue-950 p-2 text-lg font-bold text-white">
                  {inter.intermediate.split(" ").reduce((acc, word, index) => {
                    acc += (index + 1) % 3 === 0 ? `${word}\n` : `${word}\t`;

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
                  name="krAvailability"
                  aria-label="krAvailability"
                  className="grid grid-cols-[1fr_2fr_2fr_2fr_2fr_2fr] border-b"
                  onChange={(e) => handleChangeKrAvail(e, inter)}
                  defaultValue={inter.krAvailability}
                >
                  <div className="m-0 border-r p-1 text-lg">국내</div>
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
                <RadioGroup
                  name="etcAvailability"
                  aria-label="etcAvailability"
                  className="grid grid-cols-[1fr_2fr_2fr_2fr_2fr_2fr] border-b"
                  onChange={(e) => handleChangeEtcAvail(e, inter)}
                  defaultValue={inter.etcAvailability}
                >
                  <div className="m-0 border-r p-1 text-lg">국외</div>
                  <Label
                    htmlFor={`etc1${inter.id}`}
                    className="flex justify-center items-center m-0 border-r"
                  >
                    <Radio id={`etc1${inter.id}`} value="1" />
                  </Label>
                  <Label
                    htmlFor={`etc2${inter.id}`}
                    className="flex justify-center items-center m-0 border-r"
                  >
                    <Radio id={`etc2${inter.id}`} value="2" />
                  </Label>
                  <Label
                    htmlFor={`etc3${inter.id}`}
                    className="flex justify-center items-center m-0 border-r"
                  >
                    <Radio id={`etc3${inter.id}`} value="3" />
                  </Label>
                  <Label
                    htmlFor={`etc4${inter.id}`}
                    className="flex justify-center items-center m-0 border-r"
                  >
                    <Radio id={`etc4${inter.id}`} value="4" />
                  </Label>
                  <Label
                    htmlFor={`etc5${inter.id}`}
                    className="flex justify-center items-center m-0"
                  >
                    <Radio id={`etc5${inter.id}`} value="5" />
                  </Label>
                </RadioGroup>
              </article>
            ))}
        </section>
        <Text>
          * 국내 기술에 대해 국내시장과 국외시장에서의 활용성을 각각
          평가해주시기 바랍니다.
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
