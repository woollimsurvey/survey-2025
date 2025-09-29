"use client";

import { useState, useEffect, Fragment } from "react";
import Form from "next/form";
import { useRouter } from "next/navigation";

import { Heading } from "@/components/heading";
import { Badge } from "@/components/badge";
import { Text } from "@/components/text";
import { Input } from "@/components/input";
import { Button } from "@/components/button";

import { useForm } from "@/contexts/FormContext";

import { supabase } from "@/libs/supabaseClient";

export default function Weight() {
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
    largeWay,
  } = useForm();

  const [industry, setIndustry] = useState([]);
  const [weighted, setWeighted] = useState([]);
  const [totalWeight, setTotalWeight] = useState(0);

  const handlePrev = () => {
    router.push("/confidence");
  };

  const handleSubmit = async () => {
    if (totalWeight !== 100) {
      alert("중분류 가중치 합이 100이 되도록 가중치를 부여해주세요.");

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
          confidence: inter.confidence,
          confidenceReason: inter.confidenceReason,
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

    const { errorWeight } = await supabase.from("weighted").insert(
      weighted.map((weight) => {
        return {
          tel: weight.tel,
          large: weight.large,
          intermediate: weight.intermediate,
          code: weight.code,
          weight: weight.weight,
        };
      })
    );

    errorForm && console.error(errorForm);
    errorLarge && console.error(errorLarge);
    errorWeight && console.error(errorWeight);

    router.push("/finish");
  };

  useEffect(() => {
    const fetchIndustry = async () => {
      const { data, error } = await supabase
        .from("industry")
        .select()
        .order("id");

      setIndustry(
        data.reduce((acc, cur) => {
          const intermediates = [];

          data.forEach((ele) => {
            if (cur.large === ele.large) {
              intermediates.push({
                id: ele.id,
                intermediate: ele.intermediate,
                description: ele.description,
                code: ele.code,
              });
            }
          });

          !acc.find((ele) => ele.large === cur.large) &&
            acc.push({
              large: cur.large,
              definition: cur.definition,
              intermediates,
            });

          return acc;
        }, [])
      );

      setWeighted(
        data.map((item) => {
          return {
            tel: tel1 + tel2 + tel3,
            large: item.large,
            intermediate: item.intermediate,
            code: item.code,
          };
        })
      );

      error && console.error(error);
    };

    fetchIndustry();
  }, []);

  useEffect(() => {
    setTotalWeight(
      weighted.reduce((acc, cur) => {
        if (cur.weight) {
          return acc + Number(cur.weight);
        }

        return acc;
      }, 0)
    );
  }, [weighted]);

  return (
    <Form action={handleSubmit}>
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
          5Q-2. (가중치 부여)&nbsp;
          <span className="font-normal">
            해당 전략분야(전기수소자동차)를 구성하고 있는 중분류의 중요도 합이
            100이 되도록 가중치를 부여해주시기 바랍니다.
          </span>
        </Heading>
        <Text className="indent-4">
          ※ (가중치 설정 시 고려사항) 전략분야 내 가중치는 중분류를 평가하며,
          중분류 가중치 합이 100이 되도록 가중치 부여
        </Text>
        <Text className="indent-4">
          ※ <span className="text-red-400">(!)</span>에 마우스를 올리시면 해당
          중분류 기술의 정의가 표시됩니다.
        </Text>
        <Text className="indent-4">※ 기술분류 : 전기수소자동차</Text>
        <section className="grid grid-cols-[2fr_3fr_1fr] mt-4 border-t border-r border-l">
          <div className="border-r border-b bg-gray-100 text-xl font-bold text-center leading-10">
            대분류명
          </div>
          <div className="border-r border-b bg-gray-100 text-xl font-bold text-center leading-10">
            중분류명
          </div>
          <div className="border-b bg-gray-100 text-xl font-bold text-center leading-10">
            가중치*
          </div>
          {industry.map((lar, index) => (
            <Fragment key={index}>
              <div
                style={{ gridRow: `span ${lar.intermediates.length}` }}
                className="flex justify-center items-center border-b bg-blue-950 text-2xl font-bold text-white"
              >
                {lar.large}
              </div>
              {lar.intermediates.map((intermediate) => (
                <Fragment key={intermediate.id}>
                  <div className="border-r border-b py-1 px-2">
                    {intermediate.intermediate}
                    <span className="text-red-400">(!)</span>
                  </div>
                  <div className="border-b px-2">
                    <Input
                      type="number"
                      step="1"
                      min="1"
                      max="100"
                      aria-label="weight"
                      name="weight"
                      value={
                        weighted.find((ele) => ele.code === intermediate.code)
                          ?.weight || ""
                      }
                      onChange={({ target }) =>
                        setWeighted((prevList) =>
                          prevList.map((prev) => {
                            if (prev.code === intermediate.code) {
                              return { ...prev, weight: target.value };
                            }

                            return prev;
                          })
                        )
                      }
                      required
                    />
                  </div>
                </Fragment>
              ))}
            </Fragment>
          ))}
          <div className="col-span-2 border-r border-b bg-gray-200 text-xl font-bold text-center leading-12">
            전기수소자동차 분야 내 중분류 합계
          </div>
          <div className="border-b bg-gray-200 text-2xl font-bold text-center leading-12">
            {totalWeight}
          </div>
        </section>
        <Text>* 1~100 사이의 정수로만 입력 가능</Text>
      </main>
      <footer className="flex justify-end gap-4 my-4">
        <Button onClick={handlePrev}>이전</Button>
        <Button type="submit">설문 제출</Button>
      </footer>
    </Form>
  );
}
