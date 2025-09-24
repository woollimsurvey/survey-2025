"use client";

import { useState } from "react";
import Form from "next/form";
import { useRouter } from "next/navigation";

import { Heading } from "@/components/heading";
import { Badge } from "@/components/badge";
import { Radio, RadioGroup } from "@/components/radio";
import { Input } from "@/components/input";
import { Button } from "@/components/button";

import { useForm } from "@/contexts/FormContext";

export default function Confidence() {
  const router = useRouter();

  const { checkedInter, setCheckedInter } = useForm();

  const [error, setError] = useState("");

  const handleChangeConfi = (e, inter) => {
    setCheckedInter((prevInter) =>
      prevInter.map((prev) => {
        if (prev.code === inter.code) {
          return { ...prev, confidence: e };
        }

        return prev;
      })
    );
  };

  const handlePrev = () => {
    router.push("/maturity");
  };

  const handleNext = () => {
    if (!checkedInter.every((inter) => "confidence" in inter)) {
      setError("모든 중분류에 대해 본인 확신도를 선택해주세요.");

      return;
    }

    router.push("/weight");
  };

  return (
    <Form action={handleNext}>
      <header className="my-3 p-3 bg-gray-50">
        <Heading level={2}>
          <Badge className="align-middle">3</Badge> 기술수준조사
        </Heading>
      </header>
      <main>
        <h3 className="my-4 text-3xl font-semibold text-zinc-950">
          □ (기타) 위의 질의사항에 대한 응답 확신도와 선택하신
          전략분야(전기수소자동차) 내에 포함된 대분류와 중분류의 가중치를 아래
          질문에 따라 응답해주시기 바랍니다.
        </h3>
        <Heading level={4}>
          5Q-1. (본인 확신도)&nbsp;
          <span className="font-normal">
            앞서 중분류별 응답한 기술성과 시장성에 대한 본인의 확신도를
            선택해주시기 바라며, 1번(아주 낮음) 또는 2번(아주 낮음)을 선택한
            경우, 그렇게 판단한 이유를 제시해주시기 바랍니다.
          </span>
        </Heading>
        <section className="my-4 border-t border-r border-l text-center">
          <article className="grid grid-cols-[3fr_1fr_1fr_1fr_1fr_1fr_2fr] border-b bg-gray-100 text-xl font-bold leading-10">
            <div className="border-r">중분류</div>
            <div className="border-r">① 아주 낮음</div>
            <div className="border-r">② 낮음</div>
            <div className="border-r">③ 보통</div>
            <div className="border-r">④ 높음</div>
            <div className="border-r">⑤ 매우 높음</div>
            <div>①, ②번을 선택한 이유</div>
          </article>
          {checkedInter
            .sort((a, b) => a.id - b.id)
            .map((inter) => (
              <article key={inter.id} className="grid grid-cols-[3fr_7fr]">
                <div className="border-b bg-blue-950 p-2 text-lg font-bold text-white">
                  {inter.intermediate}
                  <span className="text-red-400">(!)</span>
                </div>
                <RadioGroup
                  name="confidence"
                  aria-label="confidence"
                  className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_2fr] border-b"
                  onChange={(e) => handleChangeConfi(e, inter)}
                  defaultValue={inter.confidence}
                >
                  <div className="flex justify-center items-center m-0 border-r">
                    <Radio value="1" />
                  </div>
                  <div className="flex justify-center items-center m-0 border-r">
                    <Radio value="2" />
                  </div>
                  <div className="flex justify-center items-center m-0 border-r">
                    <Radio value="3" />
                  </div>
                  <div className="flex justify-center items-center m-0 border-r">
                    <Radio value="4" />
                  </div>
                  <div className="flex justify-center items-center m-0 border-r">
                    <Radio value="5" />
                  </div>
                  <div className="flex items-center px-2">
                    <Input
                      aria-label="confidence-reason"
                      name="confidenceReason"
                      value={
                        checkedInter.find((ele) => ele.code === inter.code)
                          ?.confidenceReason || ""
                      }
                      onChange={({ target }) =>
                        setCheckedInter((prevList) =>
                          prevList.map((prev) => {
                            if (prev.code === inter.code) {
                              return {
                                ...prev,
                                confidenceReason: target.value,
                              };
                            }

                            return prev;
                          })
                        )
                      }
                      disabled={
                        !inter.confidence ||
                        (inter.confidence !== "1" && inter.confidence !== "2")
                      }
                      required={
                        inter.confidence === "1" || inter.confidence === "2"
                      }
                    />
                  </div>
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
