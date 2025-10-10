"use client";

import { use } from "react";
import Form from "next/form";
import { useRouter } from "next/navigation";
import { Box, LinearProgress, Typography, Tooltip } from "@mui/material";

import { Heading } from "@/components/heading";
import { Badge } from "@/components/badge";
import { Input } from "@/components/input";
import { Text } from "@/components/text";
import { Button } from "@/components/button";

import { useForm } from "@/contexts/FormContext";

export default function Importance({ params }) {
  const router = useRouter();

  const { number } = use(params);

  const { checkedInter, setCheckedInter } = useForm();

  const handlePrev = () => {
    router.push(`/${number}/gap`);
  };

  const handleNext = () => {
    router.push(`/${number}/urgency`);
  };

  return (
    <Form action={handleNext}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress
            variant="determinate"
            value={27}
            sx={{ height: 35 }}
          />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body1">27%</Typography>
        </Box>
      </Box>
      <header className="my-3 p-3 bg-gray-50">
        <Heading level={2}>
          <Badge className="align-middle">3</Badge> 기술수준조사
        </Heading>
      </header>
      <main>
        <Heading level={4}>
          3Q-4. (중요도)&nbsp;
          <span className="font-normal">
            선택하신 중분류별 하위 설명을 참고하시어 해당 기술분야의 중요도를
            제시해주시기 바랍니다.
          </span>
        </Heading>
        <section className="my-4">
          <Heading level={5} className="my-2 text-center">
            &lt; 중요도 평가기준 및 평가방법 &gt;
          </Heading>
          <div className="grid grid-cols-[3fr_2fr] border">
            <div className="border-r border-b bg-gray-100 text-lg font-bold text-center leading-8">
              평가기준
            </div>
            <div className="border-b bg-gray-100 text-lg font-bold text-center leading-8">
              평가방법
            </div>
            <div className="border-r px-4">
              (80점~100점) : 상위기술에 있어서 가장 중요한 비중을 차지
              <br />
              (60점~80점) : 상위기술에 있어서 매우 중요한 비중을 차지
              <br />
              (40점~60점) : 상위기술에 있어서 중요한 비중을 차지
              <br />
              (20점~40점) : 상위기술에 있어서 조금 중요한 비중을 차지
              <br />
              (20점 미만) : 중요하지 않음
            </div>
            <div className="flex justify-center items-center">
              0~100 중 생각하는 중요도 수치를 기재(정수만 입력 가능)
            </div>
          </div>
        </section>
        <section className="border-t border-r border-l text-center">
          <article className="grid grid-cols-[4fr_1fr] border-b bg-gray-100 text-xl font-bold">
            <div className="border-r leading-20">중분류</div>
            <div className="flex justify-center items-center">
              중요도
              <br />
              (0~100점)
            </div>
          </article>
          {checkedInter
            .sort((a, b) => a.id - b.id)
            .map((inter) => (
              <article key={inter.id} className="grid grid-cols-[4fr_1fr]">
                <div className="border-b bg-blue-950 p-2 text-lg font-bold text-white">
                  {`${inter.intermediate} `}
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
                <div className="flex items-center border-b px-2">
                  <Input
                    type="number"
                    step="1"
                    min="0"
                    max="100"
                    aria-label="importance"
                    name="importance"
                    value={
                      checkedInter.find((ele) => ele.code === inter.code)
                        ?.importance || ""
                    }
                    onChange={({ target }) =>
                      setCheckedInter((prevList) =>
                        prevList.map((prev) => {
                          if (prev.code === inter.code) {
                            return { ...prev, importance: target.value };
                          }

                          return prev;
                        })
                      )
                    }
                    required
                  />
                  점
                </div>
              </article>
            ))}
        </section>
        <Text>
          *<u>중요도</u>를 선택하신 <u>각각의 개별 중분류 (기술)별로 평가</u>
          해주시기 바랍니다.
        </Text>
      </main>
      <footer className="flex justify-end gap-4 my-4">
        <Button onClick={handlePrev}>이전</Button>
        <Button type="submit">다음</Button>
      </footer>
    </Form>
  );
}
