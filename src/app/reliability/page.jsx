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

export default function Reliability() {
  const router = useRouter();

  const { checkedInter, setCheckedInter } = useForm();

  const [error, setError] = useState("");

  const handleChangeKrRely = (e, inter) => {
    setCheckedInter((prevInter) =>
      prevInter.map((prev) => {
        if (prev.code === inter.code) {
          return { ...prev, krReliability: e };
        }

        return prev;
      })
    );
  };

  const handleChangeEtcRely = (e, inter) => {
    setCheckedInter((prevInter) =>
      prevInter.map((prev) => {
        if (prev.code === inter.code) {
          return { ...prev, etcReliability: e };
        }

        return prev;
      })
    );
  };

  const handlePrev = () => {
    router.push("/effect");
  };

  const handleNext = () => {
    if (
      !checkedInter.every((inter) => "krReliability" in inter) ||
      !checkedInter.every((inter) => "etcReliability" in inter)
    ) {
      setError("모든 중분류에 대해 기술 신뢰도를 선택해주세요.");

      return;
    }

    router.push("/availability");
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
          4Q-4. (기술 신뢰도)&nbsp;
          <span className="font-normal">
            선택하신 중분류별 가장 적합한 기술 신뢰도를 선택해 주시기 바랍니다.
          </span>
        </Heading>
        <Text className="indent-4">
          ※ 해당 기술이 실제 산업·서비스 현장에서 안정적이고 일관되게 활용될 수
          있는 신뢰 수준(공급 측면에서 기술의 성숙도와 활용 신뢰도를 보유하고
          있는지 여부)
        </Text>
        <section className="mt-4 border-t border-r border-l text-center">
          <article className="grid grid-cols-[3fr_1fr_2fr_2fr_2fr_2fr_2fr] border-b bg-gray-100 text-xl font-bold">
            <div className="flex justify-center items-center border-r">
              중분류
            </div>
            <div className="flex justify-center items-center border-r">
              구분*
            </div>
            <div className="border-r p-2">① 전혀 사용이 불가능하다</div>
            <div className="border-r p-2">② 거의 사용이 불가능하다</div>
            <div className="flex justify-center items-center border-r p-2">
              ③ 중간 수준이다
            </div>
            <div className="border-r p-2">④ 대체로 사용이 가능하다</div>
            <div className="p-2">⑤ 즉시 상용화가 가능하다</div>
          </article>
          {checkedInter
            .sort((a, b) => a.id - b.id)
            .map((inter) => (
              <article key={inter.id} className="grid grid-cols-[3fr_11fr]">
                <div className="row-span-2 flex justify-center items-center border-b bg-blue-950 p-2 text-lg font-bold text-white">
                  {inter.intermediate}
                  <span className="text-red-400">(!)</span>
                </div>
                <RadioGroup
                  name="krReliability"
                  aria-label="krReliability"
                  className="grid grid-cols-[1fr_2fr_2fr_2fr_2fr_2fr] border-b"
                  onChange={(e) => handleChangeKrRely(e, inter)}
                  defaultValue={inter.krReliability}
                >
                  <div className="m-0 border-r p-1 text-lg">국내</div>
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
                <RadioGroup
                  name="etcReliability"
                  aria-label="etcReliability"
                  className="grid grid-cols-[1fr_2fr_2fr_2fr_2fr_2fr] border-b"
                  onChange={(e) => handleChangeEtcRely(e, inter)}
                  defaultValue={inter.etcReliability}
                >
                  <div className="m-0 border-r p-1 text-lg">국외</div>
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
        <Text>
          * 국내 기술에 대해 국내 시장과 국외 시장에서의 신뢰도를 각각
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
