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

import { supabase } from "@/libs/supabaseClient";

export default function Urgency() {
  const router = useRouter();

  const {
    name,
    company,
    position,
    classification,
    etc,
    career,
    tel1,
    tel2,
    tel3,
    email,
    checkedInter,
    setCheckedInter,
    largeWay,
  } = useForm();

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
    router.push("/importance");
  };

  const handleNext = async () => {
    if (!checkedInter.every((inter) => "urgency" in inter)) {
      setError("모든 중분류에 대해 시급성을 선택해주세요.");

      return;
    }

    const { error1 } = await supabase.from("form").insert(
      checkedInter.map((inter) => {
        return {
          name,
          company,
          position,
          classification,
          etc,
          career,
          tel: tel1 + tel2 + tel3,
          email,
          intermediate: inter.intermediate,
          code: inter.code,
          country: inter.country,
          euName: inter.euName,
          etcName: inter.etcName,
          institution: inter.institution,
          krPer: inter.krPer,
          usPer: inter.usPer,
          cnPer: inter.cnPer,
          jpPer: inter.jpPer,
          euPer: inter.euPer,
          etcPer: inter.etcPer,
          krMonth: inter.krMonth,
          usMonth: inter.usMonth,
          cnMonth: inter.cnMonth,
          jpMonth: inter.jpMonth,
          euMonth: inter.euMonth,
          etcMonth: inter.etcMonth,
          independence: inter.independence,
          importance: inter.importance,
          urgency: inter.urgency,
        };
      })
    );

    const { error2 } = await supabase.from("form_large").insert(
      largeWay.map((way) => {
        return {
          tel: way.tel,
          etc: way.etc,
          large: way.large,
          code: way.code,
          way: way.way,
          reason: way.reason,
        };
      })
    );

    error1 && console.error(error1);
    error2 && console.error(error2);

    router.push("/effect");
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
          4Q-2. (시급성)&nbsp;
          <span className="font-normal">
            선택하신 중분류별 가장 적합한 시급성 정도를 선택해주시기 바랍니다.
          </span>
        </Heading>
        <Text className="indent-4">
          ※ 국내외 기술 경쟁, 정책·산업적 수요, 사회적 요구 등을 고려할 때, 해당
          기술을 조속히 확보하 거나 상용화하지 않을 경우 국가 경쟁력, 산업 성장,
          또는 국민 안전·복지에 심각한 영향을 미칠 수 있는 정도
        </Text>
        <section className="my-4 border-t border-r border-l text-center">
          <article className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] border-b bg-gray-100 text-xl font-bold leading-20">
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
                <div className="border-b bg-blue-950 p-2 text-lg font-bold text-white">
                  {inter.intermediate}
                  <span className="text-red-400">(!)</span>
                </div>
                <RadioGroup
                  name="urgency"
                  aria-label="urgency"
                  className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] border-b"
                  onChange={(e) => handleChangeUrgen(e, inter)}
                  defaultValue={inter.urgency}
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
