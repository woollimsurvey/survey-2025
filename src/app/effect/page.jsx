"use client";

import { useState } from "react";
import Form from "next/form";
import { useRouter } from "next/navigation";

import { Heading } from "@/components/heading";
import { Badge } from "@/components/badge";
import { Text } from "@/components/text";
import { Radio, RadioGroup } from "@/components/radio";
import { Button } from "@/components/button";

import { useForm } from "@/contexts/FormContext";

export default function Effect() {
  const router = useRouter();

  const { checkedInter, setCheckedInter } = useForm();

  const [error, setError] = useState("");

  const handleChangeEff = (e, inter) => {
    setCheckedInter((prevInter) =>
      prevInter.map((prev) => {
        if (prev.code === inter.code) {
          return { ...prev, effect: e };
        }

        return prev;
      })
    );
  };

  const handlePrev = () => {
    router.push("/urgency");
  };

  const handleNext = () => {
    if (!checkedInter.every((inter) => "effect" in inter)) {
      setError("모든 중분류에 대해 파급효과를 선택해주세요.");

      return;
    }

    router.push("/reliability");
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
          □ (시장성) 위원님께서 선택하신 중분류 기술들의 시장성을 평가할 수 있는
          하위 문항에 응답해주시기 바랍니다.
        </h3>
        <Heading level={4}>
          4Q-3. (파급효과)&nbsp;
          <span className="font-normal">
            선택하신 중분류별 가장 적합한 파급효과를 선택해주시기 바랍니다.
          </span>
        </Heading>
        <Text className="indent-4">
          ※ 특정 산업에만 국한하지 않고 연관 산업군의 혁신, 국가 경쟁력 강화,
          일자리 창출, 생활·안전 개선 등으로 이어지는 효과의 크기
        </Text>
        <section className="my-4 border-t border-r border-l text-center">
          <article className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] border-b bg-gray-100 text-xl font-bold leading-10">
            <div className="border-r">중분류</div>
            <div className="border-r">① 전혀 크지 않다</div>
            <div className="border-r">② 크지 않다</div>
            <div className="border-r">③ 보통이다</div>
            <div className="border-r">④ 크다</div>
            <div>⑤ 매우 크다</div>
          </article>
          {checkedInter
            .sort((a, b) => a.id - b.id)
            .map((inter) => (
              <article key={inter.id} className="grid grid-cols-[2fr_5fr]">
                <div className="border-b bg-blue-950 p-2 text-lg font-bold text-white">
                  {inter.intermediate}
                  <span className="text-red-400">(!)</span>
                </div>
                <RadioGroup
                  name="effect"
                  aria-label="effect"
                  className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] border-b"
                  onChange={(e) => handleChangeEff(e, inter)}
                  defaultValue={inter.effect}
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
                  <div className="flex justify-center items-center m-0">
                    <Radio value="5" />
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
