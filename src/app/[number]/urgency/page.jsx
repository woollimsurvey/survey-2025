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

export default function Urgency({ params }) {
  const router = useRouter();

  const { number } = use(params);

  const { checkedInter, setCheckedInter } = useForm();

  const [error, setError] = useState("");

  const handleChangeUrgen = (e, inter) => {
    setCheckedInter((prevInter) =>
      prevInter.map((prev) => {
        if (prev.code === inter.code) {
          return { ...prev, urgency: e };
        }

        return prev;
      })
    );
  };

  const handlePrev = () => {
    router.push(`/${number}/importance`);
  };

  const handleNext = () => {
    if (!checkedInter.every((inter) => "urgency" in inter)) {
      setError("모든 중분류에 대해 시급성을 선택해주세요.");

      return;
    }

    router.push(`/${number}/effect`);
  };

  return (
    <Form action={handleNext}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress
            variant="determinate"
            value={36}
            sx={{ height: 35 }}
          />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body1">36%</Typography>
        </Box>
      </Box>
      <header className="my-3 p-3 bg-gray-50">
        <Heading level={2}>
          <Badge className="align-middle">3</Badge> 기술수준조사
        </Heading>
      </header>
      <main>
        <Heading level={4}>
          3Q-5. (시급성)&nbsp;
          <span className="font-normal">
            선택하신 중분류별 가장 적합한 시급성 정도를 선택해주시기 바랍니다.
          </span>
        </Heading>
        <Text className="indent-4">
          ※ 특정 기술분야 또는 상위 기술을 개발하고 산업화하기 위해 해당 중분류
          기술이 시급히 개발되어야 하는 정도
        </Text>
        <section className="my-4 border-t border-r border-l text-center">
          <article className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] border-b bg-gray-100 text-xl font-bold leading-10">
            <div className="border-r">중분류</div>
            <div className="border-r">① 전혀 시급하지 않다</div>
            <div className="border-r">② 시급하지 않다</div>
            <div className="border-r">③ 보통이다</div>
            <div className="border-r">④ 시급하다</div>
            <div>⑤ 매우 시급하다</div>
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
                  name="urgency"
                  aria-label="urgency"
                  className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] border-b"
                  onChange={(e) => handleChangeUrgen(e, inter)}
                  defaultValue={inter.urgency}
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
