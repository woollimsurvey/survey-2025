"use client";

import { useState } from "react";
import Form from "next/form";
import { useRouter } from "next/navigation";
import Tooltip from "@mui/material/Tooltip";

import { Heading } from "@/components/heading";
import { Badge } from "@/components/badge";
import { Text } from "@/components/text";
import { Radio, RadioGroup } from "@/components/radio";
import { Button } from "@/components/button";

import { useForm } from "@/contexts/FormContext";

import { supabase } from "@/libs/supabaseClient";

export default function Maturity() {
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
  const [finish, setFinish] = useState(false);

  const handleChangeMature = (e, inter) => {
    setCheckedInter((prevInter) =>
      prevInter.map((prev) => {
        if (prev.code === inter.code) {
          return { ...prev, maturity: e };
        }

        return prev;
      })
    );
  };

  const handlePrev = () => {
    router.push("/availability");
  };

  const handleNext = async () => {
    if (!checkedInter.every((inter) => "maturity" in inter)) {
      setError("모든 중분류에 대해 시장 성숙도를 선택해주세요.");

      return;
    }

    const { errorForm } = await supabase.from("form").insert(
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
          countrySkill: inter.countrySkill,
          krSkill: inter.krSkill,
          independence: inter.independence,
          importance: inter.importance,
          urgency: inter.urgency,
          effect: inter.effect,
          krAvailability: inter.krAvailability,
          etcAvailability: inter.etcAvailability,
          maturity: inter.maturity,
        };
      })
    );

    const { errorLarge } = await supabase.from("form_large").insert(
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

    errorForm && console.error(errorForm);
    errorLarge && console.error(errorLarge);

    setFinish(true);
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
          4Q-5. (시장 성숙도)&nbsp;
          <span className="font-normal">
            선택하신 중분류별 가장 적합한 시장 성숙도를 선택해 주시기 바랍니다.
          </span>
        </Heading>
        <Text className="indent-4">
          ※ 해당 기술이 적용될 산업·시장 자체의 성숙한 정도
        </Text>
        <section className="my-4 border-t border-r border-l text-center">
          <article className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] border-b bg-gray-100 text-xl font-bold">
            <div className="flex justify-center items-center border-r">
              중분류
            </div>
            <div className="flex justify-center items-center border-r p-2">
              ① 초기 시장
              <br />
              (실험적 수요만 발생)
            </div>
            <div className="flex justify-center items-center border-r p-2">
              ② 성장기
              <br />
              (수요가 급격히 증가)
            </div>
            <div className="flex justify-center items-center border-r p-2">
              ③ 성숙기
              <br />
              (수요가 안정적으로 유지)
            </div>
            <div className="flex justify-center items-center p-2">
              ④ 쇠퇴기
              <br />
              (수요 정체·감소)
            </div>
          </article>
          {checkedInter
            .sort((a, b) => a.id - b.id)
            .map((inter) => (
              <article key={inter.id} className="grid grid-cols-[2fr_4fr]">
                <div className="border-b bg-blue-950 p-2 text-lg font-bold text-white">
                  {inter.intermediate}
                  <Tooltip title={inter.description}>
                    <button type="button" className="text-red-400">
                      (!)
                    </button>
                  </Tooltip>
                </div>
                <RadioGroup
                  name="maturity"
                  aria-label="maturity"
                  className="grid grid-cols-[1fr_1fr_1fr_1fr] border-b"
                  onChange={(e) => handleChangeMature(e, inter)}
                  defaultValue={inter.maturity}
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
                  <div className="flex justify-center items-center m-0">
                    <Radio value="4" />
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
          <Button type="submit">설문 제출</Button>
        </div>
        {finish && (
          <div className="my-12 text-2xl font-medium text-center">
            - 설문조사에 응해주셔서 감사합니다. -
          </div>
        )}
      </footer>
    </Form>
  );
}
